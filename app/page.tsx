/* eslint-disable  @typescript-eslint/no-explicit-any */
"use client";
import data from "@/app/data.json";
import InfiniteMenu from "@/components/InfiniteMenu";
import { useIsMobile } from "@/hooks/use-mobile";
import CharactersPage from "./characters/page";

export default function Home() {
  const isMobile = useIsMobile();

  if (isMobile) return CharactersPage();
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
        return "transition-all px-2 py-0.5 rounded-full text-lg font-medium bg-red-500 text-white";
      case "Hydro":
        return "transition-all px-2 py-0.5 rounded-full text-lg font-medium bg-blue-500 text-white";
      case "Electro":
        return "transition-all px-2 py-0.5 rounded-full text-lg font-medium bg-purple-500 text-white";
      case "Cryo":
        return "transition-all px-2 py-0.5 rounded-full text-lg font-medium bg-cyan-400 text-white";
      case "Anemo":
        return "transition-all px-2 py-0.5 rounded-full text-lg font-medium bg-cyan-500 text-white";
      case "Geo":
        return "transition-all px-2 py-0.5 rounded-full text-lg font-medium bg-yellow-500 text-white";
      case "Dendro":
        return "transition-all px-2 py-0.5 rounded-full text-lg font-medium bg-green-500 text-white";
      default:
        return "transition-all px-2 py-0.5 rounded-full text-lg font-medium bg-gray-600 text-white";
    }
  };

  const rankBadgeClass = (rank: number) => {
    if (rank === 5)
      return "px-2 py-0.5 rounded-full text-lg font-medium bg-yellow-400 text-yellow-900";
    if (rank === 4)
      return "px-2 py-0.5 rounded-full text-lg font-medium bg-purple-500 text-white";
    return "px-2 py-0.5 rounded-full text-lg   font-medium bg-gray-600 text-white";
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="absolute top-5 w-full z-99 text-center text-sm text-muted-foreground/50">
        {`Total Characters: ${Object.keys(data.data.items).length}`}
      </div>
      <InfiniteMenu
        // @ts-expect-error hehe
        items={[...Object.values(data.data.items)]
          .reverse()
          .map((item: any) => ({
            image: `https://gi.yatta.moe/assets/UI/${item.icon}.png`,
            title: (
              <div className="flex flex-col items-start justify-start">
                <span>{item.name}</span>
                <span className="text-xl  font-normal first-letter:uppercase lowercase ">
                  {item.region}
                </span>
              </div>
            ),
            link: `/characters/${item.id}`,
            description: (
              <div className="flex flex-row gap-2 justify-center items-center">
                <span
                  className={elementBadgeClass(getElementName(item.element))}
                >
                  {getElementName(item.element)}
                </span>
                <span className={rankBadgeClass(item.rank)}>{item.rank}★</span>
              </div>
            ),
          }))}
      />
      <div className="absolute bottom-5 w-full text-center text-sm text-muted-foreground/50">
        made with shadcn and react bits
      </div>
    </div>
  );
}
