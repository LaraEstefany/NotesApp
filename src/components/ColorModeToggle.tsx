import { IconButton, useColorMode } from "@chakra-ui/react";

export function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle color mode"
      variant="ghost"
      onClick={toggleColorMode}
      icon={<span>{colorMode === "light" ? "🌙" : "☀️"}</span>}
    />
  );
}
