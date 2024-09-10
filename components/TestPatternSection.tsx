import DotPattern from "@/components/magicui/dot-pattern";

export default function TestPatternSection() {
  return (
    <section className="relative w-full h-screen bg-white">
      <DotPattern
        width={32}
        height={32}
        cx={16}
        cy={16}
        cr={1}
        className="absolute inset-0 z-0 opacity-20 text-gray-900"
      />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-5xl font-bold text-black">Test Pattern Section</h1>
      </div>
    </section>
  );
}