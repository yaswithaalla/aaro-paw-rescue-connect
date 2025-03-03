
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface FundraisingCardProps {
  id: string;
  title: string;
  image: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  dayLeft: number;
}

export const FundraisingCard = ({
  id,
  title,
  image,
  description,
  targetAmount,
  raisedAmount,
  dayLeft,
}: FundraisingCardProps) => {
  const progressPercentage = Math.min((raisedAmount / targetAmount) * 100, 100);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-xl overflow-hidden h-full flex flex-col transition-all-300 hover:shadow-xl"
    >
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <img src={image} alt={title} className="w-full h-52 object-cover" />
        <div className="absolute bottom-0 left-0 w-full p-4 z-20">
          <h3 className="text-white font-semibold text-xl line-clamp-1">{title}</h3>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-sm line-clamp-3 text-foreground/80 mb-4">{description}</p>
        
        <div className="mt-auto space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">₹{raisedAmount.toLocaleString()}</span>
              <span className="text-muted-foreground">of ₹{targetAmount.toLocaleString()}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{progressPercentage.toFixed(0)}% Funded</span>
            <span>{dayLeft} {dayLeft === 1 ? 'day' : 'days'} left</span>
          </div>
          
          <Button className="w-full">Donate Now</Button>
        </div>
      </div>
    </motion.div>
  );
};
