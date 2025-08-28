"use client";

import { useId, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api/clientApi";
import { NewNoteData } from "@/lib/store/noteStore";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";

export type NoteFormProps = {
  onClose?: () => void;
};

const NoteFormClient = () => {
  const router = useRouter();
  return <NoteForm onClose={() => router.back()} />;
};

export default NoteFormClient;

export function NoteForm({ onClose }: NoteFormProps) {
  const fieldId = useId();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const [formValues, setFormValues] = useState<NewNoteData>(draft);

  useEffect(() => {
    setFormValues(draft);
  }, [draft]);

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      onClose?.();
      toast.success(`Note "${data.title}" created.`);
    },
    onError: () => {
      toast.error("Failed to create note.");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    let updated;
    if (name === "tag") {
      updated = { ...formValues, [name]: value as NoteTag };
    } else {
      updated = { ...formValues, [name]: value };
    }
    setFormValues(updated);
    setDraft(updated as typeof formValues);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formValues);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          value={formValues.title}
          onChange={handleChange}
          className={css.input}
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          value={formValues.content}
          onChange={handleChange}
          className={css.textarea}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          value={formValues.tag}
          onChange={handleChange}
          className={css.select}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={onClose}
          className={css.cancelButton}
          disabled={mutation.isPending}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Submitting..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
