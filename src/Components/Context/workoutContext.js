
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WorkoutContext = createContext(null);

const getWorkoutId = (workout) => {
  const id = workout?.id ?? workout?._id;
  return id == null ? null : String(id);
};

export function WorkoutProvider({ children }) {
  const [myPlan, setMyPlan] = useState([]);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [customWorkouts, setCustomWorkouts] = useState({});
  const [loaded, setLoaded] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const plan = JSON.parse(
          localStorage.getItem("fitlog-plan") || "[]"
        );

        const saved = JSON.parse(
          localStorage.getItem("fitlog-saved") || "[]"
        );

        const custom = JSON.parse(
          localStorage.getItem("fitlog-custom") || "{}"
        );

        setMyPlan(Array.isArray(plan) ? plan : []);
        setSavedWorkouts(Array.isArray(saved) ? saved : []);
        setCustomWorkouts(
          custom && typeof custom === "object" && !Array.isArray(custom)
            ? custom
            : {}
        );
      } catch (error) {
        console.error("Failed to load FitLog data:", error);
      } finally {
        setLoaded(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  // Save data whenever state changes
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(myPlan));
    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(savedWorkouts)
    );
    localStorage.setItem(
      "fitlog-custom",
      JSON.stringify(customWorkouts)
    );
  }, [myPlan, savedWorkouts, customWorkouts, loaded]);

  const getWorkout = (workout) => {
    if (!workout) return workout;

    const id = getWorkoutId(workout);
    return {
      ...workout,
      ...(id ? customWorkouts[id] || {} : {}),
    };
  };

  // Save or remove a workout
  const toggleSaved = (workout) => {
    const id = getWorkoutId(workout);
    if (id === null) {
      console.error("Cannot save workout: missing id", workout);
      return;
    }

    const updatedWorkout = getWorkout(workout);

    setSavedWorkouts((previous) => {
      const exists = previous.some(
        (item) => getWorkoutId(item) === id
      );

      if (exists) {
        return previous.filter(
          (item) => getWorkoutId(item) !== id
        );
      }

      return [...previous, updatedWorkout];
    });
  };

  const isSaved = (id) => {
    if (id == null) return false;

    return savedWorkouts.some(
      (item) => getWorkoutId(item) === String(id)
    );
  };

  // Add a workout to today's plan
  const addToPlan = (workout) => {
    const id = getWorkoutId(workout);
    if (id === null) return;

    const updatedWorkout = getWorkout(workout);

    setMyPlan((previous) => {
      if (
        previous.some((item) => getWorkoutId(item) === id) ||
        previous.length >= 5
      ) {
        return previous;
      }

      return [...previous, updatedWorkout];
    });
  };

  const removeFromPlan = (id) => {
    setMyPlan((previous) =>
      previous.filter(
        (item) => getWorkoutId(item) !== String(id)
      )
    );
  };

  const isInPlan = (id) => {
    if (id == null) return false;

    return myPlan.some(
      (item) => getWorkoutId(item) === String(id)
    );
  };

  const updateWorkoutDetails = (workout) => {
    const id = getWorkoutId(workout);
    if (id === null) return;

    const metrics = {
      duration: workout.duration,
      caloriesBurned: workout.caloriesBurned,
    };

    setCustomWorkouts((previous) => ({
      ...previous,
      [id]: {
        ...(previous[id] || {}),
        ...metrics,
      },
    }));

    setMyPlan((previous) =>
      previous.map((item) =>
        getWorkoutId(item) === id
          ? { ...item, ...metrics }
          : item
      )
    );

    setSavedWorkouts((previous) =>
      previous.map((item) =>
        getWorkoutId(item) === id
          ? { ...item, ...metrics }
          : item
      )
    );
  };

  return (
    <WorkoutContext.Provider
      value={{
        myPlan,
        savedWorkouts,
        customWorkouts,
        loaded,
        addToPlan,
        removeFromPlan,
        toggleSaved,
        isSaved,
        isInPlan,
        getWorkout,
        updateWorkoutDetails,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      "useWorkout must be used inside WorkoutProvider"
    );
  }

  return context;
}
