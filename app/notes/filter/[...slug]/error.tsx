// app/notes/error.tsx
"use client";
import css from "./error.module.css";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <div className={css.container}>
      <h2>An error occurred while loading the notes</h2>
      <p className={css.text}>{error.message}</p>
      <button className={css.reset} onClick={reset}>
        Please retry
      </button>
    </div>
  );
};

export default Error;
