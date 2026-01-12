import type { ComponentStyleConfig } from "@chakra-ui/react";

export const Menu: ComponentStyleConfig = {
  baseStyle: {
    list: {
      borderRadius: "md",
      border: "1px solid",
      borderColor: "border",
      bg: "background",
      p: 1,
    },
    item: {
      borderRadius: "md",
      _hover: { bg: "hoverBg" },
      _focus: { bg: "hoverBg" },
    },
  },
};
