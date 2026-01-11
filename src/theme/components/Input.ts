import type { ComponentStyleConfig } from "@chakra-ui/react";

export const Input: ComponentStyleConfig = {
  defaultProps: {
    size: "sm",
    variant: "outline",
  },
  variants: {
    outline: {
      field: {
        bg: "surface",
        borderColor: "neutral.200",
        color: "textPrimary",
        _placeholder: { color: "neutral.600" },
        _hover: { borderColor: "neutral.300" },
        _focus: {
          borderColor: "primary",
          boxShadow: "0 0 0 1px var(--chakra-colors-primary)",
        },
      },
    },
  },
};
