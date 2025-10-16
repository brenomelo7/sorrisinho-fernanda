import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PLANS, STRIPE_CONFIG, ENV_CHECKS } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!ENV_CHECKS.hasStripe) {
      return NextResponse.json(
        { error: 'Stripe não configurado. Configure as variáveis de ambiente.' },
        { status: 503 }
      );
    }

    const stripe = new Stripe(STRIPE_CONFIG.secretKey);
    const { planId } = await request.json();

    const plan = PLANS.find(p => p.id === planId);
    if (!plan) {
      return NextResponse.json({ error: 'Plano não encontrado' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: `Sorrisinho Call - ${plan.name}`,
              description: plan.description,
            },
            unit_amount: plan.price_cents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}`,
      metadata: {
        planId: plan.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Erro no checkout:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}