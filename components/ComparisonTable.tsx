import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X, Infinity } from "lucide-react"
import ShimmerButton from "@/components/magicui/shimmer-button";
import SectionBackground from './SectionBackground';
import GradientText from './GradientText';

export default function ComparisonTable() {
  return (
    <SectionBackground className="py-16" gradientStart="from-purple-50" gradientEnd="to-indigo-50">
      <div className="w-full max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center">
          <GradientText>What makes</GradientText>
        </h1>
        <h2 className="text-5xl font-extrabold text-center">
          <GradientText>FIZZIELTS</GradientText>
        </h2>
        <h3 className="text-4xl font-bold text-center">
          <GradientText>Your right choice</GradientText>
        </h3>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3"></TableHead>
                <TableHead className="w-1/3 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xl">F</span>
                    </div>
                    <span className="font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">FIZZIELTS</span>
                  </div>
                </TableHead>
                <TableHead className="w-1/3 text-center">
                  <span className="font-bold text-orange-500">Others</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Live Classes</TableCell>
                <TableCell className="text-center bg-blue-50">100 Hours</TableCell>
                <TableCell className="text-center">20 - 30 Hours</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Live Speaking Evaluations</TableCell>
                <TableCell className="text-center bg-blue-50">18</TableCell>
                <TableCell className="text-center"><X className="mx-auto text-red-500" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Writing Evaluations</TableCell>
                <TableCell className="text-center bg-blue-50">25</TableCell>
                <TableCell className="text-center"><X className="mx-auto text-red-500" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Native Speakers IELTS Materials</TableCell>
                <TableCell className="text-center bg-blue-50"><Check className="mx-auto text-green-500" /></TableCell>
                <TableCell className="text-center"><X className="mx-auto text-red-500" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Unlimited Mock Tests</TableCell>
                <TableCell className="text-center bg-blue-50">
                  <Infinity className="mx-auto text-blue-500" />
                </TableCell>
                <TableCell className="text-center">Limited</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Video Course</TableCell>
                <TableCell className="text-center bg-blue-50"><Check className="mx-auto text-green-500" /></TableCell>
                <TableCell className="text-center"><X className="mx-auto text-red-500" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Feedback Sessions</TableCell>
                <TableCell className="text-center bg-blue-50"><Check className="mx-auto text-green-500" /></TableCell>
                <TableCell className="text-center"><X className="mx-auto text-red-500" /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        <ShimmerButton 
          className="w-full py-3 px-6 text-xl font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-colors shadow-lg"
          onClick={() => document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Join Free Trial Class →
        </ShimmerButton>
      </div>
    </SectionBackground>
  )
}