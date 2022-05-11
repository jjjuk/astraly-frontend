import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import {Project} from 'interfaces';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';

interface Props {
  project: Project;
}

const ProjectCard = ({project}: Props) => {
  const [roundTimer, setRoundTimer] = useState('...');

  const updateRoundTimer = () => {
    const _roundId = project?.currentRoundId;
    const _remainingTime = project?.rounds[_roundId].endDate.getTime() - new Date().getTime();
    var days = Math.floor(_remainingTime / (1000 * 60 * 60 * 24));
    var hours = Math.floor((_remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((_remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((_remainingTime % (1000 * 60)) / 1000);
    setRoundTimer(`${days}d${hours}h${minutes}m${seconds}s`);
  };
  useEffect(() => {
    let interval = setInterval(() => updateRoundTimer(), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Link href={`/project/${project.id}`}>
      <Box
        maxW={'350px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.400')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
        cursor="pointer"
      >
        <Image height={'120px'} width={'full'} src={project?.cover} objectFit={'cover'} />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={project?.logo}
            css={{
              border: '2px solid #9D69DE'
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'left'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight="bold" fontFamily={'body'} color="#370063">
              {project?.name}
            </Heading>
            <Text color={'purple.900'} fontFamily="Druk Wide Web">
              ${project?.ticker}
            </Text>
          </Stack>

          <Stack direction="column" spacing={6}>
            <Flex justifyContent="space-between">
              <Text color="gray.200">Total raise</Text>
              <Text color="black">
                ${project?.totalRaise?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text color="gray.200">Max. allocation</Text>
              <Text color="black">${project?.maxAllocation}</Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text color="gray.200">Round closes in</Text>
              <Text color="black">{roundTimer}</Text>
            </Flex>
          </Stack>
        </Box>
      </Box>
    </Link>
  );
};

export default ProjectCard;
