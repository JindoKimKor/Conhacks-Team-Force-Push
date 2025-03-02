import "./Perks.css";

import {
  BadgePercent,
  Building,
  ExternalLink,
  Leaf,
  ShoppingBag,
  ShoppingCart,
  Store,
  Tag
} from "lucide-react";
import { useState } from "react";

interface AffiliateCardProps {
  category: string;
  color: string;
  description?: string;
  discount: string;
  icon: React.ReactNode;
  title: string;
  website: string;
}

function AffiliateCard({
  category,
  color,
  description,
  discount,
  icon,
  title,
  website
}: AffiliateCardProps) {
  return (
    <div className="perk-card bg-white rounded-lg shadow-sm p-4 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-gray-700 font-medium text-2xl">{title}</h3>
        <div className={`icon-container ${color} p-6 rounded-md`}>{icon}</div>
      </div>
      <div className="value-container">
        <div className="flex items-center mb-4">
          <span className="text-4xl font-bold mr-4">{discount}</span>
          <span className="text-gray-400 text-xl">OFF</span>
        </div>
        <div className="flex items-center text-gray-500 mb-4">
          <Tag className="h-6 w-6 mr-2" />
          <span>{category}</span>
        </div>
      </div>
      {description ? (
        <p className="text-gray-500 text-lg mt-4 mb-8">{description}</p>
      ) : null}
      <a
        className={`${color.replace("bg-", "bg-")} hover:opacity-90 text-white py-4 px-6 rounded-lg flex items-center justify-center text-xl font-medium mt-auto`}
        href={website}
        rel="noopener noreferrer"
        target="_blank">
        Visit Store <ExternalLink className="ml-2 h-5 w-5" />
      </a>
    </div>
  );
}

