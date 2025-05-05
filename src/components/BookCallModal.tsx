
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

const services = [
  'AI Business Optimization',
  'AI Assistants for Enterprises',
  'AI-Powered Web & App Development',
  'AI & Content Generation',
  'Custom AI Agent Development',
  'AI Consulting & Training'
];

export const BookCallModal = ({ isOpen, onClose }: BookCallModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!name || !email || !service || !date || !time) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Show success state
    setSubmitted(true);
    
    // In a real app, you would submit to a backend here
    console.log({ name, email, service, date, time });
    
    // Reset form after 2 seconds and close modal
    setTimeout(() => {
      setName('');
      setEmail('');
      setService('');
      setDate(undefined);
      setTime('');
      setSubmitted(false);
      onClose();
      toast.success('Your call has been scheduled!');
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Book a Call</DialogTitle>
          <DialogDescription>
            Schedule a consultation with our AI experts to discuss your business needs.
          </DialogDescription>
        </DialogHeader>
        
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 animate-fade-in">
            <CheckCircle className="text-monk w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold text-charcoal">Booking Confirmed!</h3>
            <p className="text-center text-muted-foreground mt-2">
              We'll send you a confirmation email with all the details.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Your name"
                className="focus-visible:ring-monk"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="your.email@example.com"
                className="focus-visible:ring-monk"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="service">Service</Label>
              <Select value={service} onValueChange={setService}>
                <SelectTrigger className="focus:ring-monk">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                      className="p-3"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger id="time" className="focus:ring-monk">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-monk hover:bg-monk/90 text-white btn-hover mt-4"
            >
              Schedule Call
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
