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

type Props = {
  store: NotesStore;
};

function normalizeTag(tag: string) {
  return tag.trim().replace(/\s+/g, " ");
}

export function NoteEditor({ store }: Props) {
  const note = store.selected;

  if (!note) {
    return (
      <Box flex="1" p={6} bg="background">
        <Text variant="muted">Select a note or create a new one.</Text>
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
      noteTags.every((t, i) => t === tags[i]);

    return !(sameTitle && sameContent && sameTags);
  }, [note, title, content, tags]);

  function addTag(raw: string) {
    const t = normalizeTag(raw);
    if (!t) return;

    const exists = tags.some((x) => x.toLowerCase() === t.toLowerCase());
    if (exists) return;

    setTags((prev) => [...prev, t]);
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  function onSave() {
    store.dispatch({
      type: "UPDATE",
      payload: {
        id: note.id,
        patch: {
          title: title.trim() || "Untitled",
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

  return (
    <Box flex="1" p={6} bg="background">
      <Flex justify="space-between" mb={6} gap={6}>
        <VStack align="start" spacing={2} flex="1">
          {isEditing ? (
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
          ) : (
            <Text fontSize="2xl" fontWeight="bold">
              {note.title || "Untitled"}
            </Text>
          )}

          <VStack align="start" spacing={2} w="100%">
            <Text fontSize="sm" variant="muted">
              Tags
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
                  placeholder="Add tag and press Enter"
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
            Last edited: {formatRelativeTime(note.updatedAt)}
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
              {note.archived ? "Unarchive" : "Archive note"}
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
              Delete note
            </Button>
          ) : (
            <>
              <Button
                onClick={() =>
                  store.dispatch({ type: "RESTORE", payload: { id: note.id } })
                }
              >
                Restore
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
                Delete forever
              </Button>
            </>
          )}
        </VStack>
      </Flex>

      {isEditing ? (
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note..."
          minH="280px"
        />
      ) : (
        <Text color="neutral.800" mb={10} whiteSpace="pre-wrap">
          {note.content || "No content yet."}
        </Text>
      )}

      <Flex gap={3} mt={6}>
        {!isTrash && !isEditing && (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        )}

        {!isTrash && isEditing && (
          <>
            <Button onClick={onSave} isDisabled={!hasChanges}>
              Save
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </>
        )}
      </Flex>
    </Box>
  );
}
