'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Phone, 
  MessageCircle, 
  AlertTriangle,
  Wifi,
  Heart
} from 'lucide-react';
import { WHATSAPP_SUPPORT_URL } from '@/lib/constants';

export default function CallPage() {
  const params = useParams();
  const token = params.token as string;
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'stable' | 'unstable' | 'connecting'>('connecting');

  useEffect(() => {
    validateSession();
    
    // Simulate connection status
    setTimeout(() => setConnectionStatus('stable'), 2000);
  }, [token]);

  const validateSession = async () => {
    try {
      // In a real implementation, this would validate the token with the backend
      // For now, we'll simulate a valid session if token exists
      if (token && token.length > 10) {
        setIsValidSession(true);
      } else {
        setIsValidSession(false);
      }
    } catch (error) {
      setIsValidSession(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleEndCall = () => {
    window.location.href = '/feedback';
  };

  if (isValidSession === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Conectando...</p>
        </div>
      </div>
    );
  }

  if (isValidSession === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Sessão inválida
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Esta sessão expirou ou não é válida. Por favor, faça uma nova compra.
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 p-0.5">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/ee33471d-98ea-4a6e-b0f7-c01826b9454e.jpg" 
                  alt="Sorrisinho" 
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-semibold">Sorrisinho</h1>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Online</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge 
              variant="secondary" 
              className={`${
                connectionStatus === 'stable' ? 'bg-green-500/20 text-green-400' :
                connectionStatus === 'unstable' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-gray-500/20 text-gray-400'
              }`}
            >
              <Wifi className="h-3 w-3 mr-1" />
              {connectionStatus === 'stable' ? 'Conexão Estável' :
               connectionStatus === 'unstable' ? 'Conexão Instável' :
               'Conectando...'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Video Container */}
      <div className="relative w-full h-screen">
        {!isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg text-gray-300">Carregando vídeo...</p>
            </div>
          </div>
        )}
        
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          playsInline
          onLoadedData={handleVideoLoad}
          style={{ display: isVideoLoaded ? 'block' : 'none' }}
        >
          {/* In a real implementation, this would be the dynamic video URL from the backend */}
          <source src="/api/video/stream" type="video/mp4" />
          Seu navegador não suporta vídeo HTML5.
        </video>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={toggleMute}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/20"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            onClick={toggleFullscreen}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/20"
          >
            {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
          </Button>
          
          <Button
            variant="destructive"
            size="lg"
            onClick={handleEndCall}
            className="bg-red-500 hover:bg-red-600"
          >
            <Phone className="h-5 w-5 mr-2" />
            Encerrar
          </Button>
        </div>
        
        {/* Support Links */}
        <div className="flex items-center justify-center space-x-6 mt-4">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-gray-300 hover:text-white"
          >
            <a href={WHATSAPP_SUPPORT_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4 mr-2" />
              Suporte
            </a>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:text-white"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Reportar problema
          </Button>
        </div>
      </div>

      {/* Floating Heart Animation (optional) */}
      <div className="absolute top-1/2 right-8 opacity-20">
        <Heart className="h-8 w-8 text-pink-500 animate-pulse" />
      </div>
    </div>
  );
}