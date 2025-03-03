
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PetCard } from '@/components/PetCard';
import { fetchPetsForAdoption } from '@/utils/api';
import { Layout } from '@/components/Layout';

const Adoption = () => {
  const [pets, setPets] = useState<any[]>([]);
  const [filteredPets, setFilteredPets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [petType, setPetType] = useState('all');
  
  useEffect(() => {
    const loadPets = async () => {
      try {
        const result = await fetchPetsForAdoption();
        if (result.success) {
          setPets(result.data);
          setFilteredPets(result.data);
        }
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPets();
  }, []);
  
  useEffect(() => {
    // Filter pets based on search term and pet type
    let results = pets;
    
    if (searchTerm) {
      results = results.filter(pet => 
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (petType !== 'all') {
      results = results.filter(pet => {
        if (petType === 'dog') {
          return pet.breed.toLowerCase().includes('dog') || 
                 pet.breed.toLowerCase().includes('puppy') ||
                 pet.breed.toLowerCase().includes('labrador') ||
                 pet.breed.toLowerCase().includes('shepherd') ||
                 pet.breed.toLowerCase().includes('pit bull');
        } else if (petType === 'cat') {
          return pet.breed.toLowerCase().includes('cat') || 
                 pet.breed.toLowerCase().includes('kitten') ||
                 pet.breed.toLowerCase().includes('tabby') ||
                 pet.breed.toLowerCase().includes('shorthair');
        }
        return true;
      });
    }
    
    setFilteredPets(results);
  }, [searchTerm, petType, pets]);
  
  return (
    <Layout>
      <div className="pt-24 pb-16 page-container">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Adopt a Pet</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find your perfect companion from our selection of lovely pets looking for their forever home in Visakhapatnam.
          </p>
        </div>
        
        {/* Search and filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="text"
                placeholder="Search by name, breed, or description"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-48">
              <Select value={petType} onValueChange={setPetType}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center">
                    <Filter size={18} className="mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Pet Type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Pet Type</SelectLabel>
                    <SelectItem value="all">All Pets</SelectItem>
                    <SelectItem value="dog">Dogs</SelectItem>
                    <SelectItem value="cat">Cats</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Pet listings */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 size={36} className="animate-spin text-primary" />
          </div>
        ) : filteredPets.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPets.map((pet) => (
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
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No pets found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find more pets.
            </p>
          </div>
        )}
        
        {/* Adoption info */}
        <div className="mt-16 bg-muted/30 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Adoption Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background rounded-lg p-4 border border-border">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium mb-4">1</div>
              <h3 className="font-medium mb-2">Find Your Match</h3>
              <p className="text-sm text-muted-foreground">Browse our available pets and find one that matches your lifestyle and preferences.</p>
            </div>
            
            <div className="bg-background rounded-lg p-4 border border-border">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium mb-4">2</div>
              <h3 className="font-medium mb-2">Meet and Greet</h3>
              <p className="text-sm text-muted-foreground">Visit the shelter to meet the pet in person and see if you're a good match for each other.</p>
            </div>
            
            <div className="bg-background rounded-lg p-4 border border-border">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium mb-4">3</div>
              <h3 className="font-medium mb-2">Complete Adoption</h3>
              <p className="text-sm text-muted-foreground">Fill out the adoption form, pay the adoption fee, and take your new friend home!</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Adoption;
