import { useState, useRef } from 'react';

export default function MagicLamp() {
  const [isGenieVisible, setIsGenieVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleLampClick = () => {
    if (!isGenieVisible) {
      setIsGenieVisible(true);
      
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      }
    } else {
      setIsGenieVisible(false);
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  return (
    <>
      {/* Audio element */}
      <audio ref={audioRef} src="/ReelAudio-80274.mp3" />

      {/* Magic Lamp Container - FIXED POSITION */}
      <div className="fixed bottom-4 right-4 z-[9999] pointer-events-auto">
        {/* Lamp GIF */}
        {!isGenieVisible && (
          <div
            onClick={handleLampClick}
            className="relative w-24 h-24 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
            style={{ 
              filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.8))'
            }}
          >
            <img 
              src="/lamp.gif" 
              alt="Magic Lamp" 
              className="w-full h-full object-contain animate-pulse"
            />
          </div>
        )}

        {/* White Glowing Dot with Expanding Waves (Transition) */}
        {isGenieVisible && (
          <div className="relative w-24 h-24 flex items-center justify-center" style={{ animation: 'dotFadeOut 1s ease-in-out forwards' }}>
            {/* Expanding wave circles */}
            <div className="absolute w-8 h-8 bg-white rounded-full opacity-80"
              style={{
                animation: 'expandingPulse 1s ease-out forwards'
              }}>
            </div>
            <div className="absolute w-8 h-8 bg-white rounded-full opacity-60"
              style={{
                animation: 'expandingPulse 1s ease-out 0.2s forwards'
              }}>
            </div>
            <div className="absolute w-8 h-8 bg-white rounded-full opacity-40"
              style={{
                animation: 'expandingPulse 1s ease-out 0.4s forwards'
              }}>
            </div>
            
            {/* Center glowing dot */}
            <div className="absolute w-8 h-8 bg-white rounded-full shadow-lg" 
              style={{
                boxShadow: '0 0 30px rgba(255, 255, 255, 1), 0 0 60px rgba(255, 255, 255, 0.7), inset 0 0 20px rgba(255, 255, 255, 0.5)'
              }}>
            </div>
          </div>
        )}

        {/* Genie GIF Container */}
        {isGenieVisible && (
          <div 
            onClick={handleLampClick}
            className="fixed bottom-24 right-2 z-[9999] cursor-pointer"
            style={{
              animation: 'slideUp 0.6s ease-out'
            }}
          >
            <img 
              src="/gwiz-genie-and-the-power-belt.gif" 
              alt="Genie" 
              className="w-40 h-40 object-contain"
              style={{ filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 1))' }}
            />
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.5);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes expandingPulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        @keyframes dotFadeOut {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          90% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.8);
          }
        }
      `}</style>
    </>
  );
}
