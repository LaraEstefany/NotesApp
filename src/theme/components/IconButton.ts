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
      _hover: { bg: "hoverBg" },
      _active: { bg: "subtleBg" },
    },
    outline: {
      bg: "transparent",
      border: "1px solid",
      borderColor: "border",
      color: "textPrimary",
      _hover: { bg: "hoverBg" },
      _active: { bg: "subtleBg" },
    },
  },
  defaultProps: {
    size: "sm",
    variant: "ghost",
  },
};
