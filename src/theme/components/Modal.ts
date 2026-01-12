import type { ComponentStyleConfig } from "@chakra-ui/react";

export const Modal: ComponentStyleConfig = {
  baseStyle: {
    dialog: {
      borderRadius: "lg",
      bg: "background",
      color: "textPrimary",
      border: "1px solid",
      borderColor: "border",
    },
    header: {
      fontWeight: "bold",
      color: "textPrimary",
    },
    closeButton: {
      borderRadius: "md",
      _hover: { bg: "hoverBg" },
    },
  },
};
