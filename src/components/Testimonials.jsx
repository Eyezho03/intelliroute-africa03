import React from "react";
import { Quote } from "lucide-react";
import client1 from "../assets/client1.jpg";
import client2 from "../assets/client2.jpg";
import client3 from "../assets/client3.webp";
import meshBackground from "../assets/intellirouteafrica3.jpg";

const testimonials = [
  {
    name: "Ngaira Rashid",
    role: "Operations Manager, SwiftHaul Kenya",
    feedback:
      "Intelliroute Africa has revolutionized how we manage our fleet. Real-time insights and predictive maintenance have saved us countless hours and costs.",
    image: client1,
  },
  {
    name:" eyezho",
    role: "Logistics Lead, FastMove Uganda",
    feedback:
      "The dashboard is intuitive and incredibly powerful. It has improved our delivery timelines drastically while keeping our team informed at all times.",
    image: client2,
  },
  {
    name: "Asavah Hillary",
    role: "CEO, Sahara Freight Solutions",
    feedback:
      "Geo-fencing and smart alerts are game-changers! We now have complete visibility and control over our operations. Highly recommend Intelliroute Africa.",
    image: client3,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="relative py-20 bg-gray-50">
      <img
        src={meshBackground}
        alt="Digital Mesh Background"
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
      />
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300 backdrop-blur-md bg-opacity-80"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-xl font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <Quote className="w-8 h-8 text-blue-500 mb-4" />
              <p className="text-gray-700 leading-relaxed">{testimonial.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
