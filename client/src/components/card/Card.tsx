/* eslint-disable react/forbid-component-props */
import { Check, Zap } from "lucide-react";

export default function Card({
  completed,
  icon,
  points,
  text
}: {
  completed: boolean;
  icon: string;
  points: number;
  text: string;
}) {
  return (
    <div className=" h-20 rounded-3xl w-11/12 self-center bg-white gap-x-2 flex items-center shadow-sm pr-2">
      <div className="flex items-center justify-center w-16 h-full   bg-gray-100 overflow-hidden rounded-3xl">
        <span className="text-2xl">{icon}</span>
      </div>
      <span className="font-md text-xl flex-1">{text}</span>
      <div className="flex items-center">
        <div className="flex items-center mr-2">
          <Zap className="h-full w-4 text-yellow-500 mr-1" />
          <span className="text-gray-500">{points}</span>
        </div>
        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="h-4 w-4 text-green-500" />
        </div>
      </div>
    </div>
  );
}
