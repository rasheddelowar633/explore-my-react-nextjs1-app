
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useWorkout } from "@/Components/Context/workoutContext";

const MyPlan = () => {
  const {
    myPlan = [],
    savedWorkouts = [],
    removeFromPlan,
    toggleSaved,
    loaded,
  } = useWorkout();

  const [sortBy, setSortBy] = useState("duration");
  const [activeTab, setActiveTab] = useState("plan");

  // Sort today's plan and show a maximum of 5 workouts
  const todayPlan = useMemo(() => {
    const sorted = [...myPlan].sort((a, b) => {
      if (sortBy === "duration") {
        return Number(a.duration || 0) - Number(b.duration || 0);
      }

      if (sortBy === "calories") {
        return (
          Number(a.caloriesBurned || 0) -
          Number(b.caloriesBurned || 0)
        );
      }

      return String(a.name || "").localeCompare(
        String(b.name || "")
      );
    });

    return sorted.slice(0, 5);
  }, [myPlan, sortBy]);

  const totalMinutes = todayPlan.reduce(
    (total, workout) =>
      total + Number(workout.duration || 0),
    0
  );

  const totalCalories = todayPlan.reduce(
    (total, workout) =>
      total + Number(workout.caloriesBurned || 0),
    0
  );

  const displayedWorkouts =
    activeTab === "plan" ? todayPlan : savedWorkouts;

  // Remove a workout from today's plan
  const handleRemoveFromPlan = (workout) => {
    const id = workout.id ?? workout._id;

    if (id == null) {
      toast.error("Workout ID not found!");
      return;
    }

    removeFromPlan(id);
    toast.success("Workout removed from your plan!");
  };

  // Remove a workout from saved collection
  const handleRemoveSaved = (workout) => {
    toggleSaved(workout);
    toast.success("Workout removed from saved!");
  };

  if (!loaded) {
    return (
      <main className="min-h-screen bg-black px-4 py-16 text-white">
        <p className="text-center text-gray-400">
          Loading your workouts...
        </p>
      </main>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C2F800]">
            FITLOG / YOUR COLLECTION
          </p>

          <h1 className="text-3xl font-black tracking-wide sm:text-4xl">
            MY <span className="text-[#C2F800]">PLAN</span>
          </h1>

          <p className="mt-2 text-sm text-gray-400 sm:text-base">
            Build your daily workout plan and track your progress.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-[#111] p-5">
            <p className="text-sm font-semibold text-gray-400">
              Exercises
            </p>

            <p className="mt-2 text-4xl font-black text-[#C2F800]">
              {todayPlan.length}
              <span className="ml-2 text-base text-gray-500">
                / 5
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111] p-5">
            <p className="text-sm font-semibold text-gray-400">
              Minutes
            </p>

            <p className="mt-2 text-4xl font-black">
              {totalMinutes}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111] p-5">
            <p className="text-sm font-semibold text-gray-400">
              Calories
            </p>

            <p className="mt-2 text-4xl font-black">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* Tabs and Sorting */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => setActiveTab("plan")}
              className={`border-b-2 pb-3 text-sm font-bold ${
                activeTab === "plan"
                  ? "border-[#C2F800] text-[#C2F800]"
                  : "border-transparent text-gray-400"
              }`}
            >
              Today's Plan ({todayPlan.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`border-b-2 pb-3 text-sm font-bold ${
                activeTab === "saved"
                  ? "border-[#C2F800] text-[#C2F800]"
                  : "border-transparent text-gray-400"
              }`}
            >
              Saved ({savedWorkouts.length})
            </button>
          </div>

          {activeTab === "plan" && (
            <div className="mb-3 flex items-center gap-3">
              <label
                htmlFor="sortBy"
                className="text-sm text-gray-400"
              >
                Sort By
              </label>

              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-white/10 bg-[#171717] px-3 py-2 text-sm text-white outline-none focus:border-[#C2F800]"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="name">Name</option>
              </select>
            </div>
          )}
        </div>

        {/* Workout Cards */}
        <div className="mt-6">
          {displayedWorkouts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/15 bg-[#0d0d0d] px-5 py-16 text-center">
              <p className="text-sm font-black tracking-[0.2em] text-[#C2F800]">
                NOTHING HERE YET
              </p>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-400">
                {activeTab === "plan"
                  ? "Browse the workout library and add a workout to your daily plan."
                  : "Save your favorite workouts from the workout library to find them here."}
              </p>

              <Link
                href="/workouts"
                className="mt-6 inline-flex rounded-lg bg-[#C2F800] px-5 py-3 text-sm font-black text-black transition hover:bg-white"
              >
                Browse Workouts
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {displayedWorkouts.map((workout, index) => {
                const workoutId = workout.id ?? workout._id;

                const muscleGroups = Array.isArray(
                  workout.muscleGroups
                )
                  ? workout.muscleGroups.join(", ")
                  : workout.muscleGroups || "Workout";

                return (
                  <article
                    key={String(workoutId ?? index)}
                    className="group rounded-xl border border-white/10 bg-[#111] p-4 transition hover:border-[#C2F800]/40"
                  >
                    <div className="flex gap-4">
                      {/* Workout Image */}
                      <Link
                        href={`/workouts/${workoutId}`}
                        className="shrink-0"
                      >
                        <img
                          src={workout.image || "/placeholder.png"}
                          alt={workout.name || "Workout"}
                          className="h-24 w-24 rounded-lg object-cover sm:h-28 sm:w-28"
                        />
                      </Link>

                      {/* Workout Information */}
                      <div className="min-w-0 flex-1">
                        <Link href={`/workouts/${workoutId}`}>
                          <h2 className="truncate font-black transition group-hover:text-[#C2F800]">
                            {workout.name || "Untitled Workout"}
                          </h2>
                        </Link>

                        <p className="mt-2 text-sm text-gray-400">
                          {muscleGroups}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-300">
                          <span>
                            ⏱️ {workout.duration ?? 25} min
                          </span>

                          <span>
                            🔥 {workout.caloriesBurned ?? 180} kcal
                          </span>

                          <span>
                            {workout.sets ?? "—"} sets
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <div className="mt-4 border-t border-white/10 pt-3">
                      {activeTab === "plan" ? (
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveFromPlan(workout)
                          }
                          className="w-full rounded-lg border border-red-500/30 px-4 py-2.5 text-sm font-bold text-red-400 transition hover:bg-red-500/10"
                        >
                          ✕ Remove from Plan
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRemoveSaved(workout)}
                          className="w-full rounded-lg border border-[#C2F800]/30 px-4 py-2.5 text-sm font-bold text-[#C2F800] transition hover:bg-[#C2F800]/10"
                        >
                          ♥ Remove from Saved
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="py-8 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">
            FITLOG — Train Hard. Track Progress.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default MyPlan;
