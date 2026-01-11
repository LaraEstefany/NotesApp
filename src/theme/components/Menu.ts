import type { ComponentStyleConfig } from "@chakra-ui/react";

export const Menu: ComponentStyleConfig = {
  baseStyle: {
    list: {
      borderRadius: "md",
      border: "1px solid",
      borderColor: "neutral.200",
      bg: "background",
      p: 1,
    },
    item: {
      borderRadius: "md",
      _hover: { bg: "neutral.100" },
      _focus: { bg: "neutral.100" },
    },
  },
};
