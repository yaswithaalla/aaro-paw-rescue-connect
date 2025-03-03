
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PetCardProps {
  id: string;
  name: string;
  age: string;
  breed: string;
  image: string;
  location: string;
  description: string;
  forAdoption?: boolean;
}

export const PetCard = ({
  id,
  name,
  age,
  breed,
  image,
  location,
  description,
  forAdoption = false,
}: PetCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <div
        className="glass-card rounded-xl overflow-hidden h-full flex flex-col transition-all-300 hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden aspect-square">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
          
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
          />
          
          <button
            onClick={toggleLike}
            className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-md ${
              isLiked ? 'bg-white/20 text-red-500' : 'bg-black/20 text-white/90'
            } transition-all-200 hover:scale-110`}
            aria-label={isLiked ? 'Unlike' : 'Like'}
          >
            <Heart
              size={20}
              className={isLiked ? 'fill-red-500' : ''}
            />
          </button>
          
          {forAdoption && (
            <Badge className="absolute top-3 left-3 z-20 bg-secondary text-secondary-foreground">
              For Adoption
            </Badge>
          )}
          
          <div className="absolute bottom-0 left-0 w-full p-3 z-20">
            <h3 className="text-white font-semibold text-xl">{name}</h3>
            <p className="text-white/80 text-sm">{breed}</p>
          </div>
        </div>
        
        <div className="flex-1 p-4 flex flex-col">
          <div className="space-y-2 mb-4 flex-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar size={14} className="mr-1" /> {age}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin size={14} className="mr-1" /> {location}
            </div>
            <p className="text-sm mt-2 line-clamp-3">{description}</p>
          </div>
          
          <Button 
            className="w-full mt-2 rounded-md"
            variant={forAdoption ? "default" : "outline"}
          >
            {forAdoption ? 'Adopt Me' : 'View Details'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
