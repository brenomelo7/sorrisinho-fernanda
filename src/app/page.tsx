'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, Shield, Clock, Star, Phone, MessageCircle } from 'lucide-react';
import { PLANS, WHATSAPP_SUPPORT_URL } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

export default function HomePage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async (planId: string) => {
    setIsLoading(true);
    setSelectedPlan(planId);
    
    try {
      // Redirect to checkout
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
    } finally {
      setIsLoading(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-pink-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Sorrisinho Call
              </h1>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href={WHATSAPP_SUPPORT_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" />
                Suporte
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          {/* Profile Image */}
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-pink-400 to-purple-500 p-1">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/ee33471d-98ea-4a6e-b0f7-c01826b9454e.jpg" 
                  alt="Sorrisinho" 
                  className="w-28 h-28 rounded-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                Online agora
              </Badge>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Sorrisinho Call
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            A chamada que parece ao vivo
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Experiência única e exclusiva com a Sorrisinho. Escolha seu tempo e aproveite momentos especiais.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <div className="flex items-center space-x-2 text-gray-600">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm">100% Seguro</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="text-sm">Acesso Imediato</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-sm">Experiência Premium</span>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Escolha sua experiência
            </h3>
            <p className="text-lg text-gray-600">
              Planos exclusivos para momentos únicos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PLANS.map((plan, index) => (
              <Card 
                key={plan.id} 
                className={`relative transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  index === 1 ? 'ring-2 ring-pink-500 shadow-lg' : ''
                }`}
              >
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-pink-500 text-white px-4 py-1">
                      Mais Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="text-center">
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {formatPrice(plan.price_cents)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {plan.minutes_label}
                    </div>
                  </div>

                  <Button 
                    className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                      index === 1 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700' 
                        : 'bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600'
                    }`}
                    onClick={() => handlePurchase(plan.id)}
                    disabled={isLoading}
                  >
                    {isLoading && selectedPlan === plan.id ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processando...</span>
                      </div>
                    ) : (
                      <>
                        <Phone className="h-5 w-5 mr-2" />
                        Comprar agora
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Por que escolher o Sorrisinho Call?
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  100% Seguro e Privado
                </h4>
                <p className="text-gray-600">
                  Seus dados e pagamentos são protegidos com criptografia de ponta.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Acesso Imediato
                </h4>
                <p className="text-gray-600">
                  Após o pagamento, você é redirecionado instantaneamente para sua sala privada.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Experiência Premium
                </h4>
                <p className="text-gray-600">
                  Qualidade de vídeo HD e interface intuitiva para a melhor experiência.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Suporte 24/7
                </h4>
                <p className="text-gray-600">
                  Nossa equipe está sempre disponível para ajudar via WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Heart className="h-6 w-6 text-pink-500" />
              <h4 className="text-xl font-bold">Sorrisinho Call</h4>
            </div>
            
            <Separator className="bg-gray-700 mb-6" />
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              <a href={WHATSAPP_SUPPORT_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Suporte
              </a>
            </div>
            
            <p className="text-xs text-gray-500 mt-6">
              © 2024 Sorrisinho Call. Todos os direitos reservados. Conteúdo para maiores de 18 anos.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}