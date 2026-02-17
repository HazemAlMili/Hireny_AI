import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  glowColor?: 'violet' | 'cyan' | 'success' | 'danger';
  hover?: boolean;
}

const glowColors = {
  violet: 'shadow-glow hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]',
  cyan: 'shadow-glow-cyan hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]',
  success: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]',
  danger: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]',
};

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, glow = false, glowColor = 'violet', hover = true, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative rounded-2xl border border-border bg-surface backdrop-blur-glass',
          'transition-all duration-300 ease-smooth',
          hover && 'hover:border-border-hover hover:bg-surface-hover',
          glow && glowColors[glowColor],
          className
        )}
        whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        {...props}
      >
        {glow && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-glow opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
        )}
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;
