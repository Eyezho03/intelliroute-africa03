import React from "react";
import featureBg from "../assets/features3.jpg"; // Ensure this image exists
import featureImg1 from "../assets/features1.jpg";
import featureImg2 from "../assets/features2.jpg";
import featureImg3 from "../assets/features3.jpg";
import featureImg4 from "../assets/features4.png";
import featureImg5 from "../assets/features5.jpg";
import featureImg6 from "../assets/features6.jpeg";

const features = [
  {
    title: "Real-Time Route Optimization",
    description: "Harness live data analytics to find the fastest and most efficient routes across Africa, reducing delivery times and operational costs.",
    image: featureImg1,
  },
  {
    title: "Fleet Monitoring Dashboard",
    description: "Track all your vehicles in real-time with an intuitive dashboard designed to offer insights on vehicle health, driver behavior, and fuel consumption.",
    image: featureImg2,
  },
  {
    title: "Predictive Maintenance Alerts",
    description: "Stay ahead of breakdowns with AI-driven alerts that predict maintenance needs based on vehicle usage patterns and environmental data.",
    image: featureImg3,
  },
  {
    title: "Seamless API Integration",
    description: "Easily connect Intelliroute Africa with your existing logistics and ERP systems for a unified operational workflow.",
    image: featureImg4,
  },
  {
    title: "Geo-Fencing & Smart Alerts",
    description: "Define virtual perimeters and get instant notifications when vehicles enter or leave critical zones.",
    image: featureImg5,
  },
  {
    title: "Sustainability Metrics",
    description: "Monitor carbon emissions and optimize routes to reduce environmental impact, aligning with global green logistics trends.",
    image: featureImg6,
  },
];

const FeaturesSection = () => {
  return (
    <section
      className="relative py-20 text-white"
      style={{
        backgroundImage: `url(${featureBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Power-Packed Features for Modern Logistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:scale-105 transform transition duration-300"
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/80 text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
