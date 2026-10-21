"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import { useWorkout } from "@/Components/Context/workoutContext";

const SavePage = () => {
  const {
    savedWorkouts = [],
    toggleSaved,
    loaded,
  } = useWorkout();

  const handleRemoveSaved = (workout) => {
    toggleSaved(workout);

    toast.success(
      `${workout.name || "Workout"} সেভ করা তালিকা থেকে মুছে ফেলা হয়েছে!`,
      {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      }
    );
  };

  if (!loaded) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading saved workouts...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 py-10 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-[#C2F800] text-sm font-bold tracking-widest uppercase">
              Your Collection
            </p>

            <h1 className="text-3xl md:text-5xl font-black mt-2">
              SAVED WORKOUTS
            </h1>

            <p className="text-gray-400 mt-3">
              Your favorite workouts, saved for later.
            </p>
          </div>

          <Link
            href="/workouts"
            className="inline-flex items-center justify-center bg-[#C2F800] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#d6ff33] transition"
          >
            Browse Workouts
          </Link>
        </div>

        {/* Saved Workout Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Saved workouts:{" "}
            <span className="text-[#C2F800] font-bold">
              {savedWorkouts.length}
            </span>
          </p>
        </div>

        {/* Empty State */}
        {savedWorkouts.length === 0 ? (
          <div className="border border-gray-800 rounded-2xl p-10 md:p-16 text-center">
            <h2 className="text-2xl font-bold mb-3">
              No Saved Workouts
            </h2>

            <p className="text-gray-400 mb-6">
              Save your favorite workouts and they will appear here.
            </p>

            <Link
              href="/workouts"
              className="inline-block bg-[#C2F800] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#d6ff33] transition"
            >
              Explore Workouts
            </Link>
          </div>
        ) : (
          /* Workout Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden hover:border-[#C2F800] transition"
              >
                {/* Image */}
                <Link href={`/workouts/${workout.id}`}>
                  <div className="h-52 overflow-hidden">
                    <img
                      src={workout.image}
                      alt={workout.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                </Link>

                {/* Card Content */}
                <div className="p-5">
                  <h2 className="text-xl font-bold mb-3">
                    {workout.name}
                  </h2>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {workout.muscleGroups?.map((muscle, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-5">
                    <span>
                      {workout.duration || "N/A"} min
                    </span>

                    <span>
                      {workout.caloriesBurned || 0} calories
                    </span>
                  </div>

                  {/* Remove Saved Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveSaved(workout)}
                    className="w-full bg-[#C2F800] text-black font-bold py-3 rounded-lg hover:bg-[#d6ff33] transition"
                  >
                    Remove from Saved
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default SavePage;