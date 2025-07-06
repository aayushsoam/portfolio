import { useState, useEffect } from "react";
import Preloader from "../components/Preloader";
import Navbar from "../components/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import FadeInWhenVisible from "../components/FadeInWhenVisible";
import { ArrowUpRight } from "lucide-react";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters."
  }),
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  organization: z.string().min(2, {
    message: "Organization must be at least 2 characters."
  }),
  services: z.string().min(2, {
    message: "Please specify at least one service."
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters."
  })
});
const Contact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    // Allow the preloader animation to play
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    // Update Delhi time
    const updateDelhiTime = () => {
      const options = {
        hour: "2-digit" as const,
        minute: "2-digit" as const,
        second: "2-digit" as const,
        hour12: false,
        timeZone: 'Asia/Kolkata'
      };
      const time = new Date();
      setCurrentTime(time.toLocaleTimeString('en-US', options) + " IST");
    };

    // Initial time update
    updateDelhiTime();

    // Set up interval to update time every second
    const timeInterval = setInterval(updateDelhiTime, 1000);
    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
    };
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      services: "",
      message: ""
    }
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real application, you would send the form data to a server
    console.log(values);
    toast.success("Your message has been sent!");
    form.reset();
  }
  return <>
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      {!isLoading && <main className="bg-[#141516] w-full min-h-screen overflow-x-hidden text-white">
          <Navbar />
          
          <div className="pt-32 px-6 sm:px-12 lg:px-16 xl:px-24 pb-16">
            <div className="max-w-[1400px] mx-auto">
              {/* Hero section */}
              <div className="flex flex-col md:flex-row justify-between items-start mb-24">
                <div className="max-w-3xl">
                  <FadeInWhenVisible>
                    <h1 className="text-5xl sm:text-7xl font-light leading-tight mb-6">
                      Let's start a<br /> project together
                    </h1>
                  </FadeInWhenVisible>
                </div>
                
                <FadeInWhenVisible delay={0.2}>
                  <div className="mt-6 md:mt-0">
                    <img alt="Profile" className="w-24 h-24 rounded-full object-cover" src="https://i.postimg.cc/26GXc5Xy/background.png" />
                  </div>
                </FadeInWhenVisible>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Form section */}
                <div className="lg:col-span-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                      <div className="border-t border-gray-800 pt-8">
                        <div className="flex items-start">
                          <span className="text-gray-500 mr-6">01</span>
                          <div className="w-full">
                            <FormField control={form.control} name="name" render={({
                          field
                        }) => <FormItem>
                                  <FormLabel className="text-xl text-white mb-4 block">What's your name?</FormLabel>
                                  <FormControl>
                                    <Input placeholder="John Doe *" {...field} className="bg-transparent border-none border-b border-gray-800 rounded-none text-gray-400 text-lg pl-0 focus-visible:ring-0 pb-2" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-800 pt-8">
                        <div className="flex items-start">
                          <span className="text-gray-500 mr-6">02</span>
                          <div className="w-full">
                            <FormField control={form.control} name="email" render={({
                          field
                        }) => <FormItem>
                                  <FormLabel className="text-xl text-white mb-4 block">What's your email?</FormLabel>
                                  <FormControl>
                                    <Input placeholder="john@doe.com *" {...field} className="bg-transparent border-none border-b border-gray-800 rounded-none text-gray-400 text-lg pl-0 focus-visible:ring-0 pb-2" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-800 pt-8">
                        <div className="flex items-start">
                          <span className="text-gray-500 mr-6">03</span>
                          <div className="w-full">
                            <FormField control={form.control} name="organization" render={({
                          field
                        }) => <FormItem>
                                  <FormLabel className="text-xl text-white mb-4 block">What's the name of your organization?</FormLabel>
                                  <FormControl>
                                    <Input placeholder="John & Doe ®" {...field} className="bg-transparent border-none border-b border-gray-800 rounded-none text-gray-400 text-lg pl-0 focus-visible:ring-0 pb-2" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-800 pt-8">
                        <div className="flex items-start">
                          <span className="text-gray-500 mr-6">04</span>
                          <div className="w-full">
                            <FormField control={form.control} name="services" render={({
                          field
                        }) => <FormItem>
                                  <FormLabel className="text-xl text-white mb-4 block">What services are you looking for?</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Web Design, Web Development ..." {...field} className="bg-transparent border-none border-b border-gray-800 rounded-none text-gray-400 text-lg pl-0 focus-visible:ring-0 pb-2" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-800 pt-8">
                        <div className="flex items-start">
                          <span className="text-gray-500 mr-6">05</span>
                          <div className="w-full">
                            <FormField control={form.control} name="message" render={({
                          field
                        }) => <FormItem>
                                  <FormLabel className="text-xl text-white mb-4 block">Your message</FormLabel>
                                  <FormControl>
                                    <Textarea placeholder="Hello, can you help me with ... *" {...field} className="bg-transparent border-none border-b border-gray-800 rounded-none text-gray-400 text-lg pl-0 focus-visible:ring-0 min-h-24 resize-none pb-2" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-800 pt-8 flex justify-center">
                        <Button type="submit" className="mt-4 bg-[#4758EE] hover:bg-[#3A48D0] text-white rounded-full px-14 py-8 h-auto text-lg font-normal">
                          Send it!
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
                
                {/* Contact details section */}
                <div className="lg:col-span-4 space-y-12">
                  <FadeInWhenVisible className="space-y-6" delay={0.2}>
                    <h3 className="text-sm text-gray-500">CONTACT DETAILS</h3>
                    <div className="space-y-2">
                      <p className="text-lg text-white">info@example.com</p>
                      <p className="text-lg text-white">+31 6 27 84 74 30</p>
                    </div>
                  </FadeInWhenVisible>
                  
                  <FadeInWhenVisible className="space-y-6" delay={0.3}>
                    <h3 className="text-sm text-gray-500">BUSINESS DETAILS</h3>
                    <div className="space-y-2">
                      <p className="text-lg text-white">Your Name B.V.</p>
                      <p className="text-lg text-white">CoC: 92411711</p>
                      <p className="text-lg text-white">VAT: NL8660340B01</p>
                      <p className="text-lg text-white">Location: Your Location</p>
                    </div>
                  </FadeInWhenVisible>
                  
                  <FadeInWhenVisible className="space-y-6" delay={0.4}>
                    <h3 className="text-sm text-gray-500">SOCIALS</h3>
                    <div className="space-y-2">
                      <a href="#" className="text-lg text-white block hover:text-gray-300 transition-colors">Awwwards</a>
                      <a href="#" className="text-lg text-white block hover:text-gray-300 transition-colors">Instagram</a>
                      <a href="#" className="text-lg text-white block hover:text-gray-300 transition-colors">Twitter</a>
                      <a href="#" className="text-lg text-white block hover:text-gray-300 transition-colors">LinkedIn</a>
                    </div>
                  </FadeInWhenVisible>
                </div>
              </div>
              
              {/* Footer */}
              <div className="border-t border-gray-800 mt-24 pt-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="flex items-center space-x-8 mb-4 md:mb-0">
                    <div className="text-sm text-gray-500">
                      <span className="block">VERSION</span>
                      <span className="text-white">2023 © Edition</span>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      <span className="block">LOCAL TIME</span>
                      <span className="text-white">{currentTime}</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <span className="block">SOCIALS</span>
                    <div className="flex space-x-4 text-white">
                      <a href="#" className="hover:text-gray-300 transition-colors">Awwwards</a>
                      <a href="#" className="hover:text-gray-300 transition-colors">Instagram</a>
                      <a href="#" className="hover:text-gray-300 transition-colors">Twitter</a>
                      <a href="#" className="hover:text-gray-300 transition-colors">LinkedIn</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>}
    </>;
};
export default Contact;