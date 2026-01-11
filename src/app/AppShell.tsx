import { Flex } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";
import { NotesLayout } from "../components/NotesLayout";
import type { NotesStore } from "../features/notes/notes.store";

type Props = {
  store: NotesStore;
};

export function AppShell({ store }: Props) {
  return (
    <Flex h="100vh" w="100vw">
      <Sidebar store={store} />
      <NotesLayout store={store} />
    </Flex>
  );
}
