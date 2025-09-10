"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeaderSite() {
  return (
    <Link
      href="/"
      className={`transition-all
       w-full duration-500 max-md:px-2 px-5  z-10 bg-background/80 backdrop-blur-xl pt-5 items-center flex  gap-2`}
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
          <h1 className="text-4xl max-md:text-xl font-bold ">Genshin Impact</h1>
          <p className="text-muted-foreground">mabilisang code keme keme</p>
        </div>
        <div className="text-end">Made by Secret</div>
      </div>
    </Link>
  );
}
