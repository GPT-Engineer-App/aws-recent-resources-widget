import React, { useEffect, useState } from "react";
import { Box, Text, VStack, Heading, List, ListItem, ListIcon, Button } from "@chakra-ui/react";
import { FaAws, FaRedo } from "react-icons/fa";
import { client } from "lib/crud";

const Index = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    const data = await client.getWithPrefix("aws-resource:");
    if (data) {
      setResources(data.map((item) => item.value));
    }
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <VStack spacing={4}>
        <Heading size="md">Recently Visited AWS Resources</Heading>
        <List spacing={3}>
          {resources.map((resource, index) => (
            <ListItem key={index}>
              <ListIcon as={FaAws} color="green.500" />
              {resource.name} - {resource.type}
            </ListItem>
          ))}
        </List>
        <Button leftIcon={<FaRedo />} colorScheme="teal" onClick={fetchResources}>
          Refresh
        </Button>
      </VStack>
    </Box>
  );
};

export default Index;
