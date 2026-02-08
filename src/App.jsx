import { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function ValentineProposal() {
  const [revealed, setRevealed] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Replace these URLs with your actual photos
  const photos = [
    'src/assets/photos/photo-1.JPG',
    'src/assets/photos/photo-2.JPG',
    'src/assets/photos/photo-3.JPG',
    'src/assets/photos/photo-4.JPG',
    'src/assets/photos/photo-5.JPG',
    'src/assets/photos/photo-6.JPG',
  ];

  const memories = [
    "Our first conference together",
    "That day we'll never forget",
    "Our favourite birthday dinner",
    "Mother to my child",
    "See how you make me smile",
    "Our first annual ball"
  ];

  const [mounted] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (answered) {
      const interval = setInterval(() => {
        const id = Date.now() + Math.random();
        setHearts(prev => [...prev, {
          id,
          left: Math.random() * 100,
          delay: Math.random() * 2,
          fontSize: Math.random() * 20 + 20
        }]);
      }, 200);
      
      const cleanup = setTimeout(() => clearInterval(interval), 3000);
      return () => {
        clearInterval(interval);
        clearTimeout(cleanup);
      };
    }
  }, [answered]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex(prev => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [photos.length]);

  const handleYes = () => {
    // Track the response
    trackResponse('yes');
    setAnswered(true);
  };

  const trackResponse = (response) => {
    // Send notification to your endpoint
    // Replace with your actual notification service
    const timestamp = new Date().toLocaleString();
    
    // For now, log to console (you'll replace this)
    console.log(`Response: ${response} at ${timestamp}`);
    
    // Option 1: Discord Webhook (replace with your webhook URL)
    // const webhookURL = 'YOUR_DISCORD_WEBHOOK_URL_HERE';
    // fetch(webhookURL, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     content: `💝 She clicked: **${response.toUpperCase()}** at ${timestamp}`
    //   })
    // }).catch(err => console.log('Notification sent'));
    
    // Option 2: Google Forms (alternative)
    // Option 3: Email service
  };

  const handleNo = (e) => {
    trackResponse('no');
    const button = e.currentTarget;
    const maxX = window.innerWidth - button.offsetWidth - 40;
    const maxY = window.innerHeight - button.offsetHeight - 40;
    
    button.style.position = 'fixed';
    button.style.left = Math.min(Math.random() * maxX, maxX) + 'px';
    button.style.top = Math.min(Math.random() * maxY, maxY) + 'px';
    button.style.transition = 'all 0.3s ease';
  };

  if (!mounted) {
    return <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50" />;
  }

  return (
    <div className="container-main">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Cormorant Garamond', serif;
          overflow-x: hidden;
        }

        .container-main {
          min-height: 100vh;
          background: linear-gradient(135deg, #fff1f2 0%, #fce7f3 50%, #fee2e2 100%);
          overflow: hidden;
          position: relative;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heartRise {
          0% {
            transform: translateY(0) scale(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(1);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .float {
          animation: float 6s ease-in-out infinite;
        }

        .fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }

        .heart-rise {
          animation: heartRise 4s linear forwards;
        }

        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }

        .photo-container {
          position: relative;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .photo-item {
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          background: white;
          padding: 12px;
          border-radius: 16px;
        }

        .photo-item:hover {
          transform: scale(1.05) rotate(-2deg);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);
        }

        .photo-img-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          aspect-ratio: 1;
        }

        .photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s;
        }

        .photo-item:hover .photo-img {
          transform: scale(1.1);
        }

        .sparkle {
          animation: spin 20s linear infinite;
        }

        .gradient-text {
          background: linear-gradient(135deg, #ec4899 0%, #ef4444 50%, #f97316 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes borderGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.3), 0 0 40px rgba(236, 72, 153, 0.1); }
          50% { box-shadow: 0 0 40px rgba(236, 72, 153, 0.5), 0 0 80px rgba(236, 72, 153, 0.2); }
        }

        .glow-border {
          animation: borderGlow 2s ease-in-out infinite;
        }

        .yes-button {
          background: linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #ef4444 100%);
          color: white;
          padding: 20px 48px;
          border-radius: 50px;
          font-size: clamp(20px, 5vw, 30px);
          font-weight: bold;
          border: none;
          cursor: pointer;
          box-shadow: 0 20px 60px rgba(236, 72, 153, 0.4);
          transition: all 0.3s ease;
          font-family: 'Playfair Display', serif;
        }

        .yes-button:hover {
          transform: scale(1.1);
          box-shadow: 0 25px 80px rgba(236, 72, 153, 0.6);
        }

        .no-button {
          background: #e5e7eb;
          color: #4b5563;
          padding: 20px 36px;
          border-radius: 50px;
          font-size: clamp(18px, 4vw, 24px);
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Playfair Display', serif;
        }

        .no-button:hover {
          background: #d1d5db;
        }

        .photo-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          max-width: 1000px;
          margin: 0 auto 48px;
          padding: 0 12px;
        }

        @media (min-width: 640px) {
          .photo-grid {
            gap: 16px;
            padding: 0 16px;
            margin-bottom: 64px;
          }
        }

        @media (min-width: 768px) {
          .photo-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
        }

        .success-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          max-width: 672px;
          margin: 48px auto 0;
          padding: 0 12px;
        }

        @media (min-width: 640px) {
          .success-grid {
            gap: 12px;
            padding: 0 16px;
          }
        }

        .heart-icon {
          color: #ec4899;
          fill: currentColor;
        }

        .main-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          position: relative;
          z-index: 10;
        }

        @media (min-width: 640px) {
          .main-wrapper {
            padding: 16px;
          }
        }

        .content-container {
          max-width: 1536px;
          width: 100%;
        }

        .decorative-sparkle {
          position: absolute;
          opacity: 0.15;
        }

        .decorative-sparkle.top-left {
          top: 20px;
          left: 20px;
        }

        .decorative-sparkle.bottom-right {
          bottom: 40px;
          right: 40px;
          animation-direction: reverse;
        }

        @media (min-width: 640px) {
          .decorative-sparkle.top-left {
            top: 40px;
            left: 40px;
            opacity: 0.2;
          }

          .decorative-sparkle.bottom-right {
            bottom: 80px;
            right: 80px;
            opacity: 0.2;
          }
        }

        .title-section {
          margin-bottom: 32px;
          text-align: center;
          padding: 0 12px;
        }

        @media (min-width: 640px) {
          .title-section {
            margin-bottom: 48px;
            padding: 0 16px;
          }
        }

        .question-section {
          margin-bottom: 32px;
          padding: 0 12px;
        }

        @media (min-width: 640px) {
          .question-section {
            margin-bottom: 48px;
            padding: 0 16px;
          }
        }

        .buttons-wrapper {
          display: flex;
          flex-direction: column;
          gap: 16px;
          justify-content: center;
          align-items: center;
          position: relative;
          min-height: 160px;
          padding: 0 12px;
        }

        @media (min-width: 480px) {
          .buttons-wrapper {
            flex-direction: row;
            gap: 20px;
            min-height: 128px;
          }
        }

        @media (min-width: 640px) {
          .buttons-wrapper {
            gap: 24px;
          }
        }

        .hearts-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 24px;
        }

        @media (min-width: 640px) {
          .hearts-container {
            gap: 12px;
            margin-bottom: 32px;
          }
        }

        .success-message {
          margin-bottom: 24px;
          padding: 0 12px;
        }

        @media (min-width: 640px) {
          .success-message {
            margin-bottom: 32px;
            padding: 0 16px;
          }
        }

        .emoji-row {
          font-size: clamp(2.5rem, 8vw, 5rem);
          margin-bottom: 24px;
        }

        @media (min-width: 640px) {
          .emoji-row {
            margin-bottom: 32px;
          }
        }
      `}</style>

      {/* Floating hearts background */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart-rise absolute text-red-400 pointer-events-none"
          style={{
            left: `${heart.left}%`,
            bottom: '-10%',
            animationDelay: `${heart.delay}s`,
            fontSize: `${Math.floor(heart.fontSize)}px`
          }}
        >
          ❤️
        </div>
      ))}

      {/* Decorative elements */}
      <div className="decorative-sparkle top-left sparkle">
        <Sparkles size={60} style={{ color: '#f9a8d4' }} />
      </div>
      <div className="decorative-sparkle bottom-right sparkle">
        <Sparkles size={50} style={{ color: '#fda4af' }} />
      </div>

      <div className="main-wrapper">
        <div className="content-container">
          {!answered ? (
            <div className={revealed ? 'fade-in-up' : ''} style={{ opacity: revealed ? 1 : 0, textAlign: 'center' }}>
              {/* Title */}
              <div className="title-section">
                <h1 className="gradient-text" style={{ fontSize: 'clamp(2.5rem, 10vw, 6rem)', fontWeight: 'bold', marginBottom: '16px', fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}>
                  A Journey
                </h1>
                <p style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)', color: '#be123c', fontStyle: 'italic' }}>
                  Through our most beautiful moments...
                </p>
              </div>

              {/* Photo Collage */}
              <div className="photo-grid">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="photo-item"
                    style={{
                      animationDelay: `${index * 0.15}s`,
                      transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
                      opacity: revealed ? 1 : 0,
                      animation: revealed ? `fadeInUp 0.8s ease-out ${index * 0.15}s forwards` : 'none'
                    }}
                  >
                    <div className="photo-img-wrapper">
                      <img
                        src={photo}
                        alt={memories[index]}
                        className="photo-img"
                      />
                      {currentPhotoIndex === index && (
                        <div className="shimmer" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
                      )}
                    </div>
                    <p style={{ fontSize: 'clamp(14px, 3vw, 16px)', color: '#e11d48', marginTop: '8px', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.3 }}>
                      {memories[index]}
                    </p>
                  </div>
                ))}
              </div>

              {/* The Question */}
              <div className="question-section float">
                <h2 className="gradient-text" style={{ fontSize: 'clamp(2rem, 8vw, 5rem)', fontWeight: 900, marginBottom: '16px', fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}>
                  Will You Be My Valentine?
                </h2>
                <div className="hearts-container">
                  <Heart size={28} className="pulse heart-icon" />
                  <Heart size={36} className="pulse heart-icon" style={{ animationDelay: '0.3s' }} />
                  <Heart size={28} className="pulse heart-icon" style={{ animationDelay: '0.6s' }} />
                </div>
              </div>

              {/* Buttons */}
              <div className="buttons-wrapper">
                <button
                  onClick={handleYes}
                  className="yes-button glow-border"
                >
                  Yes! 💕
                </button>
                <button
                  onClick={handleNo}
                  className="no-button"
                >
                  No
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }} className="fade-in-up">
              <div className="success-message">
                <h1 className="gradient-text pulse" style={{ fontSize: 'clamp(3rem, 12vw, 8rem)', fontWeight: 900, marginBottom: '16px', fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>
                  YES! 🎉
                </h1>
                <p style={{ fontSize: 'clamp(1.75rem, 6vw, 3.5rem)', color: '#e11d48', marginBottom: '24px', fontStyle: 'italic', lineHeight: 1.2 }}>
                  You've made me the happiest!
                </p>
                <div className="emoji-row">
                  💕 💖 💝 💗 💓
                </div>
                <p style={{ fontSize: 'clamp(1.25rem, 4vw, 2.5rem)', color: '#f43f5e', maxWidth: '672px', margin: '0 auto', lineHeight: '1.5', fontFamily: "'Cormorant Garamond', serif", padding: '0 16px' }}>
                  Here's to many more beautiful moments together, my Valentine.
                  Every day with you is a gift. 
                </p>
              </div>
              
              {/* Mini collage on success */}
              <div className="success-grid">
                {photos.slice(0, 3).map((photo, index) => (
                  <div
                    key={index}
                    style={{
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                      transform: 'scale(1)',
                      transition: 'all 0.3s',
                      animationDelay: `${index * 0.2}s`,
                      animation: `fadeInUp 0.8s ease-out ${index * 0.2}s backwards`
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <img 
                      src={photo} 
                      alt="" 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        aspectRatio: '1',
                        display: 'block'
                      }} 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
