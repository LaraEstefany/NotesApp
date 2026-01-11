import type { ComponentStyleConfig } from "@chakra-ui/react";

export const Heading: ComponentStyleConfig = {
  baseStyle: {
    color: "textPrimary",
    fontWeight: "bold",
  },
  sizes: {
    sm: { fontSize: "lg" },
    md: { fontSize: "xl" },
    lg: { fontSize: "2xl" },
  },
  defaultProps: {
    size: "md",
  },
};
