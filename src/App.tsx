import { AppShell } from "./app/AppShell";
import { useNotesStore } from "./features/notes/notes.store";

export default function App() {
  const store = useNotesStore();
  return <AppShell store={store} />;
}
