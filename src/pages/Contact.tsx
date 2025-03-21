
import { useState, useEffect } from "react";
import Preloader from "../components/Preloader";
import Navbar from "../components/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import FadeInWhenVisible from "../components/FadeInWhenVisible";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const Contact = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Allow the preloader animation to play
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real application, you would send the form data to a server
    console.log(values);
    toast.success("Your message has been sent!");
    form.reset();
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      {!isLoading && (
        <main className="bg-[#141516] w-full overflow-x-hidden">
          <Navbar />
          <div className="pt-32 px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 py-[137px]">
            <div className="max-w-7xl mx-auto mb-16">
              <span className="text-sm text-gray-500 block mb-4">CONTACT</span>
              <h2 className="text-4xl sm:text-5xl font-light text-white">Get in touch</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
              <FadeInWhenVisible className="text-white">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-medium mb-2">Let's talk</h3>
                    <p className="text-gray-400">Have a project in mind or just want to say hello? I'd love to hear from you.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-gray-500 mb-3">CONTACT DETAILS</h4>
                    <div className="space-y-4">
                      <p className="text-gray-300">hello@example.com</p>
                      <p className="text-gray-300">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-gray-500 mb-3">SOCIALS</h4>
                    <div className="flex space-x-8">
                      <a href="#" className="text-gray-300 hover:text-white transition-colors">LinkedIn</a>
                      <a href="#" className="text-gray-300 hover:text-white transition-colors">Twitter</a>
                      <a href="#" className="text-gray-300 hover:text-white transition-colors">Instagram</a>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>
              
              <FadeInWhenVisible delay={0.2} className="bg-[#1c1d1e] rounded-lg p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              {...field} 
                              className="bg-[#242526] border-[#3a3b3c] text-white" 
                            />
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
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your email" 
                              {...field} 
                              className="bg-[#242526] border-[#3a3b3c] text-white" 
                            />
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
                          <FormLabel className="text-white">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message" 
                              {...field} 
                              className="bg-[#242526] border-[#3a3b3c] text-white min-h-32" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="mt-6 bg-white text-black px-6 py-6 h-auto rounded-full hover:bg-gray-200 transition-colors"
                    >
                      Send Message
                    </Button>
                  </form>
                </Form>
              </FadeInWhenVisible>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Contact;
