/* eslint-disable react/forbid-component-props */

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

interface Item {
  _id: string;
  cost: number;
  icon: string;
  imageUrl?: string;
  name: string;
}

interface UserItem {
  availability: boolean;
  item_id: string;
}

interface User {
  [key: string]: any;
  _id: string;
  name: string;
  profiles: {
    [key: string]: any;
    items: UserItem[];
  };
}

function ShopItem({
  icon,
  imageUrl,
  name,
  owned = false,
  page
}: {
  icon?: string;
  imageUrl?: string;
  name: string;
  owned?: boolean;
  page?: string;
}) {
  return (
    <div
      className={`rounded-xl p-3 relative flex items-center justify-center aspect-square cursor-pointer hover:bg-amber-50 ${page !== "buddy" ? "bg-yellow-100 " : "bg-pink-200/80"}`}>
      <span className="text-2xl">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2">
          <img
            alt={name}
            className="relative size-full rounded-lg overflow-hidden"
            src={imageUrl}
          />
        </div>
      </span>
      {owned ? (
        <div className="absolute top-1 right-1 bg-orange-400 rounded-full p-0.5">
          <Check className="h-3 w-3 text-white" />
        </div>
      ) : null}
    </div>
  );
}

export default function Buddy() {
  const [items, setItems] = useState<Item[]>([]);
  const [ownedItems, setOwnedItems] = useState<Item[]>([]);

  const getItems = async () => {
    try {
      const totalItems = await axios.get<Item[]>(
        "http://localhost:3000/api/items"
      );
      if (totalItems.data && totalItems.data.length > 0) {
        setItems(totalItems.data);

        // Get user data to check owned items
        const userData = await axios.get<User>(
          "http://localhost:3000/api/users/name?name=admin"
        );
        const user = userData.data;

        if (
          user &&
          user.profiles &&
          user.profiles.items &&
          user.profiles.items.length > 0
        ) {
          // Filter items that are owned by the user
          const userOwnedItemIds = user.profiles.items.map(
            item => item.item_id
          );
          const userOwnedItems = totalItems.data.filter(
            item =>
              userOwnedItemIds.includes(item._id) &&
              user.profiles.items.find(
                userItem => userItem.item_id === item._id
              )?.availability !== false
          );

          setOwnedItems(userOwnedItems);
          console.log("Owned items:", userOwnedItems);
        }
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    void getItems();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full mx-auto relative overflow-hidden mb-[56px]">
      {/* Background with simple decorative elements */}
      <div className="absolute inset-0 bg-yellow-200">
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
        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-blue-600" />
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

        {/* Owned Items Section */}
        <div className="p-4 border-b border-yellow-200/50">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">
            My Items
          </h2>
          {ownedItems.length > 0 ? (
            <div className="grid grid-cols-4 gap-2">
              {ownedItems.map(item => (
                <ShopItem
                  imageUrl={item.imageUrl}
                  key={item._id}
                  name={item.name}
                  owned={true}
                  page="buddy"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500">No owned items yet</p>
            </div>
          )}
        </div>

        {/* All Items Grid */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">
            All Items
          </h2>
          {items.length > 0 ? (
            <div className="grid grid-cols-4 gap-2">
              {items.map(item => (
                <ShopItem
                  imageUrl={item.imageUrl}
                  key={item._id}
                  name={item.name}
                  owned={ownedItems.some(
                    ownedItem => ownedItem._id === item._id
                  )}
                  page="buddy"
                />
              ))}
            </div>
          ) : (
            <div className="col-span-4 text-center py-8">
              <p className="text-gray-500">No items available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
