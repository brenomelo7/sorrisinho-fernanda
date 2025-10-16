'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Loader2, Heart } from 'lucide-react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isLoading, setIsLoading] = useState(true);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      verifyPayment();
    }
  }, [sessionId]);

  const verifyPayment = async () => {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSessionToken(data.sessionToken);
        // Auto redirect after 3 seconds
        setTimeout(() => {
          window.location.href = `/call/${data.sessionToken}`;
        }, 3000);
      } else {
        setError(data.error || 'Erro ao verificar pagamento');
      }
    } catch (error) {
      setError('Erro ao processar pagamento');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnterCall = () => {
    if (sessionToken) {
      window.location.href = `/call/${sessionToken}`;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-pink-500 animate-spin mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Verificando pagamento...
            </h2>
            <p className="text-gray-600 text-center">
              Aguarde enquanto confirmamos sua compra
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Ops! Algo deu errado
            </h2>
            <p className="text-gray-600 text-center mb-6">
              {error}
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              Voltar ao início
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Pagamento confirmado!
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center">
          <p className="text-gray-600 mb-6">
            Você será redirecionado em instantes para a sua sala privada com a Sorrisinho.
          </p>
          
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-pink-800">
              <strong>Importante:</strong> Mantenha esta aba aberta para acessar sua chamada.
            </p>
          </div>

          <Button 
            onClick={handleEnterCall}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 py-3 text-lg font-semibold"
          >
            Entrar na chamada agora
          </Button>
          
          <p className="text-xs text-gray-500 mt-4">
            Redirecionamento automático em 3 segundos...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}