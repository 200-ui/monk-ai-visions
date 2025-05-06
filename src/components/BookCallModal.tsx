
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookCallModal = ({ isOpen, onClose }: BookCallModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  // Set focus to name field when modal opens
  useEffect(() => {
    if (isOpen && nameRef.current) {
      setTimeout(() => {
        nameRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!name || !email || !service || !message || !agreedToTerms) {
      toast.error('Please fill in all required fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Your call request has been received. We will contact you soon!');
      
      // Reset form and close modal
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setService('');
      setMessage('');
      setAgreedToTerms(false);
      onClose();
    }, 1500);
  };

  const services = [
    { value: 'ai-business-optimization', label: 'AI Business Optimization' },
    { value: 'ai-assistants', label: 'Enterprise AI Assistants' },
    { value: 'web-dev', label: 'AI-Powered Web & App Development' },
    { value: 'content-gen', label: 'AI & Content Generation' },
    { value: 'custom-agents', label: 'Custom AI Agent Development' },
    { value: 'consulting', label: 'AI Consulting & Training' },
    { value: 'general-inquiry', label: 'General Inquiry' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] dark:bg-charcoal/95 dark:text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center dark:text-white">Book a Call</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="dark:text-white">Full Name *</Label>
              <Input 
                id="name" 
                ref={nameRef}
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Your name" 
                required 
                className="dark:bg-charcoal/60 dark:border-gray-700 dark:text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="dark:text-white">Email Address *</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Your email" 
                required 
                className="dark:bg-charcoal/60 dark:border-gray-700 dark:text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="dark:text-white">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="Your phone number" 
                className="dark:bg-charcoal/60 dark:border-gray-700 dark:text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address" className="dark:text-white">Address</Label>
              <Input 
                id="address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                placeholder="Your address" 
                className="dark:bg-charcoal/60 dark:border-gray-700 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service" className="dark:text-white">Service of Interest *</Label>
              <Select value={service} onValueChange={setService} required>
                <SelectTrigger className="w-full dark:bg-charcoal/60 dark:border-gray-700 dark:text-white">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent className="dark:bg-charcoal/95 dark:border-gray-700">
                  {services.map((service) => (
                    <SelectItem key={service.value} value={service.value} className="dark:text-white dark:focus:bg-gray-700">
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="dark:text-white">Message *</Label>
              <Textarea 
                id="message" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Tell us about your project or inquiry" 
                rows={4}
                required 
                className="resize-none dark:bg-charcoal/60 dark:border-gray-700 dark:text-white"
              />
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox 
                id="terms" 
                checked={agreedToTerms} 
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                className="data-[state=checked]:bg-monk dark:border-gray-500"
              />
              <Label 
                htmlFor="terms" 
                className="text-sm font-normal text-gray-600 dark:text-gray-300"
              >
                I agree to the processing of my data as outlined in the Privacy Policy.
              </Label>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-monk hover:bg-monk/90 text-white ml-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : 'Schedule Call'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
