/* eslint-disable react/forbid-component-props */
/* eslint-disable react/button-has-type */
import "./Shop.css";

import axios from "axios";
import {
  Check,
  Heart,
  Home,
  Menu,
  Paintbrush,
  PawPrint,
  Sofa,
  Store
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

import { Button } from "../../components/ui/button";

interface ShopItemType {
  _id: string;
  category: string;
  cost: number;
  icon: string;
  imageUrl: string;
  name: string;
  owned?: boolean;
}

function ShopItem({
  cost,
  icon,
  imageUrl,
  name,
  owned = false
}: {
  cost: number;
  icon: string;
  imageUrl: string;
  name: string;
  owned?: boolean;
}) {
  return (
    <div className="bg-yellow-100 rounded-xl p-3 relative flex items-center justify-center aspect-square cursor-pointer hover:bg-amber-50">
      {/* Image instead of icon */}
      <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2">
        <img
          alt={name}
          className="relative w-full h-3/4 rounded-lg overflow-hidden"
          onError={e => {
            // If image fails to load, fall back to the emoji icon
            e.currentTarget.src = icon;
          }}
          src={imageUrl}
        />
      </div>

      {/* Cost display */}
      <div className="absolute bottom-1 right-1 bg-yellow-400/80 rounded-full px-1.5 py-0.5 flex items-center">
        <span className="text-yellow-800 text-[10px]">{cost}</span>
        <span className="text-[10px] ml-0.5">✨</span>
      </div>

      {owned ? (
        <div className="absolute top-1 right-1 bg-orange-400 rounded-full p-0.5">
          <Check className="h-3 w-3 text-white" />
        </div>
      ) : null}
    </div>
  );
}

export default function Shop() {
  const [items, setItems] = useState<ShopItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Fetch shop items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/items");
        setItems(response.data);
        console.log("response.data", response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching shop items:", err);
        setError("Failed to load shop items");
      } finally {
        setLoading(false);
      }
    };

    fetchItems().catch((err: unknown) => {
      console.error("Error fetching shop items:", err);
    });
  }, []);

  // Filter items based on selected category
  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter(
          item => item.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  // Map categories to emojis
  // This is not working yet, I tried to make it dynamic but leaving it here just in case
  const categoryEmojis: Record<string, string> = {
    accessories: "👓",
    all: "♥",
    dresses: "�",
    footwear: "�",
    hats: "🎩",
    pants: "�",
    shirts: "�",
    socks: "🧦"
  };

  return (
    <div className="flex flex-col min-h-screen w-full mx-auto relative overflow-hidden mb-[56px]">
      {/* Background with simple decorative elements */}
      <div className="absolute inset-0 bg-pink-300">
        {/* Curved paths */}
        <div className="absolute top-0 left-0 w-32 h-16 bg-pink-400/50 rounded-full" />
        <div className="absolute top-20 right-0 w-40 h-16 bg-pink-400/50 rounded-full" />

        {/* Stars */}
        <div className="absolute top-10 right-20 text-yellow-300 text-xl">
          ★
        </div>
        <div className="absolute top-32 left-10 text-purple-300 text-xl">★</div>
        <div className="absolute top-16 right-40 text-red-300 text-xl">★</div>

        {/* Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-teal-400" />
      </div>

      {/* Top Icons */}
      <div className="relative z-10 flex justify-between p-4">
        <div className="flex gap-2">
          <Button className="bg-white aspect-square size-12 rounded-lg shadow-sm hover:bg-amber-50">
            <Menu className="size-8 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Character Area - Simplified placeholder */}
      <div className="relative z-10 flex justify-center items-center h-48">
        <div className="w-24 h-24 bg-pink-200 rounded-2xl relative">
          {/* Basic character shape */}
          <div className="absolute top-4 w-full flex justify-center gap-4">
            <div className="w-2 h-2 bg-gray-800 rounded-full" />
            <div className="w-2 h-2 bg-gray-800 rounded-full" />
          </div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-4 h-2 bg-gray-800 rounded-full" />
          <div className="absolute bottom-0 w-full h-1/2 bg-purple-400 rounded-b-2xl" />
        </div>

        {/* Action buttons */}
        <div className="absolute right-4 flex flex-col gap-2">
          <button className="bg-white p-2 rounded-lg shadow-sm">
            <Heart className="h-5 w-5 text-gray-400" />
          </button>
          <button className="bg-white p-2 rounded-lg shadow-sm">
            <Home className="h-5 w-5 text-gray-400" />
          </button>
          <button className="bg-white p-2 rounded-lg shadow-sm">
            <Store className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative  flex-1 bg-yellow-50/90 rounded-t-3xl">
        {/* Filter Icons */}
        <div className="flex justify-around p-4 border-b border-yellow-200/50  ">
          <Button className="text-yellow-800 text-3xl bg-amber-50 hover:bg-pink-300/30  ">
            ♥
          </Button>
          <Button className="text-3xl text-gray-400 bg-amber-50 hover:bg-pink-300/30">
            👕
          </Button>
          <Button className="text-3xl text-gray-400 bg-amber-50 hover:bg-pink-300/30">
            👖
          </Button>
          <Button className="text-3xl text-gray-400 bg-amber-50 hover:bg-pink-300/30">
            👚
          </Button>
          <Button className="text-3xl text-gray-400 bg-amber-50 hover:bg-pink-300/30">
            🎩
          </Button>
          <Button className="text-3xl text-gray-400 bg-amber-50 hover:bg-pink-300/30">
            👓
          </Button>
          <Button className="text-3xl text-gray-400 bg-amber-50 hover:bg-pink-300/30">
            👞
          </Button>
          <Button className="text-3xl text-gray-400 bg-amber-50 hover:bg-pink-300/30">
            🧦
          </Button>
        </div>
        {/* Items Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-4 gap-2 p-4">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <ShopItem
                  cost={item.cost}
                  icon={item.icon}
                  imageUrl={item.imageUrl}
                  key={item._id}
                  name={item.name}
                  owned={item.owned}
                />
              ))
            ) : (
              <div className="col-span-4 text-center py-8 text-gray-500">
                No items found in this category
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
