import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Layout from 'layout';
import {Project, Round} from 'interfaces';
import {projects} from 'utils/data';
import {
  Badge,
  Button,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Stack,
  Tag,
  Text,
  UnorderedList,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator
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
      <Breadcrumb color={'#9D69DE'}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/launchpad" color={'#9D69DE'}>
            Launchpad
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" color={'#8F00FF'} fontWeight="900">
            {project?.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex className="ProjectTitleWrapper" gridGap={'20px'} mt="25px">
        <a href="javascript:history.back()">
          <Image src="/assets/imgs/arrow.png" height={'43px'} />
        </a>
        <Heading
          size="2xl"
          color="purple.700"
          textShadow="-2px 2px 0px #8f00ff"
          mb={'64px'}
          textTransform="uppercase"
        >
          {project?.name}
        </Heading>
      </Flex>
      <Flex className="Container Project" flexDir={'row'}>
        <Flex className="Left Container" width={'70%'} flexDir="column">
          <Flex
            className="Steps Container"
            width={'100%'}
            borderRadius="24px"
            border={'2px solid #fff'}
            bg="#FAF3FF"
          >
            <Flex
              className="Step 1"
              width={'25%'}
              borderRadius="24px"
              padding="20px"
              flexDir={'column'}
              height={'100%'}
            >
              <Text
                fontWeight="400"
                fontSize="16px"
                lineHeight="22px"
                color="#8F00FF"
                display={'flex'}
                flexDir="row"
              >
                <Image src="/assets/imgs/star.png" mr={'3px'} height="10px" mt="auto" mb="auto" />{' '}
                Step 1
              </Text>
              <Text
                fontFamily="Druk Wide Web"
                fontWeight="700"
                fontSize="12px"
                lineHeight="150%"
                color="#8F00FF"
                mt="5px"
              >
                Ticket Claim
              </Text>
              <Text
                fontWeight="400"
                fontSize="16px"
                lineHeight="22px"
                color="#8F00FF"
                display={'flex'}
                flexDir="row"
              >
                You can claim your tickets.
              </Text>
              <Text
                fontWeight="400"
                fontSize="16px"
                lineHeight="22px"
                color="#8F00FF"
                display={'flex'}
                flexDir="row"
              >
                2022-06-06
              </Text>
              <Button
                bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
                borderRadius="8px"
                boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
                width="100%"
                fontFamily="Druk Wide Web"
                color="white"
                transition="all 0.5s ease"
                _hover={{bg: 'linear-gradient(360deg, #9F24FF 0%,#7E1AFF  50%)'}}
                mt="auto"
                height={'24px'}
              >
                Claim
              </Button>
            </Flex>
            <Flex
              className="Step 2"
              width={'25%'}
              borderRadius="24px"
              padding="20px"
              flexDir={'column'}
              height={'100%'}
            >
              <Text
                fontWeight="400"
                fontSize="16px"
                lineHeight="22px"
                color="#8F00FF"
                display={'flex'}
                flexDir="row"
              >
                <Image src="/assets/imgs/star.png" mr={'3px'} height="10px" mt="auto" mb="auto" />{' '}
                Step 1
              </Text>
              <Text
                fontFamily="Druk Wide Web"
                fontWeight="700"
                fontSize="12px"
                lineHeight="150%"
                color="#8F00FF"
                mt="5px"
              >
                Ticket Claim
              </Text>
              <Text
                fontWeight="400"
                fontSize="16px"
                lineHeight="22px"
                color="#8F00FF"
                display={'flex'}
                flexDir="row"
              >
                You can claim your tickets.
              </Text>
              <Text
                fontWeight="400"
                fontSize="16px"
                lineHeight="22px"
                color="#8F00FF"
                display={'flex'}
                flexDir="row"
              >
                2022-06-06
              </Text>
              <Button
                bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
                borderRadius="8px"
                boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
                width="100%"
                fontFamily="Druk Wide Web"
                color="white"
                transition="all 0.5s ease"
                _hover={{bg: 'linear-gradient(360deg, #9F24FF 0%,#7E1AFF  50%)'}}
                mt="auto"
                height={'24px'}
              >
                Claim
              </Button>
            </Flex>
            <Flex
              className="Step 3"
              width={'25%'}
              borderRadius="24px"
              padding="20px"
              flexDir={'column'}
              height={'100%'}
            >
              <Text
                fontWeight="400"
                fontSize="16px"
                lineHeight="22px"
                color="#8F00FF"
                display={'flex'}
                flexDir="row"
              >
                <Image src="/assets/imgs/star.png" mr={'3px'} height="10px" mt="auto" mb="auto" />{' '}
                Step 1
              </Text>
              <Text
                fontFamily="Druk Wide Web"
                fontWeight="700"
                fontSize="12px"
                lineHeight="150%"
                color="#8F00FF"
                mt="5px"
              >
                Ticket Claim
              </Text>
              <Text
                fontWeight="400"
                fontSize="16px"
                lineHeight="22px"
                color="#8F00FF"
                display={'flex'}
                flexDir="row"
              >
                You can claim your tickets.
              </Text>
              <Text
                fontWeight="400"
                fontSize="16px"
                lineHeight="22px"
                color="#8F00FF"
                display={'flex'}
                flexDir="row"
              >
                2022-06-06
              </Text>
              <Button
                bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
                borderRadius="8px"
                boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
                width="100%"
                fontFamily="Druk Wide Web"
                color="white"
                transition="all 0.5s ease"
                _hover={{bg: 'linear-gradient(360deg, #9F24FF 0%,#7E1AFF  50%)'}}
                mt="auto"
                height={'24px'}
              >
                Claim
              </Button>
            </Flex>
            <Flex
              className="Step 4"
              width={'25%'}
              borderRadius="24px"
              padding="20px"
              flexDir={'column'}
              height={'100%'}
            >
              <Text
                fontWeight="400"
                fontSize="16px"
                lineHeight="22px"
                color="#8F00FF"
                display={'flex'}
                flexDir="row"
              >
                <Image src="/assets/imgs/star.png" mr={'3px'} height="10px" mt="auto" mb="auto" />{' '}
                Step 1
              </Text>
              <Text
                fontFamily="Druk Wide Web"
                fontWeight="700"
                fontSize="12px"
                lineHeight="150%"
                color="#8F00FF"
                mt="5px"
              >
                Ticket Claim
              </Text>
              <Text
                fontWeight="400"
                fontSize="16px"
                lineHeight="22px"
                color="#8F00FF"
                display={'flex'}
                flexDir="row"
              >
                You can claim your tickets.
              </Text>
              <Text
                fontWeight="400"
                fontSize="16px"
                lineHeight="22px"
                color="#8F00FF"
                display={'flex'}
                flexDir="row"
              >
                2022-06-06
              </Text>
              <Button
                bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
                borderRadius="8px"
                boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
                width="100%"
                fontFamily="Druk Wide Web"
                color="white"
                transition="all 0.5s ease"
                _hover={{bg: 'linear-gradient(360deg, #9F24FF 0%,#7E1AFF  50%)'}}
                mt="auto"
                height={'24px'}
              >
                Claim
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <Flex className="Right Container" width={'30%'} flexDir="column"></Flex>
      </Flex>
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
