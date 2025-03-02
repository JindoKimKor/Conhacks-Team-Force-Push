/* eslint-disable react/forbid-component-props */
import { Bell, Calendar, Check, HelpCircle, Menu, Zap } from "lucide-react";

import Card from "../../components/card/Card";
import { Button } from "../../components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-green-500 mx-auto relative">
      {/* Background Scene */}
      <div className="absolute inset-0 z-0">
        {/* Sky */}
        <div className="absolute inset-0 bg-sky-300" />

        {/* Sun */}
        <div className="absolute top-12 left-1/3 -translate-x-1/2 w-20 h-20 rounded-full bg-yellow-400 shadow-lg" />

        {/* Hills and Trees */}
        <div className="absolute bottom-0 left-0 right-0 h-3/4">
          {/* Back Hills */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-green-800 rounded-tl-[100px] rounded-tr-[120px]" />

          {/* Front Hill */}
          <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-green-600 rounded-tl-[150px] rounded-tr-[100px]" />

          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-green-500" />

          {/* Trees */}
          <div className="absolute bottom-1/3 left-5 w-12 h-16 flex flex-col items-center">
            <div className="w-12 h-12 bg-green-700 rounded-full" />
            <div className="w-10 h-10 bg-green-700 rounded-full -mt-4" />
            <div className="w-8 h-8 bg-green-700 rounded-full -mt-4" />
            <div className="w-3 h-4 bg-brown-600 rounded-sm -mt-1" />
          </div>

          <div className="absolute bottom-1/3 left-20 w-12 h-16 flex flex-col items-center">
            <div className="w-12 h-12 bg-green-700 rounded-full" />
            <div className="w-10 h-10 bg-green-700 rounded-full -mt-4" />
            <div className="w-8 h-8 bg-green-700 rounded-full -mt-4" />
            <div className="w-3 h-4 bg-brown-600 rounded-sm -mt-1" />
          </div>

          <div className="absolute bottom-1/3 right-5 w-12 h-16 flex flex-col items-center">
            <div className="w-12 h-12 bg-green-700 rounded-full" />
            <div className="w-10 h-10 bg-green-700 rounded-full -mt-4" />
            <div className="w-8 h-8 bg-green-700 rounded-full -mt-4" />
            <div className="w-3 h-4 bg-brown-600 rounded-sm -mt-1" />
          </div>

          <div className="absolute bottom-1/3 right-20 w-12 h-16 flex flex-col items-center">
            <div className="w-12 h-12 bg-green-700 rounded-full" />
            <div className="w-10 h-10 bg-green-700 rounded-full" />
            <div className="w-8 h-8 bg-green-700 rounded-full" />
            <div className="w-3 h-4 bg-brown-600 rounded-sm -mt-1" />
          </div>

          {/* Tree Stumps */}
          <div className="absolute bottom-1/6 left-10 w-6 h-4 bg-brown-700 rounded-t-lg" />
          <div className="absolute bottom-1/6 left-24 w-6 h-4 bg-brown-700 rounded-t-lg" />
          <div className="absolute bottom-1/6 right-10 w-6 h-4 bg-brown-700 rounded-t-lg" />
          <div className="absolute bottom-1/6 right-24 w-6 h-4 bg-brown-700 rounded-t-lg" />
          <div className="absolute bottom-1/6 right-40 w-6 h-4 bg-brown-700 rounded-t-lg" />
        </div>
      </div>
      <div className="relative z-10 flex flex-col w-full h-full gap-y-4 ">
        {/* Header */}
        <header className="relative z-10 flex justify-between items-center ">
          <div className="relative z-10 flex justify-between p-4">
            <div className="flex gap-2">
              <Button className="bg-white aspect-square size-12 rounded-lg shadow-sm hover:bg-amber-50">
                <Menu className="size-8 text-gray-600" />
              </Button>
            </div>
          </div>
          <div className="relative mr-3">
            <Button
              className="bg-sky-400 rounded-full h-16 w-16"
              size="icon"
              variant="ghost">
              <Bell className="size-fit text-white" />
            </Button>
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              1
            </span>
          </div>
        </header>

        {/* Character */}
        <div className="relative z-10 flex justify-center items-center mt-8">
          <div className="w-24 h-24 relative">
            <div className="absolute inset-0 bg-white rounded-full" />
            <div className="absolute top-1 left-1 right-1 bottom-1 bg-white rounded-full border-2 border-gray-200" />
            <div className="absolute top-3 left-4 w-4 h-4 bg-black rounded-full" />
            <div className="absolute top-3 right-4 w-4 h-4 bg-black rounded-full" />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-6 h-3 bg-orange-600 rounded-full" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-8 bg-red-500 rounded-t-full transform -rotate-6" />
          </div>
        </div>

        {/* Status Bar */}
        <div className="relative z-10 mt-8 mx-4 bg-green-400/80 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-white font-bold">Adventuring</span>
            <span className="text-white">back in: </span>
          </div>

          <div className="flex items-center justify-between gap-x-1">
            <div className="bg-yellow-400 rounded-full">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div className="bg-gray-200 rounded-full p-1">
              <span className="text-gray-500">😊</span>
            </div>
            <div className="flex-1 mx-2 h-2 bg-gray-300 rounded-full">
              <div className="w-1/4 h-full bg-yellow-400 rounded-full" />
            </div>
            <div className="bg-yellow-100 rounded-full p-2">
              <HelpCircle className="h-5 w-5 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Goals */}
        <div className="relative z-10 mt-4 mx-4 flex items-center">
          <Calendar className="h-5 w-5 text-white mr-2" />
          <span className="text-white font-medium">
            4 goals left for today!
          </span>
          <div className="ml-auto flex">
            <Button
              className="h-8 w-8 bg-white/20 rounded-md"
              onClick={() => {
                console.log("View all goals clicked");
              }}
              size="icon"
              variant="ghost">
              <span className="text-white">≡</span>
            </Button>
            <Button
              className="h-8 w-8 bg-white/20 rounded-md"
              size="icon"
              variant="ghost">
              <span className="text-white">+</span>
            </Button>
          </div>
        </div>

        {/* Tasks */}
        <div className="flex flex-col gap-y-6 z-10  ">
          <Card completed={true} icon="💧" points={5} text="Drink water" />
          <Card
            completed={true}
            icon="🦒"
            points={5}
            text="Take a stretch break"
          />
          <Card completed={true} icon="🧼" points={5} text="Wash my face" />
          <Card
            completed={true}
            icon="😊"
            points={5}
            text="Do one thing that makes me happy"
          />
        </div>
      </div>
    </div>
  );
}
