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
        w={'310px'}
        bg={useColorModeValue('white', 'gray.400')}
        boxShadow={'2xl'}
        borderRadius="24px"
        overflow={'hidden'}
        cursor="pointer"
        height={'480px'}
        border="2px solid #fff"
      >
        <Image height={'260px'} width={'full'} src={project?.cover} objectFit={'cover'} />
        <Flex justify={'left'} mt={-12} pl="18px">
          <Avatar
            size={'xl'}
            src={project?.logo}
            css={{
              border: '2px solid #9D69DE'
            }}
          />
        </Flex>

        <Box px={'20px'} pt="6px">
          <Stack spacing={0} align={'left'} mb={'10px'}>
            <Heading fontWeight="750" fontSize="24px" color="#370063">
              {project?.name}
            </Heading>
            <Text
              fontWeight="700"
              fontSize="12px"
              lineHeight="150%"
              color="#8F00FF"
              fontFamily="Druk Wide Web"
            >
              ${project?.ticker}
            </Text>
          </Stack>
          <Stack direction="column" spacing={'9px'}>
            <Flex justifyContent="space-between">
              <Text color="#898989" fontSize={'16px'}>
                Total raise
              </Text>
              <Text fontWeight="750" fontSize="16px" lineHeight="22px" color="#9D69DE">
                ${project?.totalRaise?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text color="gray.200">Max. allocation</Text>
              <Text fontWeight="750" fontSize="16px" lineHeight="22px" color="#9D69DE">
                ${project?.maxAllocation}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text color="gray.200">Round closes in</Text>
              <Text fontWeight="750" fontSize="16px" lineHeight="22px" color="#9D69DE">
                {roundTimer}
              </Text>
            </Flex>
          </Stack>
        </Box>
      </Box>
    </Link>
  );
};

export default ProjectCard;
