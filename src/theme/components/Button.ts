import type { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "md",
    fontWeight: "semibold",
    _focusVisible: { boxShadow: "outline" },
  },
  sizes: {
    sm: { h: 9, px: 3, fontSize: "sm" },
    md: { h: 10, px: 4, fontSize: "sm" },
  },
  variants: {
    solid: {
      bg: "primary",
      color: "white",
      _hover: { bg: "primaryHover" },
      _active: { bg: "primaryHover" },
      _disabled: {
        opacity: 0.6,
        cursor: "not-allowed",
        _hover: { bg: "primary" },
      },
    },
    outline: {
      bg: "transparent",
      border: "1px solid",
      borderColor: "border",
      color: "textPrimary",
      _hover: { bg: "hoverBg" },
      _active: { bg: "subtleBg" },
    },
    ghost: {
      bg: "transparent",
      color: "textPrimary",
      _hover: { bg: "hoverBg" },
      _active: { bg: "subtleBg" },
    },
    danger: {
      bg: "danger",
      color: "white",
      _hover: { bg: { default: "accent.400", _dark: "accent.200" } },
      _active: { bg: { default: "accent.300", _dark: "accent.100" } },
    },
  },
  defaultProps: {
    size: "sm",
    variant: "solid",
  },
};
