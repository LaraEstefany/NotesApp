import { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minH?: string | number;
  maxH?: string | number;
  isDisabled?: boolean;
};

const EMOJIS = [
  "😀",
  "😊",
  "😂",
  "😍",
  "🤔",
  "😎",
  "😭",
  "🔥",
  "✨",
  "✅",
  "📌",
  "📝",
  "❤️",
  "🎉",
];

function sizeToCss(v?: string | number) {
  if (v == null) return undefined;
  return typeof v === "number" ? `${v}px` : v;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your note...",
  minH = "280px",
  maxH = "55vh",
  isDisabled,
}: Props) {
  const lastHtmlRef = useRef<string>(value);
  const [isFocused, setIsFocused] = useState(false);

  const editor = useEditor({
    editable: !isDisabled,
    extensions: [
      StarterKit.configure({}),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        "data-placeholder": placeholder,
        style: `min-height:${sizeToCss(minH) ?? "280px"}; outline:none;`,
      },
      handleDOMEvents: {
        focus: () => {
          setIsFocused(true);
          return false;
        },
        blur: () => {
          setIsFocused(false);
          return false;
        },
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
      lastHtmlRef.current = html;
      onChange(html);
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value === lastHtmlRef.current) return;

    editor.commands.setContent(value || "", { emitUpdate: false });
    lastHtmlRef.current = value || "";
  }, [value, editor]);

  const can = useMemo(() => {
    if (!editor) return null;
    return {
      bold: editor.can().toggleBold(),
      italic: editor.can().toggleItalic(),
      underline: editor.can().toggleUnderline(),
      strike: editor.can().toggleStrike(),
      taskList: editor.can().toggleTaskList(),
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <Box>
      <HStack
        mb={2}
        flexWrap="wrap"
        gap={2}
        justify="flex-start"
        align="center"
      >
        <ButtonGroup size="sm" isAttached variant="outline">
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            isDisabled={isDisabled || !can?.bold}
            variant={editor.isActive("bold") ? "solid" : "outline"}
          >
            B
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isDisabled={isDisabled || !can?.italic}
            variant={editor.isActive("italic") ? "solid" : "outline"}
          >
            I
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isDisabled={isDisabled || !can?.underline}
            variant={editor.isActive("underline") ? "solid" : "outline"}
          >
            U
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isDisabled={isDisabled || !can?.strike}
            variant={editor.isActive("strike") ? "solid" : "outline"}
          >
            S
          </Button>
        </ButtonGroup>

        <ButtonGroup size="sm" isAttached variant="outline">
          <Button
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            isDisabled={isDisabled || !can?.taskList}
            variant={editor.isActive("taskList") ? "solid" : "outline"}
          >
            ✅ List
          </Button>
        </ButtonGroup>

        <Menu placement="bottom-start">
          <MenuButton
            as={IconButton}
            aria-label="Insert emoji"
            variant="outline"
            size="sm"
            icon={<span>😊</span>}
            isDisabled={isDisabled}
          />
          <MenuList>
            {EMOJIS.map((e) => (
              <MenuItem
                key={e}
                onClick={() => editor.chain().focus().insertContent(e).run()}
              >
                <span style={{ fontSize: "1.1rem" }}>{e}</span>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </HStack>

      <Box
        bg={isFocused ? "surface" : "transparent"}
        border="1px solid"
        borderColor={"border"}
        borderRadius="md"
        px={3}
        py={2}
        transition="all 120ms ease"
        _hover={{
          borderColor: isFocused ? "border" : "neutral.200",
          bg: isFocused ? "surface" : "transparent",
        }}
        _focusWithin={{
          borderColor: "primary",
          boxShadow: "0 0 0 1px var(--chakra-colors-primary)",
          bg: "surface",
        }}
        maxH={sizeToCss(maxH)}
        overflowY="auto"
      >
        <EditorContent editor={editor} />
      </Box>

      <style>
        {`
          .ProseMirror {
            white-space: pre-wrap;
            word-break: break-word;
            color: var(--chakra-colors-textPrimary);
          }

          .ProseMirror p { margin: 0.35rem 0; }
          .ProseMirror ul, .ProseMirror ol { padding-left: 1.25rem; }

          .ProseMirror [data-placeholder]:first-child:empty::before {
            content: attr(data-placeholder);
            float: left;
            color: var(--chakra-colors-placeholder);
            pointer-events: none;
            height: 0;
          }

          .ProseMirror ul[data-type="taskList"] {
            list-style: none;
            padding-left: 0;
            margin: 0.35rem 0;
          }

          .ProseMirror li:has(> label[contenteditable="false"]) {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            margin: 0.25rem 0;
          }

          .ProseMirror li:has(> label[contenteditable="false"]) > label {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            padding: 0;
            flex: 0 0 auto;
          }

          .ProseMirror li:has(> label[contenteditable="false"]) input[type="checkbox"] {
            width: 1.05rem;
            height: 1.05rem;
            margin: 0;
            accent-color: var(--chakra-colors-primary);
            cursor: pointer;
          }

          .ProseMirror li:has(> label[contenteditable="false"]) > div {
            flex: 1;
            min-width: 0;
          }

          .ProseMirror li:has(> label[contenteditable="false"]) p {
            margin: 0;
          }

          .ProseMirror li[data-checked="true"] > div {
            text-decoration: line-through;
            color: var(--chakra-colors-neutral-600);
          }
        `}
      </style>
    </Box>
  );
}
