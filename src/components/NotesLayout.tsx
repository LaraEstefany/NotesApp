import { Flex } from "@chakra-ui/react";
import { NotesHeader } from "./NotesHeader";
import { NotesList } from "./NotesList";
import { NoteEditor } from "./NoteEditor";

export function NotesLayout() {
  return (
    <Flex direction="column" flex="1">
      <NotesHeader />

      <Flex flex="1">
        <NotesList />
        <NoteEditor />
      </Flex>
    </Flex>
  );
}
