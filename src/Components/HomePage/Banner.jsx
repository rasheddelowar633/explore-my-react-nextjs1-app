
import React from "react";
import Link from "next/link";
import Image from "next/image";

import bannerImage from "@/assets/banner.png";

const BannerPage = () => {
  return (
    <section className="bg-base-200">
      <div className="container mx-auto px-0">
        <div className="hero min-h-[70vh] bg-gray-400">

          <div className="hero-content w-full flex-col-reverse justify-between gap-10 lg:flex-row">

            {/* Content */}
            <div className="flex-1 text-center lg:text-left">

              <h6 className="text-sm text-lime-300 font-semibold tracking-[0.3em]">
                WORKOUT LIBRARY
              </h6>

              <h1 className="mt-4 text-4xl text-white  font-bold leading-tight sm:text-5xl lg:text-6xl">
                TRAIN WITH INTENT.LOG <br /> EVERY SET.
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-base leading-7 sm:text-lg lg:mx-0">
                FitLog is a dark, no-nonsense gym companion: pick a lift, lock
                it <br /> into today&apos;s plan, and watch the week&apos;s work add
                up.
              </p>

              <Link
                href="/workouts"
                className="btn mt-6 border-none bg-[#C2F800] text-black hover:bg-[#b5e600]"
              >
                BROWSE WORKOUTS
              </Link>

            </div>

            {/* Banner Image */}
            <div className="flex flex-1 justify-center lg:justify-end">
              <Image
                src={bannerImage}
                alt="Workout Banner"
                priority
                className="w-full max-w-sm rounded-2xl object-cover shadow-2xl sm:max-w-md"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerPage;

