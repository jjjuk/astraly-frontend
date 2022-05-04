import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Layout from 'layout';
import {Project, Round} from 'interfaces';
import {projects} from 'pages/data';
import {
  Badge,
  Box,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Stack,
  Tag,
  Text,
  UnorderedList
} from '@chakra-ui/react';

const ProjectPage = () => {
  const router = useRouter();
  const {pid} = router.query;
  const [project, setProject] = useState<Project | undefined>(undefined);

  useEffect(() => {
    setProject(projects.find(p => p.id === Number(pid)));
  }, [pid]);

  return (
    <Layout>
      <Flex gap="20px" mt={2}>
        <Flex bg="#8f00ff" width="40%" p={7} flexDir="column" gap="10px">
          <Flex gap="20px" alignItems="center">
            <Image src={project?.logo} alt="project logo" w="80px" />
            <Heading size="lg">{project?.name}</Heading>
          </Flex>
          <Flex flexDir="column">
            <Text fontSize="lg" fontWeight="bold">
              Categories
            </Text>
            <Flex gap="10px">
              {project?.categories?.map((category: string) => (
                <Badge bg="white" color="purple.700" px={8} py={2} fontWeight="bold">
                  {category}
                </Badge>
              ))}
            </Flex>
          </Flex>
          <Flex flexDir="column">
            <Text fontSize="lg" fontWeight="bold">
              Description
            </Text>
            <Text fontSize="md">{project?.description}</Text>
          </Flex>
        </Flex>
        <Flex bg="#8f00ff" width="60%" p={7} flexDir="column" gap="10px">
          <Heading size="md">IDO PROCESS</Heading>
          <Flex flexDir="row" mt={5}>
            {project?.rounds.map((round: Round, index: number) => (
              <Flex flexDir="column" minW="170px">
                <Flex
                  borderRadius="full"
                  alignItems="center"
                  justifyContent="center"
                  bg={project.currentRoundId === index ? 'purple.700' : 'purple.800'}
                  w="50px"
                  h="50px"
                  mb={5}
                >
                  {index}
                </Flex>
                <Text fontSize="lg" fontWeight="bold">
                  {round.title}
                </Text>
                <Text fontSize="sm" fontWeight="bold">
                  {round.startDate.toLocaleDateString()}
                </Text>
                <Text fontSize="xs">{round.description}</Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
      <Flex gap="20px" mt={10}>
        <Flex bg="#8f00ff" width="50%" p={7} flexDir="column" gap="10px">
          <Heading size="md">ADMISSION</Heading>
          <UnorderedList>
            <ListItem>Lorem ipsum dolor sit amet</ListItem>
            <ListItem>Consectetur adipiscing elit</ListItem>
            <ListItem>Integer molestie lorem at massa</ListItem>
            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
          </UnorderedList>
        </Flex>
        <Flex bg="#8f00ff" width="50%" p={7} flexDir="column" gap="10px">
          <Heading size="md">IDO INFORMATION</Heading>
          <Stack direction="column" spacing={6}>
            <Flex justifyContent="space-between">
              <Text color="gray.100">Total raise</Text>
              <Text color="purple.600">
                ${project?.totalRaise?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text color="gray.100">Token Price</Text>
              <Text color="purple.600">$ 0.01</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text color="gray.100">Max. Allocation</Text>
              <Text color="purple.600">${project?.maxAllocation}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text color="gray.100">Sale Type</Text>
              <Text color="purple.600">Vested</Text>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default ProjectPage;
