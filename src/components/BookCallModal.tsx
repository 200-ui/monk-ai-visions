import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
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
import { CalendarIcon, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const [isLoading, setIsLoading] = useState(false);
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
    try {
      setIsLoading(true);
      
      // Call the email service
      const response = await fetch('https://fwnsfbpjlhnoaskcxvat.supabase.co/functions/v1/send-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'book-call',
          formData: {
            name: values.name,
            email: values.email,
            phone: values.phone,
            address: values.address,
            date: values.date?.toISOString(),
            service: values.service,
            message: values.message,
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send emails');
      }

      // Show success state
      setIsSubmitted(true);
      toast({
        title: "Booking Successful!",
        description: `We've received your request and sent confirmation emails.`,
      });
      
      // Reset form after a delay
      setTimeout(() => {
        form.reset();
        setIsSubmitted(false);
        setIsLoading(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto dark:bg-gray-800 dark:text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-monk">Book a Call</DialogTitle>
          <DialogDescription className="dark:text-gray-300">
            Schedule a free consultation to discuss how we can help your business leverage AI.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-500" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-charcoal dark:text-white">Booking Successful!</h3>
            <p className="mt-2 text-center text-charcoal/70 dark:text-gray-300">
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
                    <FormLabel className="dark:text-gray-200">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
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
                    <FormLabel className="dark:text-gray-200">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email address" type="email" {...field} className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
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
                    <FormLabel className="dark:text-gray-200">Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" type="tel" {...field} className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
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
                    <FormLabel className="dark:text-gray-200">Address (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your business address" {...field} className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
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
                    <FormLabel className="dark:text-gray-200">Preferred Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal dark:bg-gray-700 dark:border-gray-600 dark:text-white",
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
                      <PopoverContent className="w-auto p-0 dark:bg-gray-800" align="center">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          className="dark:bg-gray-800"
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
                    <FormLabel className="dark:text-gray-200">Service</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                        <SelectItem value="ai-business-optimization">AI Business Optimization</SelectItem>
                        <SelectItem value="ai-assistants">AI Assistants</SelectItem>
                        <SelectItem value="web-app-development">Web & App Development</SelectItem>
                        <SelectItem value="content-generation">Content Generation</SelectItem>
                        <SelectItem value="ai-agent-development">AI Agent Development</SelectItem>
                        <SelectItem value="consulting-training">Consulting & Training</SelectItem>
                        <SelectItem value="general-inquiry">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your project or needs"
                        {...field}
                        rows={4}
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-monk hover:bg-monk/90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Booking Your Call...
                  </>
                ) : (
                  'Book Your Call'
                )}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
