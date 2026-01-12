import type { ComponentMultiStyleConfig } from "@chakra-ui/react";

export const Tag: ComponentMultiStyleConfig = {
  parts: ["container", "label", "closeButton"],
  baseStyle: {
    container: {
      borderRadius: "full",
      fontWeight: "semibold",
    },
  },
  variants: {
    subtle: {
      container: { bg: "subtleBg", color: "textSecondary" },
    },
    brand: {
      container: {
        bg: { default: "brand.100", _dark: "brand.700" },
        color: { default: "brand.900", _dark: "neutral.50" },
      },
    },
    accent: {
      container: {
        bg: { default: "accent.100", _dark: "accent.300" },
        color: { default: "brand.900", _dark: "brand.900" },
      },
    },
  },
  defaultProps: {
    size: "sm",
    variant: "subtle",
  },
};
