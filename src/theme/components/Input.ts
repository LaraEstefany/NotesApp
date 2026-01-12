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
        borderColor: "border",
        color: "textPrimary",
        _placeholder: { color: "placeholder" },
        _hover: { borderColor: "textSecondary" },
        _focus: {
          borderColor: "primary",
          boxShadow: "0 0 0 1px var(--chakra-colors-primary)",
        },
      },
    },
  },
};
