import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  badge?: string;
  title: string;
  description: string;
  className?: string;
}

const Hero = ({ badge, title, description, className = '' }: HeroProps) => {
  return (
    <section className={`py-20 relative ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {badge && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 text-black rounded-full text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4 mr-2 text-purple-600 animate-glow-pulse" />
              {badge}
            </motion.div>
          )}
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
          >
            {title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-black max-w-3xl mx-auto leading-relaxed backdrop-blur-sm bg-white/10 p-4 rounded-2xl border border-white/10"
          >
            {description}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
