
"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import { useWorkout } from "@/Components/Context/workoutContext";

const SavePage = () => {
  const { savedWorkouts = [], toggleSaved, loaded } = useWorkout();

  const handleRemoveSaved = (workout) => {
    toggleSaved(workout);
    toast.success(
      `${workout.name || "Workout"} সেভ করা তালিকা থেকে মুছে ফেলা হয়েছে!`,
      { position: "top-right", autoClose: 2000, theme: "dark" }
    );
  };

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading saved workouts...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#C2F800]">
              Your Collection
            </p>

            <h1 className="mt-2 text-3xl font-black md:text-5xl">
              SAVED WORKOUTS
            </h1>

            <p className="mt-3 text-gray-400">
              Your favorite workouts, saved for later.
            </p>
          </div>

          <Link
            href="/workouts"
            className="inline-flex items-center justify-center rounded-lg bg-[#C2F800] px-6 py-3 font-bold text-black transition hover:bg-[#d6ff33]"
          >
            Browse Workouts
          </Link>
        </div>

        {/* Saved Workout Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Saved workouts:{" "}
            <span className="font-bold text-[#C2F800]">
              {savedWorkouts.length}
            </span>
          </p>
        </div>

        {/* Empty State */}
        {savedWorkouts.length === 0 ? (
          <div className="rounded-2xl border border-gray-800 p-10 text-center md:p-16">
            <h2 className="mb-3 text-2xl font-bold">
              No Saved Workouts
            </h2>

            <p className="mb-6 text-gray-400">
              Save your favorite workouts and they will appear here.
            </p>

            <Link
              href="/workouts"
              className="inline-block rounded-lg bg-[#C2F800] px-6 py-3 font-bold text-black transition hover:bg-[#d6ff33]"
            >
              Explore Workouts
            </Link>
          </div>
        ) : (
          /* Horizontal Card Layout */
          <div className="flex w-[800px] h-[400px] flex-col gap-5">
            {savedWorkouts.map((workout) => (
              <article
                key={workout.id ?? workout._id}
                className="relative flex min-h-[150px] w-full flex-row overflow-hidden rounded-2xl border border-gray-800 bg-[#111] transition hover:border-[#C2F800]"
              >
                {/* Image - Left Side */}
                <Link
                  href={`/workouts/${workout.id}`}
                  className="block w-1/3 shrink-0 sm:w-1/4 md:w-[220px]"
                >
                  <div className="h-full min-h-[150px] overflow-hidden">
                    <img
                      src={workout.image}
                      alt={workout.name}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </div>
                </Link>

                {/* Card Details - Right Side */}
                <div className="flex min-w-0 flex-1 flex-col p-3 pr-12 sm:p-5 sm:pr-16">
                  <h2 className="mb-3 break-words text-base font-bold sm:text-xl">
                    {workout.name}
                  </h2>

                  {/* Muscle Groups */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {workout.muscleGroups?.map((muscle, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-300 sm:px-3"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>

                  {/* Duration and Calories */}
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-gray-800 pt-3 text-xs text-gray-400 sm:pt-4 sm:text-sm">
                    <span>{workout.duration || "N/A"} min</span>
                    <span>{workout.caloriesBurned || 0} calories</span>
                  </div>
                </div>

                {/* Remove Button - Top Right Corner */}
                <button
                  type="button"
                  onClick={() => handleRemoveSaved(workout)}
                  aria-label="Remove from Saved"
                  title="Remove from Saved"
                  className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-red-500/40 bg-black/80 text-base font-bold text-red-400 shadow-lg transition hover:bg-red-500 hover:text-white sm:right-3 sm:top-3 sm:h-9 sm:w-9"
                >
                  ✕
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default SavePage;
