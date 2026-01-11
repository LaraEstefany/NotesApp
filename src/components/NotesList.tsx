import { Box, Button, VStack, Text } from "@chakra-ui/react";
import { NoteCard } from "./NoteCard";
import type { NotesStore } from "../features/notes/notes.store";
import type { Note } from "../features/notes/notes.types";

type Props = {
  store: NotesStore;
};

function createEmptyNote(): Note {
  return {
    id: crypto.randomUUID(),
    title: "Untitled",
    content: "",
    tags: [],
    archived: false,
    deletedAt: null,
    updatedAt: new Date().toISOString(),
  };
}

export function NotesList({ store }: Props) {
  return (
    <Box
      w="320px"
      borderRight="1px solid"
      borderColor="neutral.200"
      p={4}
      bg="background"
    >
      <Button
        w="100%"
        mb={4}
        onClick={() => {
          const note = createEmptyNote();
          store.dispatch({ type: "CREATE", payload: { note } });
        }}
      >
        + Create new note
      </Button>

      {store.visibleNotes.length === 0 ? (
        <Text variant="muted" fontSize="sm">
          No notes found.
        </Text>
      ) : (
        <VStack spacing={2} align="stretch">
          {store.visibleNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              isActive={note.id === store.state.selectedId}
              onSelect={(id) =>
                store.dispatch({ type: "SELECT", payload: { id } })
              }
            />
          ))}
        </VStack>
      )}
    </Box>
  );
}
