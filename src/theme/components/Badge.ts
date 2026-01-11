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
      bg: "neutral.200",
      color: "textSecondary",
    },
    brand: {
      bg: "brand.100",
      color: "brand.900",
    },
    accent: {
      bg: "accent.100",
      color: "brand.900",
    },
  },
  defaultProps: {
    variant: "subtle",
  },
};
