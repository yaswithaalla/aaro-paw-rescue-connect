
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Camera, MapPin, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CameraCapture } from './CameraCapture';
import { useGeoLocation } from '@/utils/useGeoLocation';
import { simulateInjuryReport } from '@/utils/api';
import { useToast } from '@/components/ui/use-toast';

export const InjuryForm = () => {
  const [petImage, setPetImage] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'camera' | 'upload' | null>(null);
  const [description, setDescription] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const { location, locationError, fetchLocation } = useGeoLocation();
  const { toast } = useToast();

  const handleImageCapture = (image: string) => {
    setPetImage(image);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPetImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!petImage) {
      toast({
        title: "Missing image",
        description: "Please take or upload a photo of the injured pet",
        variant: "destructive",
      });
      return;
    }
    
    if (!location) {
      toast({
        title: "Location required",
        description: "Please share your location to help rescuers find the pet",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const result = await simulateInjuryReport({
        image: petImage,
        description,
        contactName,
        contactPhone,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      });
      
      if (result.success) {
        setIsSuccess(true);
        toast({
          title: "Report submitted successfully",
          description: "Nearby shelters have been notified and will respond soon",
        });
      } else {
        throw new Error("Failed to submit report");
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      toast({
        title: "Error submitting report",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setPetImage(null);
    setUploadMethod(null);
    setDescription('');
    setContactName('');
    setContactPhone('');
    setIsSuccess(false);
    setIsError(false);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-xl p-6 text-center"
      >
        <CheckCircle className="mx-auto mb-4 text-primary" size={48} />
        <h3 className="text-xl font-medium mb-2">Report Submitted</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for helping an animal in need. Your report has been sent to nearby shelters, and they will respond as soon as possible.
        </p>
        <p className="text-muted-foreground mb-6">
          A confirmation has been sent to your phone. You will receive updates when a rescuer is on the way.
        </p>
        <Button onClick={resetForm}>Report Another Injured Pet</Button>
      </motion.div>
    );
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-xl p-6 text-center"
      >
        <XCircle className="mx-auto mb-4 text-destructive" size={48} />
        <h3 className="text-xl font-medium mb-2">Something Went Wrong</h3>
        <p className="text-muted-foreground mb-6">
          We couldn't submit your report. Please try again or contact us directly.
        </p>
        <Button onClick={resetForm}>Try Again</Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-xl overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-medium mb-6">Report an Injured Pet</h3>

        <div className="space-y-6">
          {/* Pet Image */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Photo of the Pet <span className="text-red-500">*</span>
            </label>
            
            {!petImage && !uploadMethod && (
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={() => setUploadMethod('camera')}
                >
                  <Camera size={18} />
                  Take Photo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={() => setUploadMethod('upload')}
                >
                  <Upload size={18} />
                  Upload Photo
                </Button>
              </div>
            )}
            
            {uploadMethod === 'camera' && (
              <CameraCapture onCapture={handleImageCapture} />
            )}
            
            {uploadMethod === 'upload' && !petImage && (
              <div className="mt-2">
                <label className="relative flex flex-col items-center justify-center border-2 border-dashed border-border p-6 rounded-lg cursor-pointer transition-all hover:bg-muted/50">
                  <div className="space-y-2 text-center">
                    <Upload className="mx-auto text-muted-foreground" size={36} />
                    <div className="text-sm text-muted-foreground">
                      <span>Click to upload</span> or drag and drop
                    </div>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG or GIF (max. 10MB)
                    </p>
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            )}
            
            {petImage && uploadMethod === 'upload' && (
              <div className="mt-4 relative rounded-lg overflow-hidden border border-border">
                <img 
                  src={petImage} 
                  alt="Uploaded pet" 
                  className="w-full h-64 object-cover"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => setPetImage(null)}
                >
                  Change
                </Button>
              </div>
            )}
          </div>
          
          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            
            {location ? (
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg text-sm">
                <MapPin size={16} className="text-primary" />
                <span>
                  Location shared: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                </span>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="sm"
                  onClick={fetchLocation}
                  className="ml-auto"
                >
                  Update
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={fetchLocation}
              >
                <MapPin size={18} />
                Share My Location
              </Button>
            )}
            
            {locationError && (
              <p className="mt-2 text-sm text-red-500">
                {locationError}
              </p>
            )}
          </div>
          
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Describe the pet and its condition (e.g., dog with injured leg, cat with wounds)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
              rows={4}
            />
          </div>
          
          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contactName" className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <Input
                id="contactName"
                placeholder="Enter your name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="contactPhone" className="block text-sm font-medium mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <Input
                id="contactPhone"
                placeholder="Enter your phone number"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-muted/30 border-t border-border flex justify-end">
        <Button 
          type="submit" 
          disabled={isSubmitting || !petImage || !location || !contactPhone} 
          className="bg-primary hover:bg-primary/90"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Report'
          )}
        </Button>
      </div>
    </form>
  );
};
