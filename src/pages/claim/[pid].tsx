import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Layout from 'layout';
import {Project, Round} from 'interfaces';
import {projects, quests} from 'utils/data';
import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  Image,
  Text
} from '@chakra-ui/react';
import styles from '../../styles/pid.module.scss';
import ClaimOrBurn from 'components/ClaimOrBurn';
import Requirements from 'components/requirements';

const QuestPage = () => {
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
          <BreadcrumbLink href={`/project/${pid}`}>{project?.name}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" color={'#8F00FF'} fontWeight="900">
            Claim your Lottery Tickets
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex className="ProjectTitleWrapper" gridGap={'20px'} mt="25px">
        <a href="javascript:history.back()">
          <Image src="/assets/imgs/arrow.png" height={'43px'} />
        </a>
        <Heading
          fontSize="40px"
          color="purple.700"
          textShadow="-2px 2px 0px #8f00ff"
          pb={'64px'}
          textTransform="uppercase"
        >
          Claim
        </Heading>
      </Flex>
      <Flex className="Container Project" flexDir={'row'} gridGap="10px">
        <Flex className="Left Container" width={'70%'} flexDir="column">
          <ClaimOrBurn title="Total Claimable Tickets" number="100" />
        </Flex>
        <Image src="/assets/imgs/divider.png" height={'630px'} zIndex="100" mt="auto" mb="auto" />
        <Flex className="Right Container" width={'30%'} flexDir="column" gridGap={'16px'}>
          <Requirements />
          <Flex
            bg={'#fff'}
            height="100%"
            borderRadius="24px"
            flexDir={'column'}
            border="2px solid #fff"
          >
            <Flex flexDir={'column'} padding="20px">
              <Text
                fontFamily="Druk Wide Web"
                fontWeight="700"
                fontSize="16px"
                lineHeight="21px"
                color="#9D69DE"
                mb={'8px'}
              >
                Links
              </Text>
              <Flex gridGap={'10px'}></Flex>
            </Flex>
            <Flex flexDir={'column'} padding="20px" bg={'#FAF3FF'} borderRadius="24px">
              <Text
                fontFamily="Druk Wide Web"
                fontWeight="700"
                fontSize="16px"
                lineHeight="21px"
                color="#9D69DE"
                mb={'8px'}
              >
                Pitch
              </Text>
              <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
                {project?.description}
              </Text>
            </Flex>
            <Flex flexDir={'column'} padding="20px" borderRadius="24px">
              <Text
                fontFamily="Druk Wide Web"
                fontWeight="700"
                fontSize="16px"
                lineHeight="21px"
                color="#9D69DE"
                mb={'8px'}
              >
                Admission
              </Text>
              <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
                Have locked ZKP tokens 5 transactions on Uniswap in the last 6 month Have at least
                2500$ of tokens on your wallet
              </Text>
            </Flex>
            <Flex flexDir={'column'} padding="20px" bg={'#FAF3FF'} borderRadius="24px">
              <Text
                fontFamily="Druk Wide Web"
                fontWeight="700"
                fontSize="16px"
                lineHeight="21px"
                color="#9D69DE"
                mb={'8px'}
              >
                IDO Information
              </Text>
              <Flex width={'100%'}>
                <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
                  Hardcap
                </Text>
                <Text
                  fontFamily="Druk Wide Web"
                  fontStyle="normal"
                  fontWeight="700"
                  fontSize="16px"
                  lineHeight="21px"
                  textAlign="right"
                  color="#8F00FF"
                  ml={'auto'}
                >
                  {project?.totalRaise}
                </Text>
              </Flex>
              <Flex width={'100%'} mt="8px">
                <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
                  Token Price
                </Text>
                <Text
                  fontFamily="Druk Wide Web"
                  fontStyle="normal"
                  fontWeight="700"
                  fontSize="16px"
                  lineHeight="21px"
                  textAlign="right"
                  color="#8F00FF"
                  ml={'auto'}
                >
                  ${project?.maxAllocation}
                </Text>
              </Flex>
              <Flex width={'100%'} mt="8px">
                <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
                  Max. Allocation
                </Text>
                <Text
                  fontFamily="Druk Wide Web"
                  fontStyle="normal"
                  fontWeight="700"
                  fontSize="16px"
                  lineHeight="21px"
                  textAlign="right"
                  color="#8F00FF"
                  ml={'auto'}
                >
                  {project?.maxAllocation}
                </Text>
              </Flex>
              <Flex width={'100%'} mt="8px">
                <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
                  Type
                </Text>
                <Text
                  fontFamily="Druk Wide Web"
                  fontStyle="normal"
                  fontWeight="700"
                  fontSize="16px"
                  lineHeight="21px"
                  textAlign="right"
                  color="#8F00FF"
                  ml={'auto'}
                >
                  {project?.type}
                </Text>
              </Flex>
              <Flex width={'100%'} mt="8px">
                <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
                  Blockchain
                </Text>
                <Text
                  fontFamily="Druk Wide Web"
                  fontStyle="normal"
                  fontWeight="700"
                  fontSize="16px"
                  lineHeight="21px"
                  textAlign="right"
                  color="#8F00FF"
                  ml={'auto'}
                >
                  {project?.maxAllocation}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default QuestPage;
