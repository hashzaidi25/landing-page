import { Book, Video, Users, Clock, Award, Headphones } from 'lucide-react';
import GradientHeading from './GradientHeading';
import SectionBackground from './SectionBackground';

const features = [
  {
    icon: Book,
    title: "Comprehensive Study Material",
    description: "Access to extensive IELTS preparation resources and practice tests."
  },
  {
    icon: Video,
    title: "Live Online Classes",
    description: "Interactive sessions with experienced IELTS trainers."
  },
  {
    icon: Users,
    title: "Small Batch Sizes",
    description: "Personalized attention in small groups for better learning."
  },
  {
    icon: Clock,
    title: "Flexible Timings",
    description: "Choose from multiple batch timings to suit your schedule."
  },
  {
    icon: Award,
    title: "Band 8 Guarantee",
    description: "Our proven methodology ensures high band scores."
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock assistance for all your IELTS queries."
  }
];

export default function FeatureSection() {
  return (
    <SectionBackground className="py-16" gradientStart="from-blue-50" gradientEnd="to-blue-100">
      <div className="max-w-6xl mx-auto px-4">
        <GradientHeading as="h2" className="text-4xl font-bold mb-12 text-center">
          Why Choose FIZZIELTS?
        </GradientHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionBackground>
  );
}