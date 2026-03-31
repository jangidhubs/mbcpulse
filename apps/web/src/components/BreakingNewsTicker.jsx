import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

function BreakingNewsTicker() {
  const breakingNews = [
    "Virat Kohli scores century in Mumbai Test",
    "Sensex crosses 85,000 mark for first time",
    "IPL 2026 auction sees record-breaking bids",
    "RBI maintains repo rate at 6.5%",
    "India's tech unicorns add 12 new startups"
  ];

  return (
    <div className="bg-primary text-primary-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-2">
          <div className="flex items-center space-x-2 mr-4 flex-shrink-0">
            <Zap size={16} className="animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-wide">Breaking</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <motion.div
              className="flex space-x-12"
              animate={{
                x: [0, -1000]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear"
                }
              }}
            >
              {[...breakingNews, ...breakingNews].map((news, index) => (
                <span key={index} className="text-sm font-medium whitespace-nowrap">
                  {news}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreakingNewsTicker;