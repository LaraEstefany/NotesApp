import { Box, VStack, Text, Divider, Button } from "@chakra-ui/react";
import type { NotesStore, NotesView } from "../features/notes/notes.store";

type Props = {
  store: NotesStore;
};

export function Sidebar({ store }: Props) {
  const setView = (view: NotesView) =>
    store.dispatch({ type: "SET_VIEW", payload: { view } });

  const setTag = (tag: string | null) =>
    store.dispatch({ type: "SET_TAG", payload: { tag } });

  return (
    <Box
      w="260px"
      borderRight="1px solid"
      borderColor="neutral.200"
      p={4}
      bg="background"
    >
      <Text fontSize="xl" fontWeight="bold" mb={6}>
        📝 NotesApp
      </Text>

      <VStack align="stretch" spacing={2}>
        <Button
          variant={store.state.view === "all" ? "solid" : "ghost"}
          justifyContent="flex-start"
          onClick={() => setView("all")}
        >
          All notes
        </Button>

        <Button
          variant={store.state.view === "archived" ? "solid" : "ghost"}
          justifyContent="flex-start"
          onClick={() => setView("archived")}
        >
          Archived notes
        </Button>

        <Button
          variant={store.state.view === "trash" ? "solid" : "ghost"}
          justifyContent="flex-start"
          onClick={() => setView("trash")}
        >
          Trash
        </Button>
      </VStack>

      <Divider my={6} />

      <VStack align="stretch" spacing={2}>
        <Text fontSize="sm" color="neutral.700">
          Tags
        </Text>

        <Button
          size="sm"
          variant={store.state.tag === null ? "outline" : "ghost"}
          justifyContent="flex-start"
          onClick={() => setTag(null)}
        >
          All tags
        </Button>

        {store.allTags.length === 0 ? (
          <Text fontSize="sm" color="neutral.700">
            No tags yet
          </Text>
        ) : (
          store.allTags.map((tag) => (
            <Button
              key={tag}
              size="sm"
              variant={store.state.tag === tag ? "outline" : "ghost"}
              justifyContent="flex-start"
              onClick={() => setTag(tag)}
            >
              {tag}
            </Button>
          ))
        )}
      </VStack>
    </Box>
  );
}
