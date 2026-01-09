import { Flex, Input, Text, IconButton } from "@chakra-ui/react";

export function NotesHeader() {
  return (
    <Flex
      align="center"
      justify="space-between"
      px={6}
      py={4}
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Text fontSize="xl" fontWeight="bold">
        All Notes
      </Text>

      <Flex gap={2} align="center">
        <Input placeholder="Search..." size="sm" w="240px" />
        <IconButton
          aria-label="Change language"
          icon={<span>🌐</span>}
          size="sm"
        />
      </Flex>
    </Flex>
  );
}
