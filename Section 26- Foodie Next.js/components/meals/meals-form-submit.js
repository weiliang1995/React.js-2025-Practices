"use client";

export default function MealsFormSubmit({pending}) {
  return <button type="submit" disabled={pending}>
    {pending ? "Submitting..." : "Share Meal"}
  </button>;
}
