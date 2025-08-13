import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface AnimatedCardProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
  whileHoverScale?: number;
}

const AnimatedCard = ({ children, index = 0, className = '', whileHoverScale = 1.02 }: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group perspective-1000"
    >
      <Card
        className={`transform-3d backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-3d hover:bg-white/15 transition-all duration-500 overflow-hidden ${className}`}
      >
        <motion.div
          whileHover={{ scale: whileHoverScale }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default AnimatedCard;
