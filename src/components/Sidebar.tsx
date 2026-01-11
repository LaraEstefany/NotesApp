import { Box, VStack, Text, Divider, Button } from "@chakra-ui/react";
import type { NotesStore, NotesView } from "../features/notes/notes.store";
import { useI18n } from "../i18n/useI18n";

type Props = {
  store: NotesStore;
};

export function Sidebar({ store }: Props) {
  const { t } = useI18n();

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
        📝 {t("appName")}
      </Text>

      <VStack align="stretch" spacing={2}>
        <Button
          variant={store.state.view === "all" ? "solid" : "ghost"}
          justifyContent="flex-start"
          onClick={() => setView("all")}
        >
          {t("allNotes")}
        </Button>

        <Button
          variant={store.state.view === "archived" ? "solid" : "ghost"}
          justifyContent="flex-start"
          onClick={() => setView("archived")}
        >
          {t("archivedNotes")}
        </Button>

        <Button
          variant={store.state.view === "trash" ? "solid" : "ghost"}
          justifyContent="flex-start"
          onClick={() => setView("trash")}
        >
          {t("trash")}
        </Button>
      </VStack>

      <Divider my={6} />

      <VStack align="stretch" spacing={2}>
        <Text fontSize="sm" color="neutral.700">
          {t("tags")}
        </Text>

        <Button
          size="sm"
          variant={store.state.tag === null ? "outline" : "ghost"}
          justifyContent="flex-start"
          onClick={() => setTag(null)}
        >
          {t("allTags")}
        </Button>

        {store.allTags.length === 0 ? (
          <Text fontSize="sm" color="neutral.700">
            {t("noTagsYet")}
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
