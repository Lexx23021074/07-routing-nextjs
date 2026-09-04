import axios from "axios";
import type { Note, NewNote } from "@/types/note";

// 1. Інтерфейс відповіді від GET /notes (згідно з ТЗ пагінації)
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// 2. Створення екземпляра Axios з авторизаційним заголовком
const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

// 3. Запит на отримання списку нотаток (з пагінацією, пошуком та тегом)
export const fetchNotes = async (
  page: number = 1,
  search: string = "",
  tag: string = "",
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    page,
    perPage: 12,
    search,
  };

  if (tag && tag.toLowerCase() !== "all") {
    params.tag = tag;
  }

  const response = await api.get<FetchNotesResponse>("/notes", { params });
  return response.data;
};

// 4. Запит на створення нотатки
export const createNote = async (noteData: NewNote): Promise<Note> => {
  const response = await api.post<Note>("/notes", noteData);
  return response.data;
};

// 5. Запит на видалення нотатки
export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};
