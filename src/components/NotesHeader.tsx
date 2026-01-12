import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  HStack,
} from "@chakra-ui/react";
import type { NotesStore } from "../features/notes/notes.store";
import { useI18n } from "../i18n/useI18n";
import { LanguageMenu } from "./LanguageMenu";
import { ColorModeToggle } from "./ColorModeToggle";

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
      borderColor="border"
      bg="background"
    >
      <Text fontSize="xl" fontWeight="bold">
        {title}
      </Text>

      <HStack spacing={2}>
        <InputGroup w={{ base: "180px", md: "260px" }}>
          <InputLeftElement pointerEvents="none" opacity={0.7}>
            <span>🔎</span>
          </InputLeftElement>

          <Input
            placeholder={t("searchPlaceholder")}
            value={store.state.query}
            onChange={(e) =>
              store.dispatch({
                type: "SET_QUERY",
                payload: { query: e.target.value },
              })
            }
          />
        </InputGroup>

        <LanguageMenu />
        <ColorModeToggle />
      </HStack>
    </Flex>
  );
}
