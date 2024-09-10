import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { SparklesCore } from "@/components/ui/sparkles";

export default function BackgroundLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <BackgroundBeamsWithCollision className="absolute inset-0 opacity-40" />
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={100}
          className="absolute inset-0"
          particleColor="#4B5563"
        />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}