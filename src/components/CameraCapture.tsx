
import { useState, useRef, useEffect } from 'react';
import { Camera, ImageOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface CameraCaptureProps {
  onCapture: (image: string) => void;
}

export const CameraCapture = ({ onCapture }: CameraCaptureProps) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      setCameraError(false);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use the back camera if available
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraError(true);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setCameraActive(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const image = canvas.toDataURL('image/jpeg');
        setCapturedImage(image);
        onCapture(image);
        stopCamera();
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="mt-4 space-y-4">
      <AnimatePresence mode="wait">
        {!cameraActive && !capturedImage && (
          <motion.div
            key="startCamera"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center"
          >
            <Button 
              onClick={startCamera}
              className="flex items-center gap-2"
            >
              <Camera size={18} /> 
              {cameraError ? 'Try Again' : 'Take a Photo'}
            </Button>
          </motion.div>
        )}

        {cameraActive && (
          <motion.div
            key="cameraView"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-4"
          >
            <div className="relative rounded-lg overflow-hidden border border-border shadow-sm aspect-video">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex justify-center">
              <Button onClick={captureImage}>Capture</Button>
            </div>
          </motion.div>
        )}

        {capturedImage && (
          <motion.div
            key="capturedImage"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-4"
          >
            <div className="relative rounded-lg overflow-hidden border border-border shadow-sm aspect-video">
              <img 
                src={capturedImage} 
                alt="Captured pet" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={retakePhoto}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw size={16} /> 
                Retake Photo
              </Button>
            </div>
          </motion.div>
        )}

        {cameraError && !cameraActive && !capturedImage && (
          <motion.div
            key="cameraError"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-center"
          >
            <ImageOff className="mx-auto mb-2" size={24} />
            <p className="text-sm">
              Unable to access camera. Please check your camera permissions or try uploading an image instead.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
