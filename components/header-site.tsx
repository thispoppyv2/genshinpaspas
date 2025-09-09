"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeaderSite() {
  return (
    <Link
      href="/"
      className={`transition-all
       w-full duration-500 p-5 z-10 bg-background/80 backdrop-blur-xl py-5 items-center gap-2.5 flex  gap-2`}
    >
      <Image
        src="/static/images/logo.webp"
        alt="Genshin Impact"
        width={500}
        height={300}
        className="rounded-md size-12 rounded-2xl"
      />
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold ">Genshin Impact</h1>
          <p className="text-muted-foreground">mabilisang code keme keme</p>
        </div>
        <div>Made by Secret</div>
      </div>
    </Link>
  );
}
