
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CalendarIcon, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  phone: z.string().min(7, { message: 'Phone number is required' }),
  address: z.string().optional(),
  date: z.date({ required_error: 'Please select a date' }),
  service: z.string({ required_error: 'Please select a service' }),
  message: z.string().min(10, { message: 'Message should be at least 10 characters' }),
});

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookCallModal = ({ isOpen, onClose }: BookCallModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      message: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Show success state
    setIsSubmitted(true);
    toast({
      title: "Booking Successful!",
      description: `We've received your request and will contact you soon.`,
    });
    
    // Reset form after a delay
    setTimeout(() => {
      form.reset();
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-monk">Book a Call</DialogTitle>
          <DialogDescription>
            Schedule a free consultation to discuss how we can help your business leverage AI.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-charcoal">Booking Successful!</h3>
            <p className="mt-2 text-center text-charcoal/70">
              Thank you for scheduling a call. We'll reach out to confirm your appointment shortly.
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email address" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your business address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Preferred Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="center">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ai-business-optimization" id="ai-business-optimization" />
                          <Label htmlFor="ai-business-optimization">AI Business Optimization</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ai-assistants" id="ai-assistants" />
                          <Label htmlFor="ai-assistants">AI Assistants</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="web-app-development" id="web-app-development" />
                          <Label htmlFor="web-app-development">Web & App Development</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="content-generation" id="content-generation" />
                          <Label htmlFor="content-generation">Content Generation</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ai-agent-development" id="ai-agent-development" />
                          <Label htmlFor="ai-agent-development">AI Agent Development</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="consulting-training" id="consulting-training" />
                          <Label htmlFor="consulting-training">Consulting & Training</Label>
                        </div>
                        <div className="flex items-center space-x-2 col-span-2">
                          <RadioGroupItem value="general-inquiry" id="general-inquiry" />
                          <Label htmlFor="general-inquiry">General Inquiry</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your project or needs"
                        {...field}
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-monk hover:bg-monk/90">
                Book Your Call
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
