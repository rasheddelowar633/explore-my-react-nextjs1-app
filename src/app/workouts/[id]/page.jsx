import { notFound } from "next/navigation";
import Link from "next/link";
import WorkoutActions from "@/Components/HomePage/WorkoutActions";

const getWorkoutData = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/fitlog",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return res.json();
};

export default async function WorkoutDetailsPage({ params }) {
  const { id } = await params;
  const workouts = await getWorkoutData();

  const workout = workouts.find(
    (item) => String(item.id ?? item._id) === String(id)
  );

  if (!workout) notFound();

  // Sample fallback data
  const details = {
    name: workout.name ?? "BARBELL BENCH PRESS",
    description:
      workout.description ??
      "A compound press that builds chest thickness, triceps, and pressing power from a stable bench.",
    equipment: workout.equipment ?? "Barbell, Bench",
    difficulty: workout.difficulty ?? "Intermediate",
    sets: workout.sets ?? 4,
    reps: workout.reps ?? "6-8",
    duration: workout.duration ?? 25,
    calories: workout.caloriesBurned ?? 180,
    rating: workout.rating ?? 4.8,
  };

  const muscleGroups = Array.isArray(workout.muscleGroups)
    ? workout.muscleGroups
    : ["Chest", "Arms"];

  const instructions = Array.isArray(workout.instructions)
    ? workout.instructions
    : [
        "Lie on the bench with eyes under the bar and feet planted.",
        "Unrack with locked elbows and lower the bar to mid-chest.",
        "Press up in a slight arc until elbows lock without bouncing.",
        "Keep shoulder blades pinched and a natural arch in the back.",
      ];

  const stats = [
    { label: "Equipment", value: details.equipment },
    { label: "Difficulty", value: details.difficulty },
    { label: "Sets", value: details.sets },
    { label: "Reps", value: details.reps },
    { label: "Duration", value: `${details.duration} min` },
    { label: "Calories", value: `${details.calories} kcal` },
    { label: "Rating", value: `★ ${details.rating}` },
  ];

  return (
    <main className="min-h-screen bg-[#090B0A] px-4 py-8 text-white sm:px-6 lg:py-10">
      <div className="mx-auto max-w-7xl">

        {/* Back Navigation */}
        <Link
          href="/workouts"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-[#C2F800]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10">
            ←
          </span>
          Back to Workouts
        </Link>

        {/* Main Details Layout */}
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#111412] shadow-2xl">
          <div className="h-1 bg-gradient-to-r from-transparent via-[#C2F800] to-transparent" />

          <div className="grid grid-cols-1 items-start gap-0 md:grid-cols-2">

            {/* LEFT: Workout Image */}
            <div className="p-3 sm:p-5 md:sticky md:top-6">
              <div className="group relative min-h-[320px] overflow-hidden rounded-2xl bg-[#191D1A] sm:min-h-[450px] md:min-h-[600px]">
                {workout.image ? (
                  <img
                    src={workout.image}
                    alt={details.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    No workout image available
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/20" />

                <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur-md">
                  FitLog Training
                </span>

               
              </div>
            </div>

            {/* RIGHT: Workout Details */}
            <div className="min-w-0 p-4 sm:p-6 lg:p-8">

              {/* Heading */}
              <header className="mb-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#C2F800]" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C2F800]">
                    Workout Details
                  </p>
                </div>

                <h1 className="break-words text-2xl font-black uppercase leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                  {details.name}
                </h1>

                <p className="mt-4 text-sm leading-7 text-gray-400">
                  {details.description}
                </p>
              </header>

              {/* Muscle Groups */}
              <section className="mb-6 border-y border-white/10 py-5">
                <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                  Target Muscle Groups
                </h2>

                <div className="flex flex-wrap gap-2">
                  {muscleGroups.map((muscle) => (
                    <span
                      key={muscle}
                      className="rounded-lg border border-[#C2F800]/20 bg-[#C2F800]/[0.07] px-3 py-2 text-xs font-semibold text-[#C2F800]"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </section>

                {/* Instructions */}

              <section className="h-[400px] mb-6">
                <div className="mb-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C2F800]">
                    Technique Guide
                  </p>

                  <h2 className="text-2xl font-black">
                    Instructions
                  </h2>

                  <p className="mt-2 text-xs leading-6 text-gray-500">
                    Follow each step and focus on proper form.
                  </p>
                </div>

                <ol className="space-y-3">
                  {instructions.map((instruction, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition hover:border-[#C2F800]/25"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#C2F800]/20 bg-[#C2F800]/[0.08] text-xs font-black text-[#C2F800]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="min-w-0 pt-1 text-sm leading-6 text-gray-300">
                        {instruction}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Training Overview */}
              <section className="h-[200px] mb-6 overflow-hidden rounded-2xl border border-white/10 bg-[#171A18]">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
                  <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-300">
                    Training Overview
                  </h2>
                  <span className="text-xs font-semibold text-[#C2F800]">
                    {stats.length} Metrics
                  </span>
                </div>

                <div className="grid  sm:grid-cols-3">
                  {stats.map((stat, index) => (
                    <div
                      key={stat.label}
                      className={`min-w-0 border-white/10 p-4 ${
                        index % 2 === 0 ? "border-r" : ""
                      } ${
                        index < stats.length - 2 ? "border-b" : ""
                      } sm:border-b sm:border-r ${
                        index % 3 === 2 ? "sm:border-r-0" : ""
                      } ${
                        index >= stats.length - 3 ? "sm:border-b-0" : ""
                      }`}
                    >
                      <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-gray-500">
                        {stat.label}
                      </p>

                      <p className="break-words text-sm font-bold text-white sm:text-base">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

            
              

              {/* Add to Plan and Save */}
              <section className="rounded-2xl border border-[#C2F800]/20 bg-[#C2F800]/[0.05] p-4 sm:p-5">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                  Manage Your Workout
                </p>

                <WorkoutActions workout={workout} />
              </section>
            </div>
          </div>
        </section>

        <footer className="py-6 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">
            FITLOG — Train Hard. Track Progress.
          </p>
        </footer>
      </div>
    </main>
  );
}