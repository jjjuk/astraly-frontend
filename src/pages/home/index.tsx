import {ChevronRightIcon} from '@chakra-ui/icons';
import {Button, Flex, Heading, Tag, Text, VStack} from '@chakra-ui/react';
import ProjectCard from 'components/ProjectCard';
import StatsBar from 'components/StatsBar';
import {Project} from 'interfaces';
import React from 'react';

interface Props {}

const projects: Project[] = [
  {
    id: 0,
    name: 'ZkSwaap',
    ticker: 'ZKS',
    logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    cover:
      'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    totalRaise: 1500000,
    maxAllocation: 500,
    currentRound: {
      id: 0,
      title: 'Ticket Claim',
      startDate: new Date(),
      endDate: new Date('10/05/2022')
    },
    type: 'IDO'
  }
];

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
