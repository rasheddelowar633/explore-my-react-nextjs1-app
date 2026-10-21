
"use client";

import { useWorkout } from "@/Components/Context/workoutContext";
import toast from "react-hot-toast";

export default function WorkoutActions({ workout }) {
  const {
    myPlan,
    addToPlan,
    toggleSaved,
    isSaved,
    loaded,
    getWorkout,
    updateWorkoutDetails,
  } = useWorkout();

  if (!workout) return null;

  const workoutId = workout.id ?? workout._id;

  const current = getWorkout(workout);
  const duration = current?.duration ?? 25;
  const calories = current?.caloriesBurned ?? 180;

  if (!loaded) {
    return (
      <div className="mt-6 h-12 animate-pulse rounded-lg bg-gray-700" />
    );
  }

  const currentWorkout = {
    ...workout,
    duration,
    caloriesBurned: calories,
  };

  const alreadyAdded = myPlan.some(
    (item) =>
      String(item.id ?? item._id) === String(workoutId)
  );

  const saved = isSaved(workoutId);

  const updateMetrics = (newDuration, newCalories) => {
    updateWorkoutDetails({
      ...workout,
      duration: newDuration,
      caloriesBurned: newCalories,
    });
  };

  const handleSave = () => {
    toggleSaved(currentWorkout);

    toast.success(
      saved ? "Removed from saved!" : "Saved for later!"
    );
  };

  const handleAddToPlan = () => {
    if (alreadyAdded) {
      toast("Already in today's plan!");
      return;
    }

    if (myPlan.length >= 5) {
      toast.error("Your plan is full!");
      return;
    }

    addToPlan(currentWorkout);
    toast.success("Added to today's plan!");
  };

  return (
    <div className="mt-6 space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-gray-50 p-4 text-black">
          <p className="mb-3 text-sm text-gray-500">Duration</p>

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() =>
                updateMetrics(Math.max(5, duration - 5), calories)
              }
              disabled={duration <= 5}
              className="btn btn-circle btn-sm"
            >
              −
            </button>

            <p className="text-xl font-bold">{duration} min</p>

            <button
              type="button"
              onClick={() => updateMetrics(duration + 5, calories)}
              className="btn btn-circle btn-sm"
            >
              +
            </button>
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 p-4 text-black">
          <p className="mb-3 text-sm text-gray-500">Calories</p>

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() =>
                updateMetrics(duration, Math.max(0, calories - 10))
              }
              disabled={calories <= 0}
              className="btn btn-circle btn-sm"
            >
              −
            </button>

            <p className="text-xl font-bold">{calories} kcal</p>

            <button
              type="button"
              onClick={() => updateMetrics(duration, calories + 10)}
              className="btn btn-circle btn-sm"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleAddToPlan}
          disabled={alreadyAdded || myPlan.length >= 5}
          className="rounded-lg bg-[#C2F800] px-5 py-3 font-bold text-black disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {alreadyAdded
            ? "✓ Added to Plan"
            : myPlan.length >= 5
              ? "Plan Full (5/5)"
              : "+ Add Today's Plan"}
        </button>

        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg border border-white/20 px-5 py-3 font-bold text-white transition hover:border-[#C2F800] hover:text-[#C2F800]"
        >
          {saved ? "♥ Saved (Remove)" : "♡ Save for Later"}
        </button>
      </div>
    </div>
  );
}