export default function Perks() {
  const [category, setCategory] = useState<
    "all" | "beauty" | "clothing" | "home"
  >("all");

  const affiliates = [
    {
      category: "clothing",
      color: "bg-green-100",
      description:
        "Sustainable clothing made from recycled materials and organic cotton",
      discount: "15%",
      icon: <ShoppingBag className="h-12 w-12 text-green-500" />,
      title: "EcoWear",
      website: "https://ecowear.example.com"
    },
    {
      category: "clothing",
      color: "bg-blue-100",
      description:
        "Ethically sourced clothing with a focus on reducing water usage",
      discount: "10%",
      icon: <ShoppingBag className="h-12 w-12 text-blue-500" />,
      title: "Blue Planet Apparel",
      website: "https://blueplanetapparel.example.com"
    },
    {
      category: "home",
      color: "bg-yellow-100",
      description: "Energy-efficient home appliances and solar-powered gadgets",
      discount: "20%",
      icon: <Building className="h-12 w-12 text-yellow-500" />,
      title: "GreenHome",
      website: "https://greenhome.example.com"
    },
    {
      category: "home",
      color: "bg-orange-100",
      description:
        "Biodegradable household products and plastic-free alternatives",
      discount: "12%",
      icon: <Building className="h-12 w-12 text-orange-500" />,
      title: "EcoLiving",
      website: "https://ecoliving.example.com"
    },
    {
      category: "beauty",
      color: "bg-purple-100",
      description:
        "Cruelty-free and vegan beauty products in sustainable packaging",
      discount: "18%",
      icon: <Leaf className="h-12 w-12 text-purple-500" />,
      title: "Pure Beauty",
      website: "https://purebeauty.example.com"
    },
    {
      category: "beauty",
      color: "bg-pink-100",
      description: "Natural skincare products made with organic ingredients",
      discount: "15%",
      icon: <Leaf className="h-12 w-12 text-pink-500" />,
      title: "Organic Glow",
      website: "https://organicglow.example.com"
    },
    {
      category: "clothing",
      color: "bg-teal-100",
      description: "Eco-friendly footwear made from sustainable materials",
      discount: "10%",
      icon: <ShoppingBag className="h-12 w-12 text-teal-500" />,
      title: "Green Step",
      website: "https://greenstep.example.com"
    },
    {
      category: "home",
      color: "bg-amber-100",
      description: "Zero-waste grocery store with plastic-free packaging",
      discount: "5%",
      icon: <ShoppingCart className="h-12 w-12 text-amber-500" />,
      title: "Zero Market",
      website: "https://zeromarket.example.com"
    }
  ];

  const filteredAffiliates = affiliates.filter(
    affiliate => category === "all" || affiliate.category === category
  );

  return (
    <div className="perks-container flex flex-col min-h-screen min-w-full bg-teal-500 mx-auto relative">
      {/* Background Scene - Eco-friendly style */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-teal-200" />

        {/* Sun with rays */}
        <div className="absolute top-12 right-1/3 -translate-x-1/2 w-20 h-20 rounded-full bg-yellow-300 shadow-lg">
          <div
            className="absolute inset-0 rounded-full bg-yellow-300 opacity-70"
            style={{ animation: "sunPulse 3s infinite" }}
          />
        </div>

        {/* Eco-friendly landscape */}
        <div className="absolute bottom-0 left-0 right-0 h-3/4">
          {/* Rolling hills with different shades of green */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-teal-700 rounded-tl-[200px] rounded-tr-[150px]" />
          <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-teal-600 rounded-tl-[180px] rounded-tr-[220px]" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-teal-500 rounded-tl-[120px] rounded-tr-[140px]" />

          {/* Stylized trees */}
          <div className="absolute bottom-1/4 left-1/4 w-16 h-16">
            <div className="w-4 h-12 bg-brown-600 mx-auto" />
            <div className="w-12 h-12 bg-green-800 rounded-full absolute -top-6 left-1/2 -translate-x-1/2" />
          </div>
          <div className="absolute bottom-1/3 right-1/4 w-12 h-12">
            <div className="w-3 h-8 bg-brown-600 mx-auto" />
            <div className="w-10 h-10 bg-green-800 rounded-full absolute -top-5 left-1/2 -translate-x-1/2" />
          </div>

          {/* Solar panels */}
          <div className="absolute bottom-1/6 right-1/3 w-20 h-10 bg-blue-900 transform rotate-12 opacity-70" />

          {/* Water droplets - representing water conservation */}
          <div className="absolute bottom-1/5 right-1/5 w-2 h-3 bg-blue-400 rounded-b-none rounded-t-full transform rotate-45 opacity-60" />
          <div className="absolute bottom-1/5 right-1/5 translate-x-4 w-2 h-3 bg-blue-400 rounded-b-none rounded-t-full transform rotate-30 opacity-60" />
          <div className="absolute bottom-1/5 right-1/5 translate-x-8 w-2 h-3 bg-blue-400 rounded-b-none rounded-t-full transform rotate-60 opacity-60" />
        </div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col w-full h-full gap-y-4 p-4">
        {/* Header */}
        <header className="relative z-10 flex flex-col items-center mt-4 mb-6">
          <h1 className="text-3xl font-bold text-white">Perks</h1>
          <p className="text-white text-center mt-2 max-w-2xl">
            As a thank you for using our app and contributing to a greener
            planet, enjoy exclusive discounts at these eco-friendly stores.
          </p>
          <div className="category-selector mt-4 bg-white/20 rounded-full p-1 flex">
            <button
              className={`px-6 py-2 rounded-full text-base ${category === "all" ? "bg-white text-teal-600" : "text-white"}`}
              onClick={() => {
                setCategory("all");
              }}
              type="button">
              All Stores
            </button>
            <button
              className={`px-6 py-2 rounded-full text-base ${category === "clothing" ? "bg-white text-teal-600" : "text-white"}`}
              onClick={() => {
                setCategory("clothing");
              }}
              type="button">
              Clothing
            </button>
            <button
              className={`px-6 py-2 rounded-full text-base ${category === "home" ? "bg-white text-teal-600" : "text-white"}`}
              onClick={() => {
                setCategory("home");
              }}
              type="button">
              Home
            </button>
            <button
              className={`px-6 py-2 rounded-full text-base ${category === "beauty" ? "bg-white text-teal-600" : "text-white"}`}
              onClick={() => {
                setCategory("beauty");
              }}
              type="button">
              Beauty
            </button>
          </div>
        </header>

        {/* Affiliates Grid */}
        <div className="perks-grid grid grid-cols-2 gap-6 p-2 overflow-y-auto pb-20">
          {filteredAffiliates.map((affiliate, index) => (
            <AffiliateCard
              category={affiliate.category}
              color={affiliate.color}
              description={affiliate.description}
              discount={affiliate.discount}
              icon={affiliate.icon}
              key={index}
              title={affiliate.title}
              website={affiliate.website}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
