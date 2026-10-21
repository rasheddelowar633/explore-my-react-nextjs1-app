import WorkoutCard from "@/Components/HomePage/WorkoutCard";

const getWorkoutsData = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/fitlog",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch workout data");
  }

  return res.json();
};

const Workouts = async () => {
  const workDatas = await getWorkoutsData();

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">
        Workout Library
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {workDatas.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
};

export default Workouts;