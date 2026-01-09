import { Box, Text, HStack, Badge, VStack } from "@chakra-ui/react";
import type { Note } from "../features/notes/notes.types";
import { formatRelativeTime } from "../features/notes/notes.utils";

type NoteCardProps = {
  note: Note;
  isActive?: boolean;
  onSelect: (id: string) => void;
};

export function NoteCard({ note, isActive = false, onSelect }: NoteCardProps) {
  return (
    <Box
      p={3}
      borderRadius="md"
      bg={isActive ? "gray.100" : "transparent"}
      _hover={{ bg: "gray.50" }}
      cursor="pointer"
      onClick={() => onSelect(note.id)}
      border="1px solid"
      borderColor={isActive ? "gray.300" : "transparent"}
    >
      <VStack align="start" spacing={1}>
        <Text fontWeight="medium" noOfLines={1}>
          {note.title}
        </Text>

        <HStack spacing={1} wrap="wrap">
          {note.tags.map((tag) => (
            <Badge key={tag} fontSize="0.7rem">
              {tag}
            </Badge>
          ))}
        </HStack>

        <Text fontSize="xs" color="gray.500">
          {formatRelativeTime(note.updatedAt)}
        </Text>
      </VStack>
    </Box>
  );
}
