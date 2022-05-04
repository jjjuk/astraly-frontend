import {ChevronRightIcon} from '@chakra-ui/icons';
import {Button, Flex, Heading, Tag, Text, VStack} from '@chakra-ui/react';
import ProjectCard from 'components/ProjectCard';
import StatsBar from 'components/StatsBar';
import {Project} from 'interfaces';
import {projects} from 'pages/data';
import React from 'react';

interface Props {}

const Home = (props: Props) => {
  return (
    <>
      <Flex maxWidth="60%" flexDir="column" gap={8}>
        <Heading size="xl" color="purple.600">
          INVEST IN CURATED STARKNET PROJECTS
        </Heading>
        <Text color="secondary.100" fontSize="lg">
          <b>Buy</b> ZKP tokens and <b>stake</b> them and receive lottery tickets to <b>invest</b>{' '}
          in the listed projects.
        </Text>
        <Button
          rightIcon={<ChevronRightIcon />}
          bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
          borderRadius="16px"
          width="300px"
          fontFamily="Druk Wide Web"
          py="25px"
        >
          BUY ZKP
        </Button>
      </Flex>
      <StatsBar />
      <Flex mt="50px" gap="30px">
        <Heading size="md">ONGOING PROJECTS</Heading>
        <Tag variant="outline" colorScheme="purple">
          SEE ALL
        </Tag>
      </Flex>
      <Flex mt="20px" gap="20px">
        {projects?.map((project: Project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </Flex>
    </>
  );
};

export default Home;
