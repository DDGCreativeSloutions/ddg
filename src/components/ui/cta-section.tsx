import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

const CTASection = ({
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  className = ''
}: CTASectionProps) => {
  return (
    <section className={`py-20 relative ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="perspective-1000"
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-black mb-6 leading-tight bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent transform-3d"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h2>
          
          <motion.p 
            className="text-xl text-black max-w-3xl mx-auto mb-8 leading-relaxed backdrop-blur-sm bg-white/10 p-4 rounded-2xl border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {description}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              className="px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-2xl shadow-3d backdrop-blur-xl hover:shadow-glow-purple transition-all duration-500 text-lg"
              whileHover={{ scale: 1.05, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPrimaryClick}
            >
              {primaryButtonText}
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </motion.button>
            
            {secondaryButtonText && (
              <motion.button
                className="px-6 py-4 backdrop-blur-xl bg-white/10 border border-white/20 text-black font-bold rounded-2xl hover:bg-white/20 transition-all duration-500 text-lg"
                whileHover={{ scale: 1.05, rotateX: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={onSecondaryClick}
              >
                {secondaryButtonText}
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
