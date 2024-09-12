import SectionBackground from './SectionBackground';
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"
import ShimmerButton from "@/components/magicui/shimmer-button";
import GradientHeading from "@/components/GradientHeading";

export default function IsThisForMeSection() {
  return (
    <SectionBackground className="py-16" gradientStart="from-indigo-50" gradientEnd="to-blue-50">
      <div className="w-full max-w-3xl mx-auto p-6 space-y-6 rounded-lg">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <GradientHeading className="text-4xl mb-2">
              Is this for me?
            </GradientHeading>
            <span className="text-5xl ml-2">🤔</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Best Suited for Busy Working Professionals",
            "Just started IELTS Prep & Looking for End to End IELTS Coaching",
            "Planning to write IELTS within next 60 Days",
            "Looking for Flexible Batch Timings"
          ].map((text, index) => (
            <Card key={index} className="p-4 bg-white shadow-md rounded-2xl flex items-start space-x-3">
              <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <p className="text-sm font-medium text-gray-800">{text}</p>
            </Card>
          ))}
        </div>
        
        <ShimmerButton 
          className="w-full py-3 px-6 text-xl font-bold text-white rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-colors shadow-lg flex items-center justify-center space-x-2"
          onClick={() => document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span>Join Free Trial Class</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </ShimmerButton>
      </div>
    </SectionBackground>
  )
}