import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";

export function NoteEditor() {
  return (
    <Box flex="1" p={6}>
      <Flex justify="space-between" mb={6}>
        <VStack align="start" spacing={2}>
          <Text fontSize="2xl" fontWeight="bold">
            Hotel Quartier Latin
          </Text>
          <Text fontSize="sm" color="gray.600">
            Tags: Paris, Hotel
          </Text>
          <Text fontSize="sm" color="gray.500">
            Last edited: 3 minutes ago
          </Text>
        </VStack>

        <VStack>
          <Button size="sm">Archive note</Button>
          <Button size="sm" colorScheme="red" variant="outline">
            Delete note
          </Button>
        </VStack>
      </Flex>

      <Text color="gray.700" mb={10}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
      </Text>

      <Flex gap={3}>
        <Button colorScheme="blue">Save note</Button>
        <Button variant="outline">Cancel</Button>
      </Flex>
    </Box>
  );
}
