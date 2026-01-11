import type { ComponentStyleConfig } from "@chakra-ui/react";

export const Tag: ComponentStyleConfig = {
  baseStyle: {
    container: {
      borderRadius: "full",
      fontWeight: "semibold",
    },
  },
  variants: {
    subtle: {
      container: { bg: "neutral.200", color: "textSecondary" },
    },
    brand: {
      container: { bg: "brand.100", color: "brand.900" },
    },
    accent: {
      container: { bg: "accent.100", color: "brand.900" },
    },
  },
  defaultProps: {
    size: "sm",
    variant: "subtle",
  },
};
