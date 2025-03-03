
// This is a simulated API service since we don't have a real backend yet

interface InjuryReportData {
  image: string;
  description: string;
  contactName: string;
  contactPhone: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

// Simulated shelter data
export const shelters = [
  {
    id: '1',
    name: 'Visakhapatnam Animal Care',
    address: 'MVP Colony, Visakhapatnam',
    phone: '+91 9876543210',
    email: 'contact@visakhapetcare.org',
  },
  {
    id: '2',
    name: 'Helping Paws Shelter',
    address: 'Seethammadhara, Visakhapatnam',
    phone: '+91 9876543211',
    email: 'info@helpingpaws.org',
  },
  {
    id: '3',
    name: 'Animal Rescue and Rehabilitation',
    address: 'Madhurawada, Visakhapatnam',
    phone: '+91 9876543212',
    email: 'rescue@arr.org',
  },
];

// Mock pets for adoption
export const petsForAdoption = [
  {
    id: '1',
    name: 'Buddy',
    age: '2 years',
    breed: 'Labrador Mix',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
    location: 'Visakhapatnam Animal Care',
    description: 'Buddy is a friendly and energetic Labrador mix who loves to play and go for walks. He is good with children and other dogs.',
    forAdoption: true,
  },
  {
    id: '2',
    name: 'Luna',
    age: '1 year',
    breed: 'Domestic Shorthair',
    image: 'https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?auto=format&fit=crop&w=800&q=80',
    location: 'Helping Paws Shelter',
    description: 'Luna is a playful and affectionate cat who enjoys cuddling and playing with toys. She is litter-trained and gets along well with other cats.',
    forAdoption: true,
  },
  {
    id: '3',
    name: 'Max',
    age: '3 years',
    breed: 'German Shepherd',
    image: 'https://images.unsplash.com/photo-1553882809-a4f57e59501d?auto=format&fit=crop&w=800&q=80',
    location: 'Animal Rescue and Rehabilitation',
    description: 'Max is a loyal and intelligent German Shepherd who is looking for an active family. He knows basic commands and is very protective.',
    forAdoption: true,
  },
  {
    id: '4',
    name: 'Daisy',
    age: '4 months',
    breed: 'Mixed Breed Puppy',
    image: 'https://images.unsplash.com/photo-1583337618826-83100a73626f?auto=format&fit=crop&w=800&q=80',
    location: 'Visakhapatnam Animal Care',
    description: 'Daisy is a sweet and playful puppy who is eager to learn. She is partially house-trained and would make a great family pet.',
    forAdoption: true,
  },
  {
    id: '5',
    name: 'Oliver',
    age: '2 years',
    breed: 'Tabby Cat',
    image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=800&q=80',
    location: 'Helping Paws Shelter',
    description: 'Oliver is a calm and gentle cat who loves to nap in sunny spots. He is very affectionate and would do well in a quiet home.',
    forAdoption: true,
  },
  {
    id: '6',
    name: 'Rocky',
    age: '5 years',
    breed: 'Pit Bull Mix',
    image: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=800&q=80',
    location: 'Animal Rescue and Rehabilitation',
    description: 'Rocky is a strong and loyal dog who needs an experienced owner. He is well-trained and has a lot of love to give to the right family.',
    forAdoption: true,
  },
];

// Mock fundraising campaigns
export const fundraisingCampaigns = [
  {
    id: '1',
    title: 'Emergency Medical Fund',
    image: 'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?auto=format&fit=crop&w=800&q=80',
    description: 'Help us cover the medical expenses for injured strays and rescued animals in need of urgent care.',
    targetAmount: 50000,
    raisedAmount: 32450,
    dayLeft: 12,
  },
  {
    id: '2',
    title: 'Shelter Expansion Project',
    image: 'https://images.unsplash.com/photo-1551730459-92db2a308d6a?auto=format&fit=crop&w=800&q=80',
    description: 'We are expanding our shelter to accommodate more animals. Your contribution will help build new kennels and play areas.',
    targetAmount: 200000,
    raisedAmount: 85600,
    dayLeft: 30,
  },
  {
    id: '3',
    title: 'Sterilization Drive',
    image: 'https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=800&q=80',
    description: 'Support our initiative to control the stray animal population in Visakhapatnam through humane sterilization programs.',
    targetAmount: 75000,
    raisedAmount: 47800,
    dayLeft: 15,
  },
  {
    id: '4',
    title: 'Winter Shelter for Strays',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80',
    description: 'Help us provide warm shelters, blankets, and food for stray animals during the cold winter months.',
    targetAmount: 30000,
    raisedAmount: 18900,
    dayLeft: 20,
  },
];

// Simulated API call for reporting an injured pet
export const simulateInjuryReport = async (data: InjuryReportData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log('Injury report submitted:', data);
  
  // Return a successful response
  return {
    success: true,
    message: 'Report submitted successfully',
    sheltersNotified: shelters.length,
  };
};

// Simulated API call for getting pets for adoption
export const fetchPetsForAdoption = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    data: petsForAdoption,
  };
};

// Simulated API call for getting fundraising campaigns
export const fetchFundraisingCampaigns = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    data: fundraisingCampaigns,
  };
};
