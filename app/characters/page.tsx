/* eslint-disable  @typescript-eslint/no-explicit-any */
"use client";
import { Card, CardContent } from "@/components/ui/card";
import data from "@/app/data.json";
import Image from "next/image";
import Link from "next/link";

// Mapping from element to its full Tailwind CSS background class

export default function CharactersPage() {
  // Helper function to get proper element name
  const getElementName = (element: string) => {
    return (data.data.elements as any)[element] || element;
  };

  // Helper function to get proper weapon type name
  const getWeaponTypeName = (weaponType: string) => {
    return (data.data.types as any)[weaponType] || weaponType;
  };

  // Build badge classes for element badges using literal Tailwind classes
  // This eliminates dynamic class names so Tailwind can generate the styles
  const elementBadgeClass = (element: string) => {
    switch (element) {
      case "Pyro":
        return "transition-all px-2 py-0.5 rounded-full text-xs font-medium bg-red-500 text-white";
      case "Hydro":
        return "transition-all px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white";
      case "Electro":
        return "transition-all px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500 text-white";
      case "Cryo":
        return "transition-all px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-400 text-white";
      case "Anemo":
        return "transition-all px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-500 text-white";
      case "Geo":
        return "transition-all px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500 text-white";
      case "Dendro":
        return "transition-all px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white";
      default:
        return "transition-all px-2 py-0.5 rounded-full text-xs font-medium bg-gray-600 text-white";
    }
  };

  // Rank badge classes: 5 stars = gold, 4 stars = purple, otherwise gray
  const rankBadgeClass = (rank: number) => {
    if (rank === 5)
      return "px-2 py-0.5 rounded-full text-sm font-medium bg-yellow-400 text-yellow-900";
    if (rank === 4)
      return "px-2 py-0.5 rounded-full text-sm font-medium bg-purple-500 text-white";
    return "px-2 py-0.5 rounded-full text-sm font-medium bg-gray-600 text-white";
  };

  return (
    <div className=" p-1">
      <div className="w-full max-w-5xl  m-auto ">
        <h2 className="text-2xl font-bold my-2 mb-5">Characters</h2>
        <div className="w-full grid grid-cols-4 max-md:grid-cols-2 gap-2 ">
          {[...Object.values(data.data.items)].reverse().map((item: any) => (
            <Link key={item.id} href={`/characters/${item.id}`}>
              <Card
                // Use the mapping object to get the correct class name
                // The default 'bg-gray-500' is a fallback if the element isn't in our map
                className={`border-b starting:scale-110 duration-1000 bg-gray-900  rounded hover:scale-95 hover:outline outline-white  z-auto hover:duration-100 transform-gpu transition-all`}
              >
                <CardContent className="flex  justify-center p-1 items-center flex-col">
                  <Image
                    src={`https://gi.yatta.moe/assets/UI/${item.icon}.png`}
                    alt={item.name}
                    width={100}
                    height={100}
                  />
                  <div className="text-sm text-muted-foreground flex flex-row gap-2 mt-2 items-center">
                    <span
                      className={elementBadgeClass(
                        getElementName(item.element)
                      )}
                    >
                      {getElementName(item.element)}
                    </span>

                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-700 text-white">
                      {getWeaponTypeName(item.weaponType)}
                    </span>
                  </div>
                  <span className="font-bold text-center">{item.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
