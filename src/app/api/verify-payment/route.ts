import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { STRIPE_CONFIG, PLANS, ENV_CHECKS } from '@/lib/constants';
import { generateToken, generateSessionExpiry } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    // Check if required services are configured
    if (!ENV_CHECKS.hasStripe) {
      return NextResponse.json(
        { error: 'Stripe não configurado. Configure as variáveis de ambiente.' },
        { status: 503 }
      );
    }

    const stripe = new Stripe(STRIPE_CONFIG.secretKey);
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID é obrigatório' }, { status: 400 });
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Pagamento não confirmado' }, { status: 400 });
    }

    const planId = session.metadata?.planId;
    const plan = PLANS.find(p => p.id === planId);

    if (!plan) {
      return NextResponse.json({ error: 'Plano não encontrado' }, { status: 400 });
    }

    // Generate session token
    const sessionToken = generateToken();
    const expiresAt = generateSessionExpiry();

    // If Supabase is configured, try to save to database
    if (isSupabaseConfigured()) {
      try {
        // Get active video for this plan (for now, we'll use a default video)
        const { data: videos } = await supabase
          .from('videos')
          .select('*')
          .contains('active_for_plans', [planId])
          .limit(1);

        const activeVideo = videos?.[0];

        // Create transaction record
        const { data: transaction, error: transactionError } = await supabase
          .from('transactions')
          .insert({
            plan_id: planId,
            amount: plan.price_cents,
            provider: 'stripe',
            provider_id: sessionId,
            status: 'completed'
          })
          .select()
          .single();

        if (transactionError) {
          console.error('Erro ao criar transação:', transactionError);
          // Continue without database - return success anyway
        } else {
          // Create session record
          const { error: sessionError } = await supabase
            .from('sessions')
            .insert({
              transaction_id: transaction.id,
              user_token: sessionToken,
              video_id: activeVideo?.id || 'default',
              expires_at: expiresAt.toISOString()
            });

          if (sessionError) {
            console.error('Erro ao criar sessão:', sessionError);
            // Continue without database - return success anyway
          }
        }
      } catch (dbError) {
        console.error('Erro de banco de dados:', dbError);
        // Continue without database - return success anyway
      }
    }

    return NextResponse.json({
      success: true,
      sessionToken,
      planName: plan.name
    });

  } catch (error) {
    console.error('Erro ao verificar pagamento:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}