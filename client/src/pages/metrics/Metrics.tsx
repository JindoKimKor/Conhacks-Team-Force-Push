import "./Metrics.css";

import {
  Activity,
  BarChart2,
  Calendar,
  Clock,
  Heart,
  LineChart,
  PieChart,
  TrendingUp
} from "lucide-react";
import { useState } from "react";

interface MetricCardProps {
  color: string;
  description?: string;
  icon: React.ReactNode;
  title: string;
  value: number | string;
}

function MetricCard({
  color,
  description,
  icon,
  title,
  value
}: MetricCardProps) {
  return (
    <div className="metric-card bg-white rounded-lg shadow-sm p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-700 font-medium">{title}</h3>
        <div className={`icon-container ${color} p-2 rounded-md`}>{icon}</div>
      </div>
      <div className="value-container">
        <span className="text-3xl font-bold">{value}</span>
      </div>
      {description ? (
        <p className="text-gray-500 text-sm mt-2">{description}</p>
      ) : null}
    </div>
  );
}

export default function Metrics() {
  const [timeFrame, setTimeFrame] = useState<
    "day" | "lifetime" | "month" | "week"
  >("week");

  const metrics = [
    {
      color: "bg-gray-100",
      description: "Total garbage bags disposed",
      icon: <BarChart2 className="h-5 w-5 text-gray-500" />,
      title: "Garbage Bags",
      value: "42"
    },
    {
      color: "bg-indigo-100",
      description: "Total points earned",
      icon: <PieChart className="h-5 w-5 text-indigo-500" />,
      title: "Points",
      value: "1,250"
    },
    {
      color: "bg-blue-100",
      description: "Total experience gained",
      icon: <Activity className="h-5 w-5 text-blue-500" />,
      title: "Experience",
      value: "8,432"
    },
    {
      color: "bg-green-100",
      description: "Total goals achieved",
      icon: <Calendar className="h-5 w-5 text-green-500" />,
      title: "Goals Completed",
      value: "24"
    },
    {
      color: "bg-yellow-100",
      description: "Items purchased from store",
      icon: <LineChart className="h-5 w-5 text-yellow-500" />,
      title: "Items Purchased",
      value: "15"
    },
    {
      color: "bg-purple-100",
      description: "Your best daily streak",
      icon: <TrendingUp className="h-5 w-5 text-purple-500" />,
      title: "Longest Streak",
      value: "7 days"
    }
  ];

  return (
    <div className="metrics-container flex flex-col min-h-screen min-w-full bg-green-500 mx-auto relative">
      {/* Background Scene - Eco-friendly style */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-green-200" />

        {/* Sun with rays */}
        <div className="absolute top-12 right-1/3 -translate-x-1/2 w-20 h-20 rounded-full bg-yellow-300 shadow-lg">
          <div
            className="absolute inset-0 rounded-full bg-yellow-300 opacity-70"
            style={{ animation: "sunPulse 3s infinite" }}
          />
        </div>

        {/* Recycling symbol - stylized */}
        <div className="absolute top-1/4 left-1/6 opacity-10">
          <div className="w-32 h-32 border-8 border-green-600 rounded-full border-t-transparent transform rotate-45" />
          <div className="w-32 h-32 border-8 border-green-600 rounded-full border-r-transparent absolute top-0 transform rotate-[165deg]" />
          <div className="w-32 h-32 border-8 border-green-600 rounded-full border-b-transparent absolute top-0 transform rotate-[285deg]" />
        </div>

        {/* Wind turbine - stylized */}
        <div className="absolute top-1/3 right-1/6 opacity-20">
          <div className="w-4 h-32 bg-gray-200 mx-auto" />
          <div className="w-32 h-4 bg-gray-200 absolute top-0 left-1/2 -translate-x-1/2 rounded-full transform -rotate-45" />
          <div className="w-32 h-4 bg-gray-200 absolute top-0 left-1/2 -translate-x-1/2 rounded-full transform rotate-45" />
          <div className="w-32 h-4 bg-gray-200 absolute top-0 left-1/2 -translate-x-1/2 rounded-full" />
        </div>

        {/* Eco-friendly landscape */}
        <div className="absolute bottom-0 left-0 right-0 h-3/4">
          {/* Rolling hills with different shades of green */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-green-700 rounded-tl-[200px] rounded-tr-[150px]" />
          <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-green-600 rounded-tl-[180px] rounded-tr-[220px]" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-green-500 rounded-tl-[120px] rounded-tr-[140px]" />

          {/* Stylized trees - More of them */}
          <div className="absolute bottom-1/4 left-1/4 w-16 h-16">
            <div className="w-4 h-12 bg-brown-600 mx-auto" />
            <div className="w-12 h-12 bg-green-800 rounded-full absolute -top-6 left-1/2 -translate-x-1/2" />
          </div>
          <div className="absolute bottom-1/3 right-1/4 w-12 h-12">
            <div className="w-3 h-8 bg-brown-600 mx-auto" />
            <div className="w-10 h-10 bg-green-800 rounded-full absolute -top-5 left-1/2 -translate-x-1/2" />
          </div>
          <div className="absolute bottom-1/5 left-1/6 w-14 h-14">
            <div className="w-3 h-10 bg-brown-600 mx-auto" />
            <div className="w-12 h-12 bg-green-700 rounded-full absolute -top-6 left-1/2 -translate-x-1/2" />
          </div>
          <div className="absolute bottom-1/4 right-1/6 w-10 h-10">
            <div className="w-2 h-6 bg-brown-600 mx-auto" />
            <div className="w-8 h-8 bg-green-700 rounded-full absolute -top-4 left-1/2 -translate-x-1/2" />
          </div>

          {/* Solar panels */}
          <div className="absolute bottom-1/6 right-1/3 w-20 h-10 bg-blue-900 transform rotate-12 opacity-70" />

          {/* Garden patch with plants */}
          <div className="absolute bottom-1/12 left-1/3 w-24 h-6 bg-brown-800 rounded-sm opacity-80" />
          <div className="absolute bottom-1/10 left-1/3 ml-2 w-2 h-6 bg-green-600" />
          <div className="absolute bottom-1/10 left-1/3 ml-6 w-2 h-8 bg-green-600" />
          <div className="absolute bottom-1/10 left-1/3 ml-10 w-2 h-5 bg-green-600" />
          <div className="absolute bottom-1/10 left-1/3 ml-14 w-2 h-7 bg-green-600" />
          <div className="absolute bottom-1/10 left-1/3 ml-18 w-2 h-4 bg-green-600" />

          {/* Recycling bins */}
          <div className="absolute bottom-1/6 left-1/2 -translate-x-1/2 w-12 h-16">
            <div className="w-10 h-12 bg-blue-500 mx-auto rounded-t-sm rounded-b-none" />
            <div className="w-12 h-2 bg-blue-600 mx-auto rounded-t-sm" />
            <div className="w-8 h-1 bg-white mx-auto mt-2 rounded-full" />
          </div>
          <div className="absolute bottom-1/6 left-1/2 -translate-x-20 w-10 h-14">
            <div className="w-8 h-10 bg-green-500 mx-auto rounded-t-sm rounded-b-none" />
            <div className="w-10 h-2 bg-green-600 mx-auto rounded-t-sm" />
            <div className="w-6 h-1 bg-white mx-auto mt-1 rounded-full" />
          </div>
          <div className="absolute bottom-1/6 left-1/2 translate-x-12 w-10 h-14">
            <div className="w-8 h-10 bg-yellow-500 mx-auto rounded-t-sm rounded-b-none" />
            <div className="w-10 h-2 bg-yellow-600 mx-auto rounded-t-sm" />
            <div className="w-6 h-1 bg-white mx-auto mt-1 rounded-full" />
          </div>

          {/* Compost bin */}
          <div className="absolute bottom-1/8 right-1/8 w-16 h-12 bg-brown-700 rounded-md opacity-80" />
          <div className="absolute bottom-1/7 right-1/8 w-14 h-2 bg-brown-900 rounded-t-md opacity-90 ml-1" />

          {/* Bicycle - eco-friendly transportation */}
          <div className="absolute bottom-1/10 left-1/10 opacity-70">
            <div className="w-12 h-1 bg-gray-700 transform rotate-45" />
            <div className="w-12 h-1 bg-gray-700 transform -rotate-45 -mt-1" />
            <div className="w-4 h-4 bg-transparent border-2 border-gray-700 rounded-full absolute -top-2 -left-2" />
            <div className="w-4 h-4 bg-transparent border-2 border-gray-700 rounded-full absolute -top-2 -right-2" />
            <div className="w-6 h-1 bg-gray-700 absolute -top-4 left-1/2 -translate-x-1/2" />
          </div>

          {/* Water droplets - representing water conservation */}
          <div className="absolute bottom-1/5 right-1/5 w-2 h-3 bg-blue-400 rounded-b-none rounded-t-full transform rotate-45 opacity-60" />
          <div className="absolute bottom-1/5 right-1/5 translate-x-4 w-2 h-3 bg-blue-400 rounded-b-none rounded-t-full transform rotate-30 opacity-60" />
          <div className="absolute bottom-1/5 right-1/5 translate-x-8 w-2 h-3 bg-blue-400 rounded-b-none rounded-t-full transform rotate-60 opacity-60" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col w-full h-full gap-y-4 p-4">
        {/* Header */}
        <header className="relative z-10 flex flex-col items-center mt-4 mb-6">
          <h1 className="text-2xl font-bold text-white">Your Progress</h1>
          <div className="time-frame-selector mt-2 bg-white/20 rounded-full p-1 flex">
            <button
              className={`px-4 py-1 rounded-full text-sm ${timeFrame === "day" ? "bg-white text-green-600" : "text-white"}`}
              onClick={() => {
                setTimeFrame("day");
              }}
              type="button">
              Day
            </button>
            <button
              className={`px-4 py-1 rounded-full text-sm ${timeFrame === "week" ? "bg-white text-green-600" : "text-white"}`}
              onClick={() => {
                setTimeFrame("week");
              }}
              type="button">
              Week
            </button>
            <button
              className={`px-4 py-1 rounded-full text-sm ${timeFrame === "month" ? "bg-white text-green-600" : "text-white"}`}
              onClick={() => {
                setTimeFrame("month");
              }}
              type="button">
              Month
            </button>
            <button
              className={`px-4 py-1 rounded-full text-sm ${timeFrame === "lifetime" ? "bg-white text-green-600" : "text-white"}`}
              onClick={() => {
                setTimeFrame("lifetime");
              }}
              type="button">
              Lifetime
            </button>
          </div>
        </header>

        {/* Metrics Grid */}
        <div className="metrics-grid grid grid-cols-2 gap-4 p-2 overflow-y-auto pb-20">
          {metrics.map((metric, index) => (
            <MetricCard
              color={metric.color}
              description={metric.description}
              icon={metric.icon}
              key={index}
              title={metric.title}
              value={metric.value}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
