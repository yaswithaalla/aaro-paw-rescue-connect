
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Heart, DollarSign, MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PetCard } from '@/components/PetCard';
import { FundraisingCard } from '@/components/FundraisingCard';
import { petsForAdoption, fundraisingCampaigns } from '@/utils/api';
import { Layout } from '@/components/Layout';

const HeroSection = () => (
  <div className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
      <img 
        src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1920&q=80" 
        alt="Hero Background" 
        className="object-cover w-full h-full"
      />
    </div>
    
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 lg:py-32">
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Help Rescue Animals in Visakhapatnam
          </h1>
          
          <p className="text-xl text-white/80 mb-8">
            Report injured animals, support local shelters, and find loving pets for adoption through Aaro Pet Rescue.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/report">
                Report an Injured Pet
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20 border-white/30">
              <Link to="/adoption">
                Adopt a Pet
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

const FeatureSection = () => {
  const features = [
    {
      icon: <Camera className="h-10 w-10 text-primary" />,
      title: "Report Injured Pets",
      description: "Take a photo of injured animals and share their location to alert nearby rescue shelters.",
      link: "/report",
      color: "bg-primary/5",
    },
    {
      icon: <Heart className="h-10 w-10 text-secondary" />,
      title: "Adopt a Pet",
      description: "Find your new companion from our selection of pets waiting for a loving home.",
      link: "/adoption",
      color: "bg-secondary/5",
    },
    {
      icon: <DollarSign className="h-10 w-10 text-accent" />,
      title: "Fundraising",
      description: "Support our shelters by contributing to our fundraising campaigns for animal welfare.",
      link: "/fundraising",
      color: "bg-accent/5",
    },
  ];

  return (
    <div className="py-20 page-container">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How You Can Help</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Every action makes a difference in the lives of animals in need. Choose how you'd like to contribute.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className={`rounded-xl p-6 h-full ${feature.color} border border-border flex flex-col`}>
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-6 flex-1">{feature.description}</p>
              <Button asChild variant="ghost" className="justify-start px-0">
                <Link to={feature.link} className="flex items-center">
                  Learn more <MoveRight size={14} className="ml-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const AdoptionPreview = () => {
  const [pets, setPets] = useState(petsForAdoption.slice(0, 3));

  return (
    <div className="py-20 bg-muted/30">
      <div className="page-container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Pets for Adoption</h2>
            <p className="text-muted-foreground max-w-2xl">
              Meet our adorable pets looking for loving homes in Visakhapatnam.
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link to="/adoption">
              View All Pets
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pets.map((pet) => (
            <PetCard 
              key={pet.id}
              id={pet.id}
              name={pet.name}
              age={pet.age}
              breed={pet.breed}
              image={pet.image}
              location={pet.location}
              description={pet.description}
              forAdoption={pet.forAdoption}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const FundraisingPreview = () => {
  const [campaigns, setCampaigns] = useState(fundraisingCampaigns.slice(0, 3));

  return (
    <div className="py-20">
      <div className="page-container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Support Our Cause</h2>
            <p className="text-muted-foreground max-w-2xl">
              Your contributions help us continue our mission of rescuing and caring for animals in need.
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link to="/fundraising">
              View All Campaigns
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <FundraisingCard 
              key={campaign.id}
              id={campaign.id}
              title={campaign.title}
              image={campaign.image}
              description={campaign.description}
              targetAmount={campaign.targetAmount}
              raisedAmount={campaign.raisedAmount}
              dayLeft={campaign.dayLeft}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeatureSection />
      <AdoptionPreview />
      <FundraisingPreview />
    </Layout>
  );
};

export default Index;
