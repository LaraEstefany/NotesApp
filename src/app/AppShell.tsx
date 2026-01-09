import { Flex } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";
import { NotesLayout } from "../components/NotesLayout";

export function AppShell() {
  return (
    <Flex h="100vh" w="100vw">
      <Sidebar />
      <NotesLayout />
    </Flex>
  );
}
