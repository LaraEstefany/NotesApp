import { Flex, Input, Text, IconButton, HStack } from "@chakra-ui/react";
import type { NotesStore } from "../features/notes/notes.store";

type Props = {
  store: NotesStore;
};

export function NotesHeader({ store }: Props) {
  const title =
    store.state.view === "archived"
      ? "Archived Notes"
      : store.state.view === "trash"
      ? "Trash"
      : "All Notes";

  return (
    <Flex
      align="center"
      justify="space-between"
      px={6}
      py={4}
      borderBottom="1px solid"
      borderColor="neutral.200"
      bg="background"
    >
      <Text fontSize="xl" fontWeight="bold">
        {title}
      </Text>

      <HStack spacing={2}>
        <Input
          placeholder="Search..."
          w="260px"
          value={store.state.query}
          onChange={(e) =>
            store.dispatch({
              type: "SET_QUERY",
              payload: { query: e.target.value },
            })
          }
        />
        <IconButton
          aria-label="Change language"
          icon={<span>🌐</span>}
          variant="ghost"
        />
      </HStack>
    </Flex>
  );
}
