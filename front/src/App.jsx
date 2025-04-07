import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './App.css';

// Import your images
import instagramMemory from '/public/4.jpg';
import iceCreamDate from '/public/2.jpg';
import whatILove from '/public/3.jpg';

function App() {
  const [terminalText, setTerminalText] = useState('');
  const [showTerminal, setShowTerminal] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [yesSize, setYesSize] = useState(16);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [hearts, setHearts] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  }); 

  const fullText = ` our-love-story.js\n\nInitializing romantic algorithms...\nLoading Purity's beautiful memories...\nRendering our future together...\n\n`;
  
  const sections = [
    {
      title: "The Instagram Spark",
      content: "It all started when I saw your Instagram status. That picture wasn't just beautiful - it stopped me in my tracks. When we started chatting, I knew there was something special about you.",
      media: instagramMemory,
      alt: "Purity's Instagram photo that caught my attention"
    },
    {
      title: "Our Ice Cream Date",
      content: "That evening we got ice cream was magical. The way you laughed when we talked, made my heart skip a beat. I knew then I wanted more moments like this with you.",
      media: iceCreamDate,
      alt: "Our first date getting ice cream"
    },
    {
      title: "What I Love About You",
      content: "You're funny, kind, and so easy to talk to. But most of all, I love how you make me feel - like I can be completely myself when I'm with you.",
      media: whatILove,
      alt: "What I love most about you"
    }
  ];

  useEffect(() => {
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < fullText.length) {
        setTerminalText(prev => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(typingEffect);
        setTimeout(() => setShowTerminal(false), 1500);
      }
    }, 50);

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(typingEffect);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const addHeart = (e) => {
    setHearts([...hearts, {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 20 + 10,
      color: `hsl(${Math.random() * 60 + 330}, 100%, 70%)`
    }]);
    
    setTimeout(() => {
      setHearts(hearts.slice(1));
    }, 3000);
  };

  const handleNext = () => {
    if (currentSection < sections.length) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const sendWhatsAppNotification = (response) => {
    const message = encodeURIComponent(
      `💘 Purity just said ${response} to your proposal!\n\n` +
      `Time: ${new Date().toLocaleTimeString()}\n` +
      `Date: ${new Date().toLocaleDateString()}\n\n` +
     ` ${response === 'YES' ? '🎉 Celebration time!' : '😔 Maybe next time...'}`
    );
    
    // Create hidden link and click it
    const link = document.createElement('a');
    link.href = `https://wa.me/2347041013001?text=${message}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show feedback popup
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 3000);
  };

  const handleYesClick = () => {
    setYesSize(prev => prev + 10);
    if (yesSize > 10) {
      setShowConfetti(true);
      sendWhatsAppNotification('YES');
      setTimeout(() => setShowConfetti(false), 8000);
    }
  };

  const handleNoClick = () => {
    sendWhatsAppNotification('NO');
  };

  const handleNoHover = () => {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    setNoPosition({ x, y });
  };

  if (showTerminal) {
    return (
      <div className="terminal">
        <pre>{terminalText}</pre>
        <div className="terminal-cursor">|</div>
      </div>
    );
  }

  if (currentSection === sections.length) {
    return (
      <div className="proposal-container" onClick={addHeart}>
        {showConfetti && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={500}
          />
        )}
        
        {showFeedback && (
          <div className="feedback-popup">
            Your response has been sent to your guy!
          </div>
        )}
        
        <div className="proposal">
          <h1 className="proposal-title">Purity,</h1>
          <h2 className="proposal-question">Will you be my Babe?</h2>
          <p className="proposal-subtext">nothing to worry about,lol...this yoruba demon will go easy on you.</p>
          
          <div className="buttons-container">
            <button 
              className="yes-button" 
              onClick={handleYesClick}
              style={{ fontSize: `${yesSize}px` }}
            >
              YES!
            </button>
            <button 
              className="no-button"
              onClick={handleNoClick}
              onMouseEnter={handleNoHover}
              style={{
                position: 'absolute',
                left: `${noPosition.x}px`,
                top: `${noPosition.y}px`
              }}
            >
              No
            </button>
          </div>
        </div>
        
        {hearts.map(heart => (
          <div 
            key={heart.id}
            className="heart"
            style={{
              left: `${heart.x}px`,
              top: `${heart.y}px`,
              fontSize: `${heart.size}px`,
              color: heart.color,
            }}
          >
            ❤
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="memory-section" onClick={addHeart}>
      <h1 className="section-title">{sections[currentSection].title}</h1>
      <p className="section-content">{sections[currentSection].content}</p>
      <div className="image-placeholder">
        <div className="polaroid">
          <img 
            src={sections[currentSection].media} 
            alt={sections[currentSection].alt}
            className="polaroid-image"
          />
          <div className="polaroid-caption">{sections[currentSection].alt}</div>
        </div>
      </div>
      <div className="navigation">
        {currentSection > 0 && (
          <button className="nav-button prev" onClick={handlePrev}>← Previous</button>
        )}
        <button className="nav-button next" onClick={handleNext}>
          {currentSection < sections.length - 1 ? 'Next →' : 'Final Question...'}
        </button>
      </div>
    </div>
  );
}

export default App;