import Image from "next/image";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Heading 1 - Large Title</h1>
      <h2 className="text-3xl font-semibold mb-3">Heading 2 - Medium Title</h2>
      <h3 className="text-2xl font-medium mb-2">Heading 3 - Small Title</h3>
      <h4 className="text-xl mb-2">Heading 4 - Subtitle</h4>
      <p className="text-base mb-4">Regular paragraph text to compare</p>
      <p className="text-sm">Small text for testing</p>
    </div>
  );
}
