import { Box, VStack, Text, Divider, HStack } from "@chakra-ui/react";

export function Sidebar() {
  return (
    <Box w="260px" borderRight="1px solid" borderColor="gray.200" p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={6}>
        📝 NotesApp
      </Text>

      <VStack align="stretch" spacing={3}>
        <Text fontWeight="medium">All notes</Text>
        <Text color="gray.600">Archived notes</Text>
      </VStack>

      <Divider my={6} />

      <VStack align="stretch" spacing={2}>
        <Text fontSize="sm" color="gray.500">
          Tags
        </Text>

        {["Travel", "Paris", "London", "Miami", "Hotel", "Food"].map((tag) => (
          <HStack key={tag}>
            <Text fontSize="sm">{tag}</Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}
