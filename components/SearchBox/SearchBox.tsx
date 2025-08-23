import css from "./SearchBox.module.css";
import { ChangeEvent } from "react";

interface SearchBoxProps {
  value: string;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

export function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      onChange={onChange}
      type="text"
      value={value}
      placeholder="Search notes"
    />
  );
}
