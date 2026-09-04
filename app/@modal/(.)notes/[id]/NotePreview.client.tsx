"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from "./NotePreview.module.css";

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
    >
      <div className={css.content}>
        <button
          onClick={handleClose}
          className={css.closeButton}
          aria-label="Close modal"
        >
          &times;
        </button>

        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {note && (
          <>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.text}>{note.content}</p>
            <span className={css.tag}>{note.tag}</span>
            {note.createdAt && (
              <p className={css.date}>
                {new Date(note.createdAt).toLocaleDateString()}
              </p>
            )}
          </>
        )}
      </div>
    </Modal>
  );
}
