import { Box, Text, HStack, Badge, VStack } from "@chakra-ui/react";
import type { Note } from "../features/notes/notes.types";
import { formatRelativeTime } from "../features/notes/notes.utils";
import { useI18n } from "../i18n/useI18n";

type NoteCardProps = {
  note: Note;
  isActive?: boolean;
  onSelect: (id: string) => void;
};

export function NoteCard({ note, isActive = false, onSelect }: NoteCardProps) {
  const { t } = useI18n();

  const isArchived = note.archived && !note.deletedAt;
  const isTrash = !!note.deletedAt;

  return (
    <Box
      p={3}
      borderRadius="md"
      bg={isActive ? "surface" : "transparent"}
      _hover={{ bg: "neutral.100" }}
      cursor="pointer"
      onClick={() => onSelect(note.id)}
      border="1px solid"
      borderColor={isActive ? "neutral.300" : "transparent"}
    >
      <VStack align="start" spacing={1}>
        <HStack w="100%" justify="space-between">
          <Text fontWeight="medium" noOfLines={1}>
            {note.title || t("untitled")}
          </Text>

          {isArchived && (
            <Badge variant="brand" fontSize="0.65rem">
              {t("statusArchived")}
            </Badge>
          )}

          {isTrash && (
            <Badge variant="accent" fontSize="0.65rem">
              {t("statusTrash")}
            </Badge>
          )}
        </HStack>

        {note.tags.length > 0 && (
          <HStack spacing={1} wrap="wrap">
            {note.tags.map((tag) => (
              <Badge key={tag} variant="subtle">
                {tag}
              </Badge>
            ))}
          </HStack>
        )}

        <Text fontSize="xs" color="neutral.700">
          {formatRelativeTime(note.updatedAt, t)}
        </Text>
      </VStack>
    </Box>
  );
}
