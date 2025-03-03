
import { Link } from 'react-router-dom';
import { Heart, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border mt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-xl font-bold text-primary">
              Aaro Pet Rescue
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Helping injured animals in Visakhapatnam find care, shelter, and loving homes.
            </p>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-medium text-base mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/report" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Report Injury
                </Link>
              </li>
              <li>
                <Link to="/adoption" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Adoption
                </Link>
              </li>
              <li>
                <Link to="/fundraising" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Fundraising
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-medium text-base mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Pet Care Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Emergency Contacts
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Volunteer
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-medium text-base mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Email: contact@aaropetrescue.org
            </p>
            <p className="text-sm text-muted-foreground">
              Phone: +91 1234567890
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Aaro Pet Rescue. All rights reserved.
          </p>
          <div className="flex items-center mt-4 sm:mt-0">
            <span className="text-sm text-muted-foreground flex items-center">
              Made with <Heart size={14} className="mx-1 text-red-500" /> in Visakhapatnam
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
