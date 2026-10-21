
"use client";

import Link from "next/link";
import { toast } from "react-toastify";

const WorkoutCard = ({ workout }) => {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="block"
      onClick={() => toast.success("Opening workout details!")}
    >
      <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Workout Image */}
        <div className="relative overflow-hidden">
          <img
            src={workout.image}
            alt={workout.name}
            className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {/* Difficulty Badge */}
          <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-gray-900 shadow">
            {workout.difficulty}
          </span>
        </div>

        {/* Workout Information */}
        <div className="space-y-4 p-5">
          {/* Muscle Groups */}
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-lime-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-lime-800"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Workout Name */}
          <h2 className="text-2xl font-black tracking-tight text-gray-900">
            {workout.name}
          </h2>

          {/* Equipment */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-lg">🏋️</span>
            <span>{workout.equipment}</span>
          </div>

          {/* Duration, Calories, Rating */}
          <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
            <div className="rounded-lg bg-gray-50 p-3 text-center">
              <p className="text-sm font-bold text-gray-900">
                ⏱️ {workout.duration} min
              </p>
              <p className="mt-1 text-xs text-gray-500">Duration</p>
            </div>

            <div className="rounded-lg bg-gray-50 p-3 text-center">
              <p className="text-[13px] font-bold text-gray-900">
                🔥 {workout.caloriesBurned ?? 120} kcal
              </p>
              <p className="mt-1 text-xs text-gray-500">Calories</p>
            </div>

            <div className="rounded-lg bg-gray-50 p-3 text-center">
              <p className="text-sm font-bold text-gray-900">
                ⭐ {workout.rating}
              </p>
              <p className="mt-1 text-xs text-gray-500">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
