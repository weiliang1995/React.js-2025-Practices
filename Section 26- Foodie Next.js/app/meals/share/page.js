"use client";

import { useActionState } from "react";
import ImagePicker from "@/components/meals/image-picker";
import classes from "./page.module.css";
import { shareMeal } from "@/lib/actions";
import MealsFormSubmit from "@/components/meals/meals-form-submit";

export default function ShareMealPage({ meal }) {
  const [state, formAction, isPending] = useActionState(shareMeal, {
    message: null,
  });

  function isInvalidText(text) {
    return !text || text.trim() === "";
  }

  function handleSubmit(event) {
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    if (
      isInvalidText(data.name) ||
      isInvalidText(data.title) ||
      isInvalidText(data.summary) ||
      isInvalidText(data.email) ||
      isInvalidText(data.instructions) ||
      !data.image
    ) {
      event.preventDefault();
      window.alert("Invalid input, please fill in the form completely.")
    }
  }

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form
          className={classes.form}
          action={formAction}
          onSubmit={handleSubmit}
        >
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
              />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
              />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
            />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input
              type="text"
              id="summary"
              name="summary"
              required
            />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker
            label="Your image"
            name="image"
          />
          {state.message && <p>state.message</p>}
          <p className={classes.actions}>
            <MealsFormSubmit pending={isPending} />
          </p>
        </form>
      </main>
    </>
  );
}
