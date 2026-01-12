import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { colors } from "./foundations/colors";
import { semanticTokens } from "./foundations/semanticTokens";

import { Textarea } from "./components/Textarea";
import { Tag } from "./components/Tag";
import { IconButton } from "./components/IconButton";
import { Heading } from "./components/Heading";
import { Text } from "./components/Text";
import { Divider } from "./components/Divider";
import { Modal } from "./components/Modal";
import { Menu } from "./components/Menu";
import { fonts } from "./foundations/fonts";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Badge } from "./components/Badge";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

export const theme = extendTheme({
  config,
  fonts,
  colors,
  semanticTokens,
  styles: {
    global: {
      body: {
        bg: "background",
        color: "textPrimary",
      },
    },
  },
  components: {
    Button,
    IconButton,
    Input,
    Textarea,
    Badge,
    Tag,
    Heading,
    Text,
    Divider,
    Modal,
    Menu,
  },
});
