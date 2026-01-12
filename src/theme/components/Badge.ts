import type { ComponentStyleConfig } from "@chakra-ui/react";

export const Badge: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "full",
    textTransform: "none",
    fontWeight: "semibold",
    px: 2,
    py: 0.5,
  },
  variants: {
    subtle: {
      bg: "subtleBg",
      color: "textSecondary",
    },
    brand: {
      bg: { default: "brand.100", _dark: "brand.700" },
      color: { default: "brand.900", _dark: "neutral.50" },
    },
    accent: {
      bg: { default: "accent.100", _dark: "accent.300" },
      color: { default: "brand.900", _dark: "brand.900" },
    },
  },
  defaultProps: {
    variant: "subtle",
  },
};
