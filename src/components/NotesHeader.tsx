import { Flex, Input, Text, HStack } from "@chakra-ui/react";
import type { NotesStore } from "../features/notes/notes.store";
import { useI18n } from "../i18n/useI18n";
import { LanguageMenu } from "./LanguageMenu";

type Props = {
  store: NotesStore;
};

export function NotesHeader({ store }: Props) {
  const { t } = useI18n();

  const title =
    store.state.view === "archived"
      ? t("archivedNotes")
      : store.state.view === "trash"
      ? t("trash")
      : t("allNotes");

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
          placeholder={t("searchPlaceholder")}
          w="260px"
          value={store.state.query}
          onChange={(e) =>
            store.dispatch({
              type: "SET_QUERY",
              payload: { query: e.target.value },
            })
          }
        />

        <LanguageMenu />
      </HStack>
    </Flex>
  );
}
