import { Star } from "lucide-react"
import ShimmerButton from "@/components/magicui/shimmer-button";
import NumberTicker from "@/components/magicui/number-ticker"; // Changed to default import
import SectionBackground from './SectionBackground';

interface TestimonialProps {
  name: string;
  image: string;
  score: string;
  quote: string;
  googleReview: string;
}

const TestimonialCard = ({ name, image, score, quote, googleReview }: TestimonialProps) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
    <div className="p-6">
      <div className="flex items-center mb-4">
        <img src={image} alt={name} className="w-16 h-16 rounded-full border-4 border-blue-500 mr-4" />
        <div>
          <h3 className="font-bold text-lg text-gray-800">{name}</h3>
          <div className="flex items-center">
            <img src="/google-logo.svg" alt="Google" className="w-5 h-5 mr-1" />
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
            ))}
          </div>
        </div>
      </div>
      <div className="mb-4">
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
          {score}
        </span>
      </div>
      <p className="text-gray-600 mb-4 italic">"{quote}"</p>
      <div className="text-sm text-gray-500 bg-gray-100 p-3 rounded-lg">
        <p className="font-semibold mb-1">Google Review:</p>
        <p>"{googleReview}"</p>
      </div>
    </div>
  </div>
)

export default function TestimonialSection() {
  const testimonials: TestimonialProps[] = [
    {
      name: "Serene Kaur",
      image: "https://source.unsplash.com/random/100x100?face=1",
      score: "Got 7.5 Band",
      quote: "The full-length tests mimicked the real exam perfectly. My confidence soared, and I exceeded my target!",
      googleReview: "Excellent IELTS preparation program. Highly recommended for serious test-takers!"
    },
    {
      name: "Ameya Deshmane",
      image: "https://source.unsplash.com/random/100x100?face=2",
      score: "Got 8.5 Band",
      quote: "The in-depth topic videos and strategy guides were a goldmine. I aced the exam with an 8.5!",
      googleReview: "Top-notch materials and support. Worth every penny for my dream score."
    },
    {
      name: "Sonia Pinto",
      image: "https://source.unsplash.com/random/100x100?face=3",
      score: "Got 7 Band",
      quote: "The live evaluation with feedback gave me specific areas to focus on. I surprised myself with a 7!",
      googleReview: "Fantastic program that boosted my confidence. The live evaluations were game-changers."
    },
    {
      name: "Ravi Purohit",
      image: "https://source.unsplash.com/random/100x100?face=4",
      score: "Jumped from 5.5 to 7 Band",
      quote: "It identified my weak areas and pushed me to refine my skills. I managed to jump from a 5.5 to a 7!",
      googleReview: "Incredible improvement in my scores. The personalized approach really works!"
    }
  ]

  return (
<SectionBackground className="py-16" gradientStart="from-blue-50" gradientEnd="to-purple-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-gray-800">
          We've helped <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            <NumberTicker value={120321} />
          </span> people
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-600">
          score 8+ bands in IELTS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <ShimmerButton 
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            onClick={() => document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Join Our Success Stories
          </ShimmerButton>
        </div>
      </div>
    </SectionBackground>
  )
}