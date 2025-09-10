/* eslint-disable  @typescript-eslint/no-explicit-any */
"use client";
import data from "@/app/data.json";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { avatarIconToGacha } from "@/lib/utils";
import GlassSurface from "@/components/GlassSurface";
import { MoveLeftIcon } from "lucide-react";

export default function CharacterPage() {
  const params = useParams();
  const id = params?.id;
  const [fetchData, setFetchData] = useState(null);

  useEffect(() => {
    if (!id) return;
    // Fetch data from the API for this character id
    const fetchAvatar = async () => {
      try {
        const response = await fetch(
          `https://gi.yatta.moe/api/v2/en/avatar/${id}`
        );
        const json = await response.json();
        setFetchData(json);
      } catch (e) {
        console.error("Failed to fetch character data", e);
        setFetchData(null);
      }
    };
    fetchAvatar();
  }, [id]);

  const getElementName = (element: string) => {
    return data.data.elements[element] || element;
  };

  // Helper function to get proper weapon type name
  const getWeaponTypeName = (weaponType: string) => {
    return data.data.types[weaponType] || weaponType;
  };

  // Build badge classes for element badges using literal Tailwind classes
  // This eliminates dynamic class names so Tailwind can generate the styles
  const elementBadgeClass = (element: string) => {
    switch (element) {
      case "Pyro":
        return "transition-all px-2 py-0.5 rounded-full text-sm font-medium bg-red-500 text-white";
      case "Hydro":
        return "transition-all px-2 py-0.5 rounded-full text-sm font-medium bg-blue-500 text-white";
      case "Electro":
        return "transition-all px-2 py-0.5 rounded-full text-sm font-medium bg-purple-500 text-white";
      case "Cryo":
        return "transition-all px-2 py-0.5 rounded-full text-sm font-medium bg-cyan-400 text-white";
      case "Anemo":
        return "transition-all px-2 py-0.5 rounded-full text-sm font-medium bg-cyan-500 text-white";
      case "Geo":
        return "transition-all px-2 py-0.5 rounded-full text-sm font-medium bg-yellow-500 text-white";
      case "Dendro":
        return "transition-all px-2 py-0.5 rounded-full text-sm font-medium bg-green-500 text-white";
      default:
        return "transition-all px-2 py-0.5 rounded-full text-sm font-medium bg-gray-600 text-white";
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

  const character = fetchData?.data;

  if (!character) {
    return <div className="m-auto w-full text-center">Character not found</div>;
  }

  const processDescription = (desc: string) => {
    if (!desc) return "";

    const parts = desc
      .replace(/<color=(.*?)>(.*?)<\/color>/g, "[[COLOR:$1]]$2[[/COLOR]]")
      .replace(/{LINK#.*?}(.*?){\/LINK}/g, "[[LINK]]$1[[/LINK]]")
      .replace(/<i>(.*?)<\/i>/g, "[[I]]$1[[/I]]")
      .replace(/\\n/g, "[[BR]]")
      .split(
        /(\[\[BR\]\]|\[\[COLOR:.*?\]\]|\[\[\/COLOR\]\]|\[\[LINK\]\]|\[\[\/LINK\]\]|\[\[I\]\]|\[\[\/I\]\])/g
      );

    const elements = [];
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!part) continue;

      if (part.startsWith("[[COLOR:")) {
        const color = part.substring(8, part.length - 2);
        const content = parts[i + 1] || "";
        elements.push(
          <span key={i} style={{ color: color.slice(0, 7) }}>
            {content}
          </span>
        );
        i++; // Skip content part
        i++; // Skip [[/COLOR]] part
      } else if (part === "[[LINK]]") {
        const content = parts[i + 1] || "";
        elements.push(
          <span key={i} className="text-yellow-400">
            {content}
          </span>
        );
        i++; // Skip content part
        i++; // Skip [[/LINK]] part
      } else if (part === "[[I]]") {
        const content = parts[i + 1] || "";
        elements.push(<i key={i}>{content}</i>);
        i++; // Skip content part
        i++; // Skip [[/I]] part
      } else if (part === "[[BR]]") {
        elements.push(<br key={i} />);
      } else if (part.startsWith("[[")) {
        // Skip other tags like [[/COLOR]] or [[/LINK]] if they are not handled above
      } else {
        elements.push(<span key={i}>{part.replace(/#/, "")}</span>);
      }
    }
    return elements;
  };

  return (
    <div className="m-auto w-full pb-5">
      <GlassSurface
        backgroundOpacity={0.5}
        mixBlendMode="screen"
        borderRadius={99}
        blur={12}
        borderWidth={12}
        distortionScale={19}
        saturation={1}
        displace={2.5}
        height={36}
        className="sticky  top-2.5 left-0 h-fit m-5 -mt-12 mx-auto z-10"
      >
        <div
          className="flex cursor-pointer  gap-2 text-sm m-auto items-center text-lg font-medium"
          onClick={() => window.history.back()}
        >
          <MoveLeftIcon size={16} />
          Go Back
        </div>
      </GlassSurface>
      <div className="relative w-screen h-screen -z-10 ">
        {/* Background Image: Blurred and slightly scaled up */}
        <Image
          src={`https://gi.yatta.moe/assets/UI/${avatarIconToGacha(
            character.icon
          )}.png`}
          alt={`${character.name} blurred background`}
          className="absolute inset-0 w-full h-full object-cover rounded-b-2xl blur saturate-200 starting:opacity-0 starting:scale-150 scale-100 opacity-100 transition duration-1000"
          width={1920}
          height={1080}
          loading="eager"
        />

        {/* Foreground Image: Sharp and includes the original transition effects */}
        <Image
          src={`https://gi.yatta.moe/assets/UI/${avatarIconToGacha(
            character.icon
          )}.png`}
          alt={character.name}
          className="absolute inset-0 w-full h-full object-cover rounded-b-2xl starting:scale-200 scale-100 duration-500 transition"
          width={1920}
          height={1080}
          loading="eager"
        />
      </div>

      <div className="max-w-5xl bg-card/75 backdrop-blur-md rounded-2xl backdrop-saturate-250 p-5 transition-all duration-1000  m-auto w-full starting:mt-0 -mt-[33svh] max-md:-mt-[40svh]">
        <div className="flex flex-col  items-center justify-center gap-1 p-5">
          <Image
            src={`https://gi.yatta.moe/assets/UI/${character.icon}.png`}
            alt={character.name}
            className="size-24 bg-gray-800 p-2 rounded-2xl"
            width={200}
            height={200}
          />
          <div className="flex flex-col gap-2 items-center justify-center">
            <h1 className="text-3xl font-bold">{character.name}</h1>
            <div className="text-muted-foreground flex flex-row gap-2.5">
              <span
                className={elementBadgeClass(getElementName(character.element))}
              >
                {getElementName(character.element)}
              </span>

              <span className="px-2 py-0.5 rounded-full text-sm font-medium bg-slate-700 text-white">
                {getWeaponTypeName(character.weaponType)}
              </span>

              <span className={rankBadgeClass(character.rank)}>
                {character.rank}★
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="ml-2.5">
              <div className="flex  items-center gap-2">
                <p className="text-xl font-bold text-center m-auto">
                  {character.fetter.title}
                </p>
              </div>
              <p className="italic">{character.fetter.constellation}</p>
              <p className="text">Taga Brgy. {character.fetter.native}</p>

              <p className="text-white/75 ">{character.fetter.detail}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl m-auto w-full mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="bg-card/75 backdrop-blur-md rounded-2xl p-4 mb-4 text-2xl font-bold">
            Talents
          </h2>
          {character.talent &&
            Object.values(character.talent).map(
              (talent: any, index: number) => (
                <div
                  key={index}
                  className="bg-card/75 backdrop-blur-md rounded-2xl p-4 mb-4"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={`https://gi.yatta.moe/assets/UI/${talent.icon}.png`}
                      alt={talent.name}
                      width={48}
                      height={48}
                      className="bg-gray-800 rounded-full p-1"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{talent.name}</h3>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-white/80">
                    {processDescription(talent.description)}
                  </div>
                </div>
              )
            )}
        </div>
        <div>
          <h2 className="bg-card/75 backdrop-blur-md rounded-2xl p-4 mb-4 text-2xl font-bold">
            Constellations
          </h2>
          {character.constellation &&
            Object.values(character.constellation).map(
              (constellation: any, index: number) => (
                <div
                  key={index}
                  className="bg-card/75 backdrop-blur-md rounded-2xl p-4 mb-4"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={`https://gi.yatta.moe/assets/UI/${constellation.icon}.png`}
                      alt={constellation.name}
                      width={48}
                      height={48}
                      className="bg-gray-800 rounded-full p-1"
                    />
                    <div>
                      <h3 className="font-bold text-lg">
                        {constellation.name}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-white/80">
                    {processDescription(constellation.description)}
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
}
