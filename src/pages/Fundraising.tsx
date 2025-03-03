import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { FundraisingCard } from '@/components/FundraisingCard';
import { fetchFundraisingCampaigns } from '@/utils/api';
import { Layout } from '@/components/Layout';

const Fundraising = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const result = await fetchFundraisingCampaigns();
        if (result.success) {
          setCampaigns(result.data);
        }
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCampaigns();
  }, []);
  
  return (
    <Layout>
      <div className="pt-24 pb-16 page-container">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Support Our Cause</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your contributions help us rescue, rehabilitate, and rehome animals in need throughout Visakhapatnam.
          </p>
        </div>
        
        {/* Campaign listings */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 size={36} className="animate-spin text-primary" />
          </div>
        ) : campaigns.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
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
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No campaigns found</h3>
            <p className="text-muted-foreground">
              Check back soon for new fundraising campaigns.
            </p>
          </div>
        )}
        
        {/* How funds are used */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">How Your Donations Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-primary/5 rounded-xl p-6 border border-primary/10"
            >
              <h3 className="font-medium text-lg mb-3">Medical Care</h3>
              <p className="text-muted-foreground">
                Your donations help provide veterinary care, medications, surgeries, and rehabilitation for injured and sick animals.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-secondary/5 rounded-xl p-6 border border-secondary/10"
            >
              <h3 className="font-medium text-lg mb-3">Shelter Operations</h3>
              <p className="text-muted-foreground">
                Funds help maintain our shelters, provide food, clean bedding, and create a safe environment for rescued animals.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-accent/5 rounded-xl p-6 border border-accent/10"
            >
              <h3 className="font-medium text-lg mb-3">Rescue Operations</h3>
              <p className="text-muted-foreground">
                We use donations to fund rescue vehicles, equipment, and staff to respond to emergency calls about injured animals.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Other ways to help */}
        <div className="mt-16 bg-muted/30 rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Other Ways to Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background rounded-lg p-6 border border-border">
              <h3 className="font-medium text-lg mb-3">Volunteer With Us</h3>
              <p className="text-muted-foreground mb-4">
                We're always looking for volunteers to help with animal care, administration, fundraising, and outreach activities.
              </p>
              <a href="#" className="text-primary hover:underline">Learn more about volunteering</a>
            </div>
            
            <div className="bg-background rounded-lg p-6 border border-border">
              <h3 className="font-medium text-lg mb-3">Donate Supplies</h3>
              <p className="text-muted-foreground mb-4">
                We accept donations of pet food, bedding, toys, cleaning supplies, and other items needed for our shelters.
              </p>
              <a href="#" className="text-primary hover:underline">View our wishlist</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Fundraising;
