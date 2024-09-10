import Image from "next/image";
import { Check } from "lucide-react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import ShimmerButton from "@/components/magicui/shimmer-button";
import NumberTicker from "@/components/magicui/number-ticker";
import GradientHeading from "@/components/GradientHeading";
import { motion } from "framer-motion";
import SectionBackground from './SectionBackground';
import AvatarCircles from "@/components/magicui/avatar-circles"; // Import the AvatarCircles component

export default function HeroSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <SectionBackground className="py-6" gradientStart="from-white" gradientEnd="to-blue-50">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-16">
        <motion.header 
          className="mb-10"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Image src="/images/logo.png" alt="FIZZIELTS Logo" width={150} height={50} className="filter drop-shadow-md" />
        </motion.header>
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <motion.div 
            className="text-gray-800 max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp}>
              <GradientHeading as="h1" className="text-2xl lg:text-4xl mb-4 leading-tight">
                Join FIZZIELTS's 4 Week IELTS Course
              </GradientHeading>
            </motion.div>
            <motion.p variants={fadeInUp} className="text-2xl font-bold text-gray-800 mb-8">
              <TextGenerateEffect words="Boost your IELTS score with expert guidance" />
            </motion.p>
            <motion.ul variants={staggerChildren} className="space-y-3 mb-8">
              {['30+ Hours of Live Classes', 'IELTS 8 Band Assurance', 'Access 100+ IELTS Mock Tests', 'Flexible Batch Timings Available'].map((item, index) => (
                <motion.li key={index} className="flex items-center font-semibold text-lg" variants={fadeInUp}>
                  <Check className="mr-2 text-green-600" />
                  <span className="text-gray-700">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div variants={fadeInUp}>
              <ShimmerButton 
                className="text-lg px-8 py-3 bg-blue-600 text-white font-semibold rounded-full" 
                onClick={() => document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Join Free Trial Class
              </ShimmerButton>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Image src="/images/instructor.webp" alt="Instructors" width={500} height={300} className="mb-6 rounded-lg mx-auto" />
            <div className="flex justify-center space-x-8">
              <div className="flex flex-col items-center">
                <div className="bg-white rounded-full p-6 shadow-lg mb-3">
                  <h2 className="text-3xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="relative">
                          <div className="relative">
                            <div className="relative">
                              <AvatarCircles 
                                className="-mr-4"
                                avatarUrls={[
                                  '/images/team-01.png',
                                  '/images/team-02.png',
                                  '/images/team-03.png',
                                  '/images/team-04.png',
                                  '/images/team-05.png',
                                  '/images/team-06.png',
                                  '/images/team-07.png',
                                ]} 
                              />
                              <span className="text-sm font-medium text-purple-700 absolute -right-8 top-1/2 transform -translate-y-1/2 bg-white rounded-full px-3 py-1 shadow-sm">+</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-6">
                        <NumberTicker value={37250} />
                      </div>
                    </div>
                  </h2>
                </div>
                <p className="text-base text-gray-800 font-medium">Students enrolled till now</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white rounded-full p-6 shadow-lg mb-3">
                  <h2 className="text-3xl font-semibold font-display flex items-center justify-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    <NumberTicker value={93.7} />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">%</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 ml-1 text-green-500 animate-bounce" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </h2>
                </div>
                <p className="text-base text-gray-800 font-medium">Students Got 7+ bands</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionBackground>
  );
}