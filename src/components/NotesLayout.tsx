import { Flex } from "@chakra-ui/react";
import { NotesHeader } from "./NotesHeader";
import { NotesList } from "./NotesList";
import { NoteEditor } from "./NoteEditor";
import type { NotesStore } from "../features/notes/notes.store";

type Props = {
  store: NotesStore;
};

export function NotesLayout({ store }: Props) {
  return (
    <Flex direction="column" flex="1">
      <NotesHeader store={store} />

      <Flex flex="1">
        <NotesList store={store} />
        <NoteEditor store={store} />
      </Flex>
    </Flex>
  );
}
