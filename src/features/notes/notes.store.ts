import { useEffect, useMemo, useReducer } from "react";
import type React from "react";
import type { Note } from "./notes.types";

export type NotesView = "all" | "archived" | "trash";

export type NotesState = {
  notes: Note[];
  selectedId: string | null;
  query: string;
  tag: string | null;
  view: NotesView;
};

export type NotesAction =
  | { type: "SELECT"; payload: { id: string | null } }
  | { type: "SET_QUERY"; payload: { query: string } }
  | { type: "SET_TAG"; payload: { tag: string | null } }
  | { type: "SET_VIEW"; payload: { view: NotesView } }
  | { type: "CREATE"; payload: { note: Note } }
  | {
      type: "UPDATE";
      payload: {
        id: string;
        patch: Partial<Pick<Note, "title" | "content" | "tags">>;
      };
    }
  | { type: "ARCHIVE_TOGGLE"; payload: { id: string } }
  | { type: "SOFT_DELETE"; payload: { id: string } }
  | { type: "RESTORE"; payload: { id: string } }
  | { type: "DELETE_PERMANENT"; payload: { id: string } };

export type NotesStore = {
  state: NotesState;
  dispatch: React.Dispatch<NotesAction>;
  selected: Note | null;
  visibleNotes: Note[];
  allTags: string[];
};

const STORAGE_KEY = "notesapp:v1";

function reducer(state: NotesState, action: NotesAction): NotesState {
  switch (action.type) {
    case "SELECT":
      return { ...state, selectedId: action.payload.id };

    case "SET_QUERY":
      return { ...state, query: action.payload.query };

    case "SET_TAG":
      return { ...state, tag: action.payload.tag };

    case "SET_VIEW":
      return {
        ...state,
        view: action.payload.view,
        selectedId: null,
        query: "",
        tag: null,
      };

    case "CREATE":
      return {
        ...state,
        notes: [action.payload.note, ...state.notes],
        selectedId: action.payload.note.id,
        view: "all",
      };

    case "UPDATE":
      return {
        ...state,
        notes: state.notes.map((n) =>
          n.id === action.payload.id
            ? {
                ...n,
                ...action.payload.patch,
                updatedAt: new Date().toISOString(),
              }
            : n
        ),
      };

    case "ARCHIVE_TOGGLE":
      return {
        ...state,
        notes: state.notes.map((n) =>
          n.id === action.payload.id
            ? {
                ...n,
                archived: !n.archived,
                updatedAt: new Date().toISOString(),
              }
            : n
        ),
      };

    case "SOFT_DELETE":
      return {
        ...state,
        notes: state.notes.map((n) =>
          n.id === action.payload.id
            ? {
                ...n,
                deletedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }
            : n
        ),
        selectedId:
          state.selectedId === action.payload.id ? null : state.selectedId,
      };

    case "RESTORE":
      return {
        ...state,
        notes: state.notes.map((n) =>
          n.id === action.payload.id
            ? { ...n, deletedAt: null, updatedAt: new Date().toISOString() }
            : n
        ),
      };

    case "DELETE_PERMANENT":
      return {
        ...state,
        notes: state.notes.filter((n) => n.id !== action.payload.id),
        selectedId:
          state.selectedId === action.payload.id ? null : state.selectedId,
      };

    default:
      return state;
  }
}

function safeParseNotes(raw: string | null): Note[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((x): x is Note => {
        if (!x || typeof x !== "object") return false;
        const n = x as Partial<Note>;
        return (
          typeof n.id === "string" &&
          typeof n.title === "string" &&
          typeof n.content === "string" &&
          Array.isArray(n.tags) &&
          typeof n.updatedAt === "string" &&
          typeof n.archived === "boolean"
        );
      })
      .map((n) => ({ ...n, deletedAt: n.deletedAt ?? null }));
  } catch {
    return [];
  }
}

function initState(): NotesState {
  const notes = safeParseNotes(localStorage.getItem(STORAGE_KEY));

  const firstVisible =
    notes.find((n) => !n.deletedAt && !n.archived) ??
    notes.find((n) => !n.deletedAt) ??
    null;

  return {
    notes,
    selectedId: firstVisible?.id ?? null,
    query: "",
    tag: null,
    view: "all",
  };
}

export function useNotesStore(): NotesStore {
  const [state, dispatch] = useReducer(
    reducer,
    undefined as unknown as NotesState,
    initState
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.notes));
  }, [state.notes]);

  const selected = useMemo(
    () => state.notes.find((n) => n.id === state.selectedId) ?? null,
    [state.notes, state.selectedId]
  );

  const visibleNotes = useMemo(() => {
    const normalizedQuery = state.query.trim().toLowerCase();

    const matchesQuery = (n: Note) =>
      !normalizedQuery ||
      n.title.toLowerCase().includes(normalizedQuery) ||
      n.content.toLowerCase().includes(normalizedQuery) ||
      n.tags.some((t) => t.toLowerCase().includes(normalizedQuery));

    const matchesTag = (n: Note) => !state.tag || n.tags.includes(state.tag);

    const byView = (n: Note) => {
      if (state.view === "trash") return !!n.deletedAt;
      if (state.view === "archived") return !n.deletedAt && n.archived;
      return !n.deletedAt && !n.archived;
    };

    return state.notes.filter(
      (n) => byView(n) && matchesQuery(n) && matchesTag(n)
    );
  }, [state.notes, state.query, state.tag, state.view]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    state.notes
      .filter((n) => !n.deletedAt)
      .forEach((n) => n.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [state.notes]);

  return { state, dispatch, selected, visibleNotes, allTags };
}
