/* eslint-disable react/forbid-component-props */
/* eslint-disable react/button-has-type */
import {
  Check,
  Heart,
  Home,
  Paintbrush,
  PawPrint,
  Sofa,
  Store
} from "lucide-react";
import type React from "react";
import { Button } from "../../components/ui/button";

function ShopItem({
  icon,
  name,
  owned = false
}: {
  icon: string;
  name: string;
  owned?: boolean;
}) {
  return (
    <div className="bg-yellow-100 rounded-xl p-3 relative flex items-center justify-center aspect-square cursor-pointer hover:bg-amber-50">
      <span className="text-2xl">{icon}</span>
      {owned ? (
        <div className="absolute top-1 right-1 bg-orange-400 rounded-full p-0.5">
          <Check className="h-3 w-3 text-white" />
        </div>
      ) : null}
    </div>
  );
}

export default function Shop() {
  return (
    <div className="flex flex-col min-h-screen w-full mx-auto relative overflow-hidden">
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
        <button className="text-white">✕</button>
        <div className="flex gap-2">
          <button className="bg-white p-2 rounded-lg shadow-sm">
            <Home className="h-5 w-5 text-orange-500" />
          </button>
          <button className="bg-white p-2 rounded-lg shadow-sm">
            <Store className="h-5 w-5 text-orange-500" />
          </button>
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
      <div className="relative z-10 flex-1 bg-yellow-50/90 rounded-t-3xl">
        {/* Filter Icons */}
        <div className="flex justify-around p-4 border-b border-yellow-200/50">
          <Button className="text-yellow-800 ">♥</Button>
          <button className="text-gray-400">👕</button>
          <button className="text-gray-400">👖</button>
          <button className="text-gray-400">👚</button>
          <button className="text-gray-400">🎩</button>
          <button className="text-gray-400">👓</button>
          <button className="text-gray-400">👞</button>
          <button className="text-gray-400">🧦</button>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-4 gap-2 p-4">
          <ShopItem icon="🐔" name="Chicken Hat" />
          <ShopItem icon="👕" name="Bear Hug Tee" />
          <ShopItem icon="👚" name="Purple Shirt" owned />
          <ShopItem icon="🧣" name="Orange Scarf" owned />

          <ShopItem icon="💝" name="Heart Wand" />
          <ShopItem icon="🧢" name="Red Cap" />
          <ShopItem icon="🍡" name="Popsicle" />
          <ShopItem icon="👞" name="Brown Shoes" />

          <ShopItem icon="💎" name="Necklace" />
          <ShopItem icon="🎀" name="Pink Bow" />
          <ShopItem icon="👢" name="Brown Boots" />
          <ShopItem icon="🦺" name="Orange Vest" />

          <ShopItem icon="👜" name="Rainbow Bag" owned />
          <ShopItem icon="👑" name="Crown" />
          <ShopItem icon="🧥" name="Gray Hoodie" owned />
          <ShopItem icon="🧦" name="Blue Socks" owned />
        </div>
      </div>
    </div>
  );
}
