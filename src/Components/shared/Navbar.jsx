
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "@/assets/logo.png";
import { useWorkout } from "@/Components/Context/workoutContext";

export default function NavbarPage() {
  const {
    myPlan = [],
    savedWorkouts = [],
    loaded,
  } = useWorkout();

  const pathname = usePathname();

  const navClass = (path) =>
    `rounded-lg px-3 py-2 font-semibold transition ${
      pathname === path
        ? "bg-[#C2F800] text-black"
        : "text-white hover:bg-white/10"
    }`;

  return (
    <header className="w-full bg-black text-white shadow-md">
      <nav className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="FITLOG" width={45} height={45} />
          <span className="text-xl font-black">FITLOG</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/workouts"
            className={navClass("/workouts")}
          >
            Workouts
          </Link>

          <Link
            href="/plan"
            className={navClass("/plan")}
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/Save"
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 font-bold transition hover:border-[#C2F800] ${
              pathname === "/Save"
                ? "border-[#C2F800] text-[#C2F800]"
                : "border-white/20 text-white"
            }`}
          >
            Saved

            <span className="rounded-full bg-[#C2F800] px-2 py-0.5 text-xs font-black text-black">
              {loaded ? savedWorkouts.length : 0}
            </span>
          </Link>

          <Link
            href="/plan"
            className="flex items-center gap-2 rounded-lg bg-[#C2F800] px-3 py-2 font-bold text-black transition hover:bg-white"
          >
            My Plan

            <span className="rounded-full bg-black px-2 py-0.5 text-xs text-white">
              {loaded ? myPlan.length : 0}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
