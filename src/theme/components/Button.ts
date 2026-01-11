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
      _active: { bg: "brand.900" },
      _disabled: {
        opacity: 0.6,
        cursor: "not-allowed",
        _hover: { bg: "primary" },
      },
    },
    outline: {
      bg: "transparent",
      border: "1px solid",
      borderColor: "neutral.200",
      color: "textPrimary",
      _hover: { bg: "neutral.100" },
      _active: { bg: "neutral.200" },
    },
    ghost: {
      bg: "transparent",
      color: "textPrimary",
      _hover: { bg: "neutral.100" },
      _active: { bg: "neutral.200" },
    },
    danger: {
      bg: "danger",
      color: "white",
      _hover: { bg: "accent.400" },
      _active: { bg: "accent.300" },
    },
  },
  defaultProps: {
    size: "sm",
    variant: "solid",
  },
};
