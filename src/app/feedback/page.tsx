'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Heart, 
  Star, 
  MessageCircle, 
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { WHATSAPP_SUPPORT_URL } from '@/lib/constants';

export default function FeedbackPage() {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmitFeedback = async () => {
    // In a real implementation, this would send feedback to the backend
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Obrigada pelo feedback!
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Sua opinião é muito importante para nós. Esperamos vê-lo novamente em breve!
            </p>
            <div className="flex flex-col space-y-3 w-full">
              <Button 
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                Nova chamada
              </Button>
              <Button 
                variant="outline"
                asChild
              >
                <a href={WHATSAPP_SUPPORT_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Falar com suporte
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => window.location.href = '/'}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-pink-500" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Sorrisinho Call
              </h1>
            </div>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-2xl">
        {/* Thank You Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-pink-400 to-purple-500 p-1 mb-6">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/ee33471d-98ea-4a6e-b0f7-c01826b9454e.jpg" 
                alt="Sorrisinho" 
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Obrigada pela sua companhia! 💕
          </h2>
          <p className="text-lg text-gray-600">
            Espero que tenha aproveitado nosso tempo juntos. Sua opinião é muito importante para mim!
          </p>
        </div>

        {/* Feedback Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Como foi sua experiência?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Rating */}
            <div className="text-center">
              <p className="text-gray-700 mb-4">Avalie nossa chamada:</p>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingClick(star)}
                    className="transition-all duration-200 hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300 hover:text-yellow-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  {rating === 5 && "Perfeito! 🌟"}
                  {rating === 4 && "Muito bom! 😊"}
                  {rating === 3 && "Bom! 👍"}
                  {rating === 2 && "Pode melhorar 🤔"}
                  {rating === 1 && "Vamos melhorar! 💪"}
                </p>
              )}
            </div>

            <Separator />

            {/* Written Feedback */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deixe um comentário (opcional):
              </label>
              <Textarea
                placeholder="Conte-me como foi sua experiência, sugestões ou qualquer coisa que queira compartilhar..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            <Button
              onClick={handleSubmitFeedback}
              disabled={rating === 0}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 py-3 text-lg font-semibold"
            >
              Enviar feedback
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-pink-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Gostou da experiência?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Que tal uma nova chamada?
              </p>
              <Button
                onClick={() => window.location.href = '/'}
                className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600"
              >
                Nova chamada
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Precisa de ajuda?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Nossa equipe está aqui para você
              </p>
              <Button
                variant="outline"
                asChild
                className="w-full"
              >
                <a href={WHATSAPP_SUPPORT_URL} target="_blank" rel="noopener noreferrer">
                  Falar no WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-center text-gray-900 mb-6">
            O que outros usuários dizem:
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-pink-50 border-pink-200">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 italic">
                  "Experiência incrível! A Sorrisinho é muito carinhosa e atenciosa. Recomendo!"
                </p>
                <p className="text-xs text-gray-500 mt-2">- João M.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 italic">
                  "Qualidade excelente e atendimento perfeito. Voltarei com certeza!"
                </p>
                <p className="text-xs text-gray-500 mt-2">- Carlos R.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}