import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { NotesStore } from "../features/notes/notes.store";
import { formatRelativeTime } from "../features/notes/notes.utils";
import type { Note } from "../features/notes/notes.types";
import { useI18n } from "../i18n/useI18n";
import { RichTextEditor } from "./RichTextEditor";

type Props = { store: NotesStore };
type NotePatch = Partial<Pick<Note, "title" | "content" | "tags">>;

function normalizeTag(tag: string) {
  return tag.trim().replace(/\s+/g, " ");
}

function debounce<Args extends readonly unknown[]>(
  fn: (...args: Args) => void,
  wait = 350
) {
  let t: number | undefined;

  const debounced = (...args: Args) => {
    window.clearTimeout(t);
    t = window.setTimeout(() => fn(...args), wait);
  };

  debounced.cancel = () => window.clearTimeout(t);

  return debounced;
}

export function NoteEditor({ store }: Props) {
  const { t } = useI18n();
  const note = store.selected;

  if (!note) {
    return (
      <Box flex="1" p={6} bg="background">
        <Text variant="muted">{t("selectOrCreate")}</Text>
      </Box>
    );
  }

  return <NoteEditorInner key={note.id} store={store} note={note} />;
}

type InnerProps = { store: NotesStore; note: Note };

function NoteEditorInner({ store, note }: InnerProps) {
  const { t } = useI18n();
  const isTrash = store.state.view === "trash";

  const [title, setTitle] = useState(note.title ?? "");
  const [content, setContent] = useState(note.content ?? "");
  const [tags, setTags] = useState<string[]>(note.tags ?? []);
  const [tagInput, setTagInput] = useState("");

  const lastSavedRef = useRef({
    title: note.title ?? "",
    content: note.content ?? "",
    tagsKey: (note.tags ?? []).join("|"),
  });

  const savePatchNow = useCallback(
    (patch: NotePatch) => {
      store.dispatch({ type: "UPDATE", payload: { id: note.id, patch } });
    },
    [store, note.id]
  );

  const savePatchDebounced = useMemo(() => {
    return debounce<[NotePatch]>((patch) => savePatchNow(patch), 350);
  }, [savePatchNow]);

  useEffect(() => {
    return () => {
      savePatchDebounced.cancel?.();
    };
  }, [savePatchDebounced]);

  function addTag(raw: string) {
    const tt = normalizeTag(raw);
    if (!tt) return;

    const exists = tags.some((x) => x.toLowerCase() === tt.toLowerCase());
    if (exists) return;

    const next = [...tags, tt];
    setTags(next);
    lastSavedRef.current.tagsKey = next.join("|");
    savePatchNow({ tags: next });
  }

  function removeTag(tag: string) {
    const next = tags.filter((tt) => tt !== tag);
    setTags(next);
    lastSavedRef.current.tagsKey = next.join("|");
    savePatchNow({ tags: next });
  }

  const timeText = formatRelativeTime(note.updatedAt, t);

  return (
    <Box flex="1" p={6} bg="background" display="flex" flexDir="column" gap={4}>
      <Flex justify="space-between" align="flex-start" gap={4} flexWrap="wrap">
        <VStack align="start" spacing={2} flex="1" minW="260px">
          {isTrash ? (
            <Text fontSize="2xl" fontWeight="bold">
              {note.title || t("untitled")}
            </Text>
          ) : (
            <Editable
              value={title}
              onChange={(next) => {
                setTitle(next);
                const normalized = next.trim() || t("untitled");
                if (lastSavedRef.current.title === normalized) return;
                lastSavedRef.current.title = normalized;
                savePatchDebounced({ title: normalized });
              }}
              submitOnBlur
              selectAllOnFocus
              onSubmit={(next) => {
                const normalized = next.trim() || t("untitled");
                setTitle(normalized);
                lastSavedRef.current.title = normalized;
                savePatchNow({ title: normalized });
              }}
            >
              <EditablePreview
                fontSize="2xl"
                fontWeight="bold"
                lineHeight="short"
                py={1}
                px={2}
                borderRadius="md"
                bg="transparent"
                _hover={{ bg: "surface" }}
              />
              <EditableInput
                fontSize="2xl"
                fontWeight="bold"
                lineHeight="short"
                py={1}
                px={2}
                borderRadius="md"
                border="1px solid"
                borderColor="border"
                bg="surface"
                _focusVisible={{
                  outline: "none",
                  boxShadow: "0 0 0 1px var(--chakra-colors-primary)",
                }}
              />
            </Editable>
          )}

          <HStack spacing={2} flexWrap="wrap">
            {note.archived && !note.deletedAt && (
              <Badge variant="brand" fontSize="0.7rem">
                {t("statusArchived")}
              </Badge>
            )}
            {note.deletedAt && (
              <Badge variant="accent" fontSize="0.7rem">
                {t("statusTrash")}
              </Badge>
            )}
          </HStack>
        </VStack>

        <HStack spacing={2} align="center">
          {!isTrash && (
            <Button
              variant="outline"
              onClick={() =>
                store.dispatch({
                  type: "ARCHIVE_TOGGLE",
                  payload: { id: note.id },
                })
              }
            >
              {note.archived ? t("unarchive") : t("archiveNote")}
            </Button>
          )}

          {!isTrash ? (
            <Button
              variant="danger"
              onClick={() =>
                store.dispatch({
                  type: "SOFT_DELETE",
                  payload: { id: note.id },
                })
              }
            >
              {t("deleteNote")}
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() =>
                  store.dispatch({ type: "RESTORE", payload: { id: note.id } })
                }
              >
                {t("restore")}
              </Button>

              <Button
                variant="danger"
                onClick={() =>
                  store.dispatch({
                    type: "DELETE_PERMANENT",
                    payload: { id: note.id },
                  })
                }
              >
                {t("deleteForever")}
              </Button>
            </>
          )}
        </HStack>
      </Flex>

      {isTrash ? (
        <Box
          border="1px solid"
          borderColor="border"
          bg="surface"
          borderRadius="md"
          p={4}
        >
          <Box
            className="note-preview"
            dangerouslySetInnerHTML={{
              __html: note.content || `<p>${t("noContentYet")}</p>`,
            }}
          />
        </Box>
      ) : (
        <RichTextEditor
          value={content}
          onChange={(html) => {
            setContent(html);
            if (lastSavedRef.current.content === html) return;
            lastSavedRef.current.content = html;
            savePatchDebounced({ content: html });
          }}
          placeholder={t("contentPlaceholder")}
          minH="260px"
          maxH="67vh"
        />
      )}

      <Flex
        justify="space-between"
        align="center"
        gap={3}
        flexWrap="wrap"
        pt={2}
      >
        <HStack spacing={2} wrap="wrap" align="center" flex="1" minW="260px">
          <Text fontSize="sm" variant="muted">
            {t("tags")}
          </Text>

          {tags.map((tag) => (
            <Tag key={tag} variant="subtle">
              <TagLabel>{tag}</TagLabel>
              {!isTrash && <TagCloseButton onClick={() => removeTag(tag)} />}
            </Tag>
          ))}

          {!isTrash && (
            <Box minW="160px" flex="1" maxW="360px">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder={t("addTagPlaceholder")}
                variant="unstyled"
                w="100%"
                px={2}
                py={1}
                borderRadius="md"
                bg="transparent"
                _hover={{ bg: "surface" }}
                _focus={{
                  bg: "surface",
                  boxShadow: "0 0 0 1px var(--chakra-colors-primary)",
                }}
                sx={{
                  overflow: "visible",
                  textOverflow: "clip",
                  whiteSpace: "nowrap",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    if (tagInput.trim()) {
                      addTag(tagInput);
                      setTagInput("");
                    }
                    return;
                  }

                  if (e.key === "Backspace" && !tagInput && tags.length) {
                    const next = tags.slice(0, -1);
                    setTags(next);
                    lastSavedRef.current.tagsKey = next.join("|");
                    savePatchNow({ tags: next });
                  }
                }}
                onBlur={() => {
                  if (tagInput.trim()) {
                    addTag(tagInput);
                    setTagInput("");
                  }
                }}
              />
            </Box>
          )}
        </HStack>

        <Text fontSize="sm" variant="muted" whiteSpace="nowrap">
          {t("lastEdited", { time: timeText })}
        </Text>
      </Flex>
    </Box>
  );
}
