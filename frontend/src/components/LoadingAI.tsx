import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

interface LoadingAIProps {
  message?: string;
  fullPage?: boolean;
}

const LoadingAI: React.FC<LoadingAIProps> = ({ 
  message = 'Processing with AI...', 
  fullPage = false 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Streaming text effect
  useEffect(() => {
    if (currentIndex < message.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(message.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      // Reset after completion for continuous loop
      const resetTimeout = setTimeout(() => {
        setCurrentIndex(0);
        setDisplayedText('');
      }, 2000);
      return () => clearTimeout(resetTimeout);
    }
  }, [currentIndex, message]);

  return (
    <div className={`flex flex-col items-center justify-center gap-6 ${fullPage ? 'min-h-[50vh]' : 'py-12'}`}>
      {/* Pulsing Brain Icon */}
      <motion.div
        className="relative"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Outer glow rings */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary-violet/20 blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-primary-cyan/20 blur-xl"
          animate={{
            scale: [1.5, 1, 1.5],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
        
        {/* Brain icon */}
        <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-violet to-primary-cyan shadow-glow">
          <Brain className="w-12 h-12 text-white" strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* Streaming text */}
      <div className="text-center">
        <p className="text-lg font-medium text-text-primary">
          {displayedText}
          <motion.span
            className="inline-block w-0.5 h-5 bg-primary-violet ml-1"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </p>
        
        {/* Loading dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-violet to-primary-cyan"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingAI;
