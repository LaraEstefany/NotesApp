import type { ComponentStyleConfig } from "@chakra-ui/react";

export const Text: ComponentStyleConfig = {
  baseStyle: {
    color: "textPrimary",
  },
  variants: {
    muted: {
      color: "muted",
    },
    subtle: {
      color: "textSecondary",
    },
  },
};
