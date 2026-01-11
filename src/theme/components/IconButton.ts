import type { ComponentStyleConfig } from "@chakra-ui/react";

export const IconButton: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "md",
    _focusVisible: { boxShadow: "outline" },
  },
  variants: {
    ghost: {
      bg: "transparent",
      color: "textPrimary",
      _hover: { bg: "neutral.100" },
      _active: { bg: "neutral.200" },
    },
    outline: {
      bg: "transparent",
      border: "1px solid",
      borderColor: "neutral.200",
      color: "textPrimary",
      _hover: { bg: "neutral.100" },
      _active: { bg: "neutral.200" },
    },
  },
  defaultProps: {
    size: "sm",
    variant: "ghost",
  },
};
