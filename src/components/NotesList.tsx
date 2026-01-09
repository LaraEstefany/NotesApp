import { Box, Button, VStack } from "@chakra-ui/react";
import { NoteCard } from "./NoteCard";
import type { Note } from "../features/notes/notes.types";

const mockNotes: Note[] = [
  {
    id: "1",
    title: "Hotel Quartier Latin",
    content: "",
    tags: ["Paris", "Hotel"],
    updatedAt: new Date().toISOString(),
    archived: false,
  },
];

export function NotesList() {
  const selectedNoteId = "1";

  return (
    <Box w="320px" borderRight="1px solid" borderColor="gray.200" p={4}>
      <Button w="100%" mb={4}>
        + Create new note
      </Button>

      <VStack spacing={2} align="stretch">
        {mockNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            isActive={note.id === selectedNoteId}
            onSelect={() => {}}
          />
        ))}
      </VStack>
    </Box>
  );
}
