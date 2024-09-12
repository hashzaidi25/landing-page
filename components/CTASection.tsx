"use client";

import { useState, useEffect, useRef, useCallback, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import ShimmerButton from "@/components/magicui/shimmer-button";
import NeonGradientCard from "@/components/magicui/neon-gradient-card";
import { ArrowLeft, Loader2 } from "lucide-react";
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from "@/lib/firebaseConfig";
import { RecaptchaVerifier, ApplicationVerifier, signInWithPhoneNumber, PhoneAuthProvider, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, signInWithCredential, ConfirmationResult } from "firebase/auth";
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import SectionBackground from './SectionBackground';

type FormStep = 'purpose' | 'occupation' | 'timeline' | 'details' | 'otp' | 'timeslot' | 'confirmation' | 'emailVerification';

type CountryOption = {
  value: CountryCode;
  label: string;
  dialCode: string;
};

// Create a separate component for reCAPTCHA
const RecaptchaContainer = () => {
  return <div id="recaptcha-container" className="mt-4"></div>;
};

// Add this function at the top of your file, outside the component
function debounce<F extends (...args: any[]) => any>(func: F, wait: number): (...args: Parameters<F>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<F>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, onClick, className = "" }) => (
  <motion.button
    onClick={onClick}
    className={`w-full p-4 text-left border rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${className}`}
    whileHover={{ scale: 1.03, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
    whileTap={{ scale: 0.98 }}
    variants={fadeInUp}
  >
    {children}
  </motion.button>
);

export default function CTASection() {
  const router = useRouter();
  const [step, setStep] = useState<FormStep>('purpose');
  const [formData, setFormData] = useState({
    purpose: '',
    occupation: '',
    timeline: '',
    name: '',
    email: '',
    phone: '',
    otp: '',
    timeslot: '',
    meetingLink: '',
  });
  const { width, height } = useWindowSize();
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>({
    value: 'US',
    label: 'United States',
    dialCode: '+1'
  });
  const recaptchaVerifier = useRef<RecaptchaVerifier | null>(null);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [isCooldown, setIsCooldown] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<'phone' | 'email'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [globalCooldown, setGlobalCooldown] = useState(false);
  const [cooldownEndTime, setCooldownEndTime] = useState<number | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [cooldownTimeRemaining, setCooldownTimeRemaining] = useState<number | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);

  const countryOptions: CountryOption[] = [
    { value: 'US', label: 'United States', dialCode: '+1' },
    { value: 'GB', label: 'United Kingdom', dialCode: '+44' },
    { value: 'IN', label: 'India', dialCode: '+91' },
    // Add more countries as needed
  ];

  // Update the renderQuestion function to use AnimatedButton and motion components
  const renderQuestion = () => {
    switch (step) {
      case 'purpose':
        return (
          <motion.div className="space-y-6" variants={staggerChildren}>
            <motion.h3 className="text-2xl font-semibold mb-6 text-center" variants={fadeInUp}>Why do you want to prepare for IELTS?</motion.h3>
            {['Work visa or PR', 'Study Abroad', "Haven't Decided"].map((option) => (
              <AnimatedButton key={option} onClick={() => handleOptionSelect('purpose', option)}>
                {option}
              </AnimatedButton>
            ))}
          </motion.div>
        );
      case 'occupation':
        return (
          <motion.div className="space-y-6" variants={staggerChildren}>
            <motion.h3 className="text-2xl font-semibold mb-6 text-center" variants={fadeInUp}>What are you currently doing?</motion.h3>
            {['Student', 'Working', 'Recently graduated'].map((option) => (
              <AnimatedButton key={option} onClick={() => handleOptionSelect('occupation', option)}>
                {option}
              </AnimatedButton>
            ))}
          </motion.div>
        );
      case 'timeline':
        return (
          <motion.div className="space-y-6" variants={staggerChildren}>
            <motion.h3 className="text-2xl font-semibold mb-6 text-center" variants={fadeInUp}>When are you giving IELTS?</motion.h3>
            {['Within 3 months', 'Within 3-6 months', 'Already booked'].map((option) => (
              <AnimatedButton key={option} onClick={() => handleOptionSelect('timeline', option)}>
                {option}
              </AnimatedButton>
            ))}
          </motion.div>
        );
      case 'details':
        return (
          <motion.form 
            onSubmit={(e) => { 
              e.preventDefault(); 
              if (!isLoading && !isCooldown && !globalCooldown) {
                debouncedSendOtp();
              } else {
                console.log("Form submission aborted due to loading or cooldown state");
              }
            }} 
            className="space-y-6"
            variants={staggerChildren}
          >
            <motion.input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              required
              variants={fadeInUp}
            />
            <motion.input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              required
              variants={fadeInUp}
            />
            <motion.div
              initial={{ opacity: 1, height: 'auto' }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex mb-4">
                <select
                  value={selectedCountry.value}
                  onChange={(e) => {
                    const country = countryOptions.find(c => c.value === e.target.value);
                    if (country) setSelectedCountry(country);
                  }}
                  className="w-1/3 p-3 rounded-l border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                >
                  {countryOptions.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label} ({country.dialCode})
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-2/3 p-3 rounded-r border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  required
                />
              </div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <ShimmerButton 
                type="submit" 
                className="w-full text-lg py-3 bg-blue-600 text-white rounded-full font-semibold transition-all duration-300"
                disabled={isLoading || isCooldown || globalCooldown}
              >
                {isLoading ? "Sending..." : isCooldown || globalCooldown ? "Verification unavailable" : "Send OTP"}
              </ShimmerButton>
            </motion.div>
            {isCooldown && (
              <motion.p 
                className="text-sm text-red-500 text-center"
                variants={fadeInUp}
                animate={{ scale: [1, 1.05, 1], transition: { duration: 2, repeat: Infinity } }}
              >
                Verification is temporarily unavailable. Please try again later.
              </motion.p>
            )}
          </motion.form>
        );
      case 'otp':
        return (
          <motion.form onSubmit={(e) => { e.preventDefault(); verifyOtp(); }} className="space-y-6" variants={staggerChildren}>
            <motion.h3 className="text-2xl font-semibold text-center mb-6" variants={fadeInUp}>Enter the OTP sent to your phone</motion.h3>
            <motion.div className="flex justify-center" variants={fadeInUp}>
              <InputOTP 
                maxLength={6}
                value={formData.otp}
                onChange={(value) => setFormData(prev => ({ ...prev, otp: value }))}
                className="gap-2"
              >
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <InputOTPSlot 
                      key={index} 
                      index={index} 
                      className="w-12 h-14 text-2xl border-2 border-gray-300 focus:border-blue-500 transition-all duration-300" 
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </motion.div>
            <motion.div className="flex justify-center" variants={fadeInUp}>
              <ShimmerButton 
                type="submit" 
                className="w-full max-w-xs text-lg py-3 bg-blue-600 text-white rounded-full font-semibold transition-all duration-300 relative overflow-hidden"
                disabled={formData.otp.length !== 6 || isVerifyingOTP}
              >
                <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isVerifyingOTP ? 'opacity-100' : 'opacity-0'}`}>
                  <Loader2 className="h-5 w-5 animate-spin" />
                </span>
                <span className={`transition-opacity duration-300 ${isVerifyingOTP ? 'opacity-0' : 'opacity-100'}`}>
                  Verify OTP
                </span>
              </ShimmerButton>
            </motion.div>
          </motion.form>
        );
      case 'timeslot':
        return (
          <motion.div className="space-y-6" variants={staggerChildren}>
            <motion.h3 className="text-2xl font-semibold text-center mb-6" variants={fadeInUp}>Select a timing slot for the meeting</motion.h3>
            {['10:00 AM - 11:00 AM', '2:00 PM - 3:00 PM', '6:00 PM - 7:00 PM'].map((slot) => (
              <AnimatedButton key={slot} onClick={() => handleOptionSelect('timeslot', slot)}>
                {slot}
              </AnimatedButton>
            ))}
            <motion.div variants={fadeInUp}>
              <ShimmerButton onClick={handleSubmit} className="w-full text-lg py-3 bg-blue-600 text-white rounded-full font-semibold transition-all duration-300">
                Confirm Booking
              </ShimmerButton>
            </motion.div>
          </motion.div>
        );
      case 'confirmation':
        return (
          <motion.div className="space-y-6 text-center" variants={staggerChildren}>
            <Confetti width={width} height={height} />
            <motion.h3 className="text-3xl font-semibold text-green-600" variants={fadeInUp}>Congratulations!</motion.h3>
            <motion.p className="text-xl text-gray-700" variants={fadeInUp}>Your booking is confirmed.</motion.p>
            <motion.p className="text-lg text-gray-700" variants={fadeInUp}>
              Meeting Link: <a href={formData.meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 transition-colors duration-300">{formData.meetingLink}</a>
            </motion.p>
            <motion.div className="text-left mt-8 bg-blue-50 p-6 rounded-lg shadow-md" variants={fadeInUp}>
              <h4 className="text-2xl font-semibold mb-4 text-blue-800">Instructions:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-3">
                <motion.li variants={fadeInUp}>Join the meeting 15 minutes before the scheduled time.</motion.li>
                <motion.li variants={fadeInUp}>Ensure you have a stable internet connection.</motion.li>
                <motion.li variants={fadeInUp}>Use a laptop for the best experience.</motion.li>
                <motion.li variants={fadeInUp}>Have your study materials ready.</motion.li>
              </ul>
            </motion.div>
          </motion.div>
        );
      case 'emailVerification':
        return (
          <motion.div className="space-y-6 text-center" variants={staggerChildren}>
            <motion.h3 className="text-2xl font-semibold" variants={fadeInUp}>Check your email</motion.h3>
            <motion.p className="text-lg text-gray-700" variants={fadeInUp}>We have sent a verification link to your email. Please click the link to verify your email address.</motion.p>
          </motion.div>
        );
    }
  };

  useEffect(() => {
    const setupRecaptcha = () => {
      if (!recaptchaVerifier.current) {
        recaptchaVerifier.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
          'size': 'invisible',
          'callback': (response: any) => {
            console.log("reCAPTCHA verified");
          },
          'expired-callback': () => {
            console.log("reCAPTCHA expired");
          }
        });
      }
    };

    setupRecaptcha();

    return () => {
      if (recaptchaVerifier.current) {
        recaptchaVerifier.current.clear();
        recaptchaVerifier.current = null;
      }
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCooldown && cooldownTime > 0) {
      timer = setInterval(() => {
        setCooldownTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (cooldownTime === 0) {
      setIsCooldown(false);
    }
    return () => clearInterval(timer);
  }, [isCooldown, cooldownTime]);

  useEffect(() => {
    const cooldownEndTimeStr = localStorage.getItem('cooldownEndTime');
    if (cooldownEndTimeStr) {
      const endTime = parseInt(cooldownEndTimeStr, 10);
      if (endTime > Date.now()) {
        setGlobalCooldown(true);
        setCooldownEndTime(endTime);
      } else {
        localStorage.removeItem('cooldownEndTime');
      }
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (globalCooldown && cooldownEndTime) {
      timer = setInterval(() => {
        const remaining = Math.max(0, cooldownEndTime - Date.now());
        setCooldownTimeRemaining(remaining);
        if (remaining === 0) {
          setGlobalCooldown(false);
          setCooldownEndTime(null);
          localStorage.removeItem('cooldownEndTime');
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [globalCooldown, cooldownEndTime]);

  const setCooldownPeriod = (seconds: number) => {
    const endTime = Date.now() + seconds * 1000;
    setGlobalCooldown(true);
    setCooldownEndTime(endTime);
    localStorage.setItem('cooldownEndTime', endTime.toString());
    console.log(`Cooldown set for ${seconds} seconds, ending at ${new Date(endTime).toLocaleString()}`);
  };

  const resetRecaptcha = useCallback(() => {
    if (recaptchaVerifier.current) {
      recaptchaVerifier.current.clear();
      recaptchaVerifier.current = null;
    }
    const setupRecaptcha = () => {
      recaptchaVerifier.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': () => {
          console.log("reCAPTCHA verified");
        }
      });
    };
    setupRecaptcha();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleOptionSelect = (field: FormStep, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
    if (field === 'purpose') setStep('occupation');
    else if (field === 'occupation') setStep('timeline');
    else if (field === 'timeline') setStep('details');
  };

  const handleBack = () => {
    if (step === 'occupation') setStep('purpose');
    else if (step === 'timeline') setStep('occupation');
    else if (step === 'details') setStep('timeline');
    else if (step === 'otp') setStep('details');
    else if (step === 'timeslot') setStep('otp');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'otp') {
      verifyOtp();
    } else {
      const meetingLink = generateMeetingLink();
      setFormData(prevData => ({
        ...prevData,
        meetingLink
      }));
      setStep('confirmation');
    }
  };

  const sendOtp = useCallback(() => {
    console.log("sendOtp called. isLoading:", isLoading, "isCooldown:", isCooldown, "globalCooldown:", globalCooldown);
    
    if (isLoading || isCooldown || globalCooldown) {
      console.log("sendOtp aborted due to loading or cooldown state");
      return;
    }

    setIsLoading(true);
    console.log("Attempting to send OTP");

    const backoffTime = Math.pow(2, retryCount) * 1000; // Exponential backoff
    setTimeout(() => {
      try {
        const phoneNumber = parsePhoneNumber(formData.phone, selectedCountry.value);
        if (!phoneNumber.isValid()) {
          throw new Error('Invalid phone number');
        }
        const formattedPhoneNumber = phoneNumber.format('E.164');
        if (!recaptchaVerifier.current) {
          throw new Error("reCAPTCHA verifier is not set up");
        }

        console.log("Attempting to sign in with phone number:", formattedPhoneNumber);

        // Render the reCAPTCHA before using it
        if (recaptchaVerifier.current) {
          (recaptchaVerifier.current as RecaptchaVerifier).render().then((widgetId) => {
            signInWithPhoneNumber(auth, formattedPhoneNumber, recaptchaVerifier.current as RecaptchaVerifier)
              .then((confirmationResult) => {
                console.log("OTP sent successfully");
                setVerificationId(confirmationResult.verificationId);
                setStep('otp');
              }).catch((error) => {
                console.error("Error during signInWithPhoneNumber:", error);
                console.error("Error code:", error.code);
                console.error("Error message:", error.message);
                resetRecaptcha();
                if (error.code === 'auth/network-request-failed') {
                  alert("Network error. Please check your internet connection and try again.");
                } else if (error.code === 'auth/too-many-requests') {
                  setCooldownPeriod(60); // Set cooldown to 60 seconds (1 minute)
                  alert("Too many requests. Please try again after 1 minute or use email verification.");
                  offerEmailVerification();
                } else if (error.code === 'auth/invalid-phone-number') {
                  alert("The phone number is invalid. Please check and try again.");
                } else {
                  alert(`Failed to send OTP. Please try email verification. Error: ${error.message}`);
                  offerEmailVerification();
                }
              }).finally(() => {
                setIsLoading(false);
              });
          });
        }
      } catch (error) {
        console.error("Error in sendOtp:", error);
        alert(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
        setIsLoading(false);
      }
    }, backoffTime);

    setRetryCount(prevCount => prevCount + 1);
  }, [formData.phone, selectedCountry, isCooldown, isLoading, resetRecaptcha, globalCooldown, retryCount]);

  const debouncedSendOtp = useCallback(
    debounce(() => {
      console.log("debouncedSendOtp called");
      if (!isLoading && !isCooldown && !globalCooldown) {
        sendOtp();
      } else {
        console.log("debouncedSendOtp aborted due to loading or cooldown state");
      }
    }, 1000),
    [sendOtp, isLoading, isCooldown, globalCooldown]
  );

  const verifyOtp = () => {
    setIsVerifyingOTP(true);
    const code = formData.otp;
    if (!verificationId) {
      console.error("VerificationId is null");
      alert("There was an error verifying the OTP. Please try again.");
      setIsVerifyingOTP(false);
      return;
    }
    const phoneCredential = PhoneAuthProvider.credential(verificationId, code);
    signInWithCredential(auth, phoneCredential)
      .then(() => {
        // Phone number verified successfully
        const meetingLink = generateMeetingLink();
        setFormData(prevData => ({
          ...prevData,
          meetingLink
        }));
        setStep('timeslot');
      })
      .catch((error: any) => {
        console.error("Error during OTP verification:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        alert(`Invalid OTP. Error: ${error.message}`);
      })
      .finally(() => {
        setIsVerifyingOTP(false);
      });
  };

  const generateMeetingLink = () => {
    return "https://zoom.us/j/1234567890";
  };

  const sendEmailVerification = () => {
    const actionCodeSettings = {
      url: window.location.href,
      handleCodeInApp: true,
    };

    sendSignInLinkToEmail(auth, formData.email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', formData.email);
        alert("Email verification sent. Please check your inbox.");
        setStep('emailVerification');
      })
      .catch((error) => {
        console.error("Error sending email verification:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        if (error.code === 'auth/operation-not-allowed') {
          alert("Email link sign-in is not enabled. Please contact support or use phone verification.");
          setVerificationMethod('phone');
        } else {
          alert(`Failed to send email verification. Error: ${error.message}`);
        }
      });
  };

  const offerEmailVerification = () => {
    const useEmail = window.confirm("Would you like to use email verification instead?");
    if (useEmail) {
      sendEmailVerification();
    }
  };

  return (
    <SectionBackground className="py-16" gradientStart="from-blue-100" gradientEnd="to-purple-50">
      <motion.div 
        className="max-w-2xl mx-auto px-4" id="cta-section"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <motion.h2 
          className="text-5xl font-bold mb-8 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          variants={fadeInUp}
        >
          Join Free IELTS Trial Class
        </motion.h2>
        {globalCooldown && cooldownTimeRemaining !== null && (
          <motion.p 
            className="text-red-500 text-center mb-4"
            variants={fadeInUp}
          >
            Phone verification is temporarily unavailable. Please try again in {Math.ceil(cooldownTimeRemaining / 1000)} seconds or use email verification.
          </motion.p>
        )}
        <NeonGradientCard className="p-8 shadow-2xl">
          <motion.div variants={staggerChildren}>
            {renderQuestion()}
            {step !== 'purpose' && step !== 'confirmation' && (
              <motion.button
                onClick={handleBack}
                className="mt-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                variants={fadeInUp}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </motion.button>
            )}
          </motion.div>
          <RecaptchaContainer />
        </NeonGradientCard>
      </motion.div>
    </SectionBackground>
  );
}