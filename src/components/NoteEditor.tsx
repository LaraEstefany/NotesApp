import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import type { NotesStore } from "../features/notes/notes.store";
import { formatRelativeTime } from "../features/notes/notes.utils";
import type { Note } from "../features/notes/notes.types";
import { useI18n } from "../i18n/useI18n";

type Props = {
  store: NotesStore;
};

function normalizeTag(tag: string) {
  return tag.trim().replace(/\s+/g, " ");
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

type InnerProps = {
  store: NotesStore;
  note: Note;
};

function NoteEditorInner({ store, note }: InnerProps) {
  const { t } = useI18n();
  const isTrash = store.state.view === "trash";

  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(note.title ?? "");
  const [content, setContent] = useState(note.content ?? "");
  const [tags, setTags] = useState<string[]>(note.tags ?? []);
  const [tagInput, setTagInput] = useState("");

  const hasChanges = useMemo(() => {
    const sameTitle = (note.title ?? "") === title;
    const sameContent = (note.content ?? "") === content;

    const noteTags = note.tags ?? [];
    const sameTags =
      noteTags.length === tags.length &&
      noteTags.every((tt, i) => tt === tags[i]);

    return !(sameTitle && sameContent && sameTags);
  }, [note, title, content, tags]);

  function addTag(raw: string) {
    const tt = normalizeTag(raw);
    if (!tt) return;

    const exists = tags.some((x) => x.toLowerCase() === tt.toLowerCase());
    if (exists) return;

    setTags((prev) => [...prev, tt]);
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((tt) => tt !== tag));
  }

  function onSave() {
    store.dispatch({
      type: "UPDATE",
      payload: {
        id: note.id,
        patch: {
          title: title.trim() || t("untitled"),
          content,
          tags,
        },
      },
    });

    setIsEditing(false);
  }

  function onCancel() {
    setIsEditing(false);
    setTitle(note.title ?? "");
    setContent(note.content ?? "");
    setTags(note.tags ?? []);
    setTagInput("");
  }

  const timeText = formatRelativeTime(note.updatedAt, t);

  return (
    <Box flex="1" p={6} bg="background">
      <Flex justify="space-between" mb={6} gap={6}>
        <VStack align="start" spacing={2} flex="1">
          {isEditing ? (
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("titlePlaceholder")}
            />
          ) : (
            <Text fontSize="2xl" fontWeight="bold">
              {note.title || t("untitled")}
            </Text>
          )}

          <VStack align="start" spacing={2} w="100%">
            <Text fontSize="sm" variant="muted">
              {t("tags")}
            </Text>

            <HStack spacing={2} wrap="wrap">
              {(isEditing ? tags : note.tags).map((tag) => (
                <Tag key={tag} variant="subtle">
                  <TagLabel>{tag}</TagLabel>
                  {isEditing && (
                    <TagCloseButton onClick={() => removeTag(tag)} />
                  )}
                </Tag>
              ))}

              {isEditing && (
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder={t("addTagPlaceholder")}
                  size="sm"
                  w="240px"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      addTag(tagInput);
                      setTagInput("");
                    }
                  }}
                  onBlur={() => {
                    if (tagInput.trim()) {
                      addTag(tagInput);
                      setTagInput("");
                    }
                  }}
                />
              )}
            </HStack>
          </VStack>

          <Text fontSize="sm" variant="muted">
            {t("lastEdited", { time: timeText })}
          </Text>
        </VStack>

        <VStack align="stretch">
          {!isTrash && (
            <Button
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
              variant="outline"
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
        </VStack>
      </Flex>

      {isEditing ? (
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t("contentPlaceholder")}
          minH="280px"
        />
      ) : (
        <Text color="neutral.800" mb={10} whiteSpace="pre-wrap">
          {note.content || t("noContentYet")}
        </Text>
      )}

      <Flex gap={3} mt={6}>
        {!isTrash && !isEditing && (
          <Button onClick={() => setIsEditing(true)}>{t("edit")}</Button>
        )}

        {!isTrash && isEditing && (
          <>
            <Button onClick={onSave} isDisabled={!hasChanges}>
              {t("save")}
            </Button>
            <Button variant="outline" onClick={onCancel}>
              {t("cancel")}
            </Button>
          </>
        )}
      </Flex>
    </Box>
  );
}
