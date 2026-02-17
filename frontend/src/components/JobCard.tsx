import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import type { Job } from '../types';
import GlassCard from './ui/GlassCard';
import { cn } from '../lib/utils';

interface JobCardProps {
  job: Job;
  onClick?: () => void;
  showStatus?: boolean;
  matchScore?: number; // Optional match score for applicants
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick, showStatus = false, matchScore }) => {
  return (
    <GlassCard
      className="p-6 cursor-pointer group relative overflow-hidden"
      onClick={onClick}
      hover
      glow
      glowColor="violet"
    >
      {/* Match Score Badge - appears on hover */}
      {matchScore !== undefined && (
        <motion.div
          className="absolute top-4 right-4 z-10"
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          whileHover={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            {/* Radial gradient background */}
            <div className={cn(
              'w-16 h-16 rounded-xl flex flex-col items-center justify-center shadow-lg',
              'bg-gradient-radial',
              matchScore >= 80 ? 'from-green-500 via-emerald-500 to-green-600' :
              matchScore >= 60 ? 'from-cyan-500 via-blue-500 to-cyan-600' :
              matchScore >= 40 ? 'from-violet-500 via-purple-500 to-violet-600' :
              'from-orange-500 via-red-500 to-orange-600'
            )}>
              <TrendingUp className="w-4 h-4 text-white mb-0.5" />
              <span className="text-xl font-bold text-white">{matchScore}%</span>
              <span className="text-[10px] text-white/80 uppercase tracking-wide">Match</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Card Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <motion.h3 
            className="text-2xl font-bold text-text-primary mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary-violet group-hover:to-primary-cyan group-hover:bg-clip-text transition-all duration-300"
          >
            {job.title}
          </motion.h3>
        </div>
        {showStatus && (
          <span className={cn(
            'px-3 py-1 rounded-lg text-sm font-semibold',
            job.status === 'active' 
              ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
              : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
          )}>
            {job.status}
          </span>
        )}
      </div>

      {/* Job Details */}
      <div className="flex flex-wrap gap-4 mb-4">
        <motion.div 
          className="flex items-center gap-2 text-text-secondary"
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-2 rounded-lg bg-primary-violet/10 group-hover:bg-primary-violet/20 transition-colors">
            <MapPin className="w-4 h-4 text-primary-violet" />
          </div>
          <span className="text-sm">{job.location}</span>
        </motion.div>

        <motion.div 
          className="flex items-center gap-2 text-text-secondary"
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-2 rounded-lg bg-primary-cyan/10 group-hover:bg-primary-cyan/20 transition-colors">
            <DollarSign className="w-4 h-4 text-primary-cyan" />
          </div>
          <span className="text-sm">{job.salary_range}</span>
        </motion.div>

        <motion.div 
          className="flex items-center gap-2 text-text-secondary"
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-2 rounded-lg bg-primary-violet/10 group-hover:bg-primary-violet/20 transition-colors">
            <Calendar className="w-4 h-4 text-primary-violet" />
          </div>
          <span className="text-sm">{new Date(job.created_at).toLocaleDateString()}</span>
        </motion.div>
      </div>

      {/* Description */}
      <p className="text-text-secondary leading-relaxed mb-4 line-clamp-3">
        {job.description.length > 150 
          ? `${job.description.substring(0, 150)}...` 
          : job.description}
      </p>

      {/* Footer with View Details */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <motion.button
          className="flex items-center gap-2 text-primary-violet font-semibold group-hover:text-primary-cyan transition-colors"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <span>View Details</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.button>
      </div>

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-violet/5 to-primary-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
    </GlassCard>
  );
};

export default JobCard;
