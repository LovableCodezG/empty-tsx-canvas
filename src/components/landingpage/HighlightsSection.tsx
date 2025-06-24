
import { AnimatedMixedText } from "@/components/ui/animated-mixed-text";

const HighlightsSection = () => {
  const textSegments = [
    { text: "With SpotPlan, you can" },
    { text: "Plan with Friends", className: "text-blue-600" },
    { text: "in real-time, effortlessly coordinating every detail of your trip. Enjoy a" },
    { text: "Smart Expense Estimator", className: "text-blue-600" },
    { text: "that handles budgeting and cost-splitting with precision. Plus, discover activities and dining options with our" },
    { text: "AI-Powered Suggestions", className: "text-blue-600" },
    { text: "designed to personalize your travel experience." },
  ];

  return (
    <section id="features-section" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <AnimatedMixedText
            segments={textSegments}
            delay={100}
            direction="top"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-800 mb-6 leading-tight sm:leading-snug max-w-6xl mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
