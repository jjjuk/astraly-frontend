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
            Booster Quests
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex className="ProjectTitleWrapper" gridGap={'20px'} mt="25px">
        <a href="javascript:history.back()">
          <Image src="/assets/imgs/arrow.png" height={'43px'} />
        </a>
        <Heading
          fontSize="30px"
          color="purple.700"
          textShadow="-2px 2px 0px #8f00ff"
          pb={'64px'}
          textTransform="uppercase"
          mt="4px"
        >
          Booster Quests
        </Heading>
      </Flex>
      <Flex className="Container Project" flexDir={'row'} gridGap="20px">
        <Flex className="Left Container" width={'70%'} flexDir="column">
          <Flex></Flex>
        </Flex>
        <Image src="/assets/imgs/divider.png" height={'630px'} zIndex="100" mt="auto" mb="auto" />
        <Flex className="Right Container" width={'30%'} flexDir="column" gridGap={'16px'}>
          <Flex
            width={'100%'}
            filter="drop-shadow(0px 32px 48px rgba(55, 0, 99, 0.08))"
            bg={'#fff'}
            borderRadius="26px"
            border={'solid 2px #fff'}
            flexDir="column"
            className="TopRight info Box"
          >
            <Flex width={'100%'} borderRadius="26px" bg="#FAF3FF" padding="20px">
              <div style={{marginTop: 'auto', marginBottom: 'auto'}}>
                <div className={styles.hex}>
                  <div className={styles.hexBackground}>
                    <img src={project?.logo} />
                  </div>
                </div>
              </div>
              <Flex flexDir={'column'} ml="15px">
                <Text fontWeight="750" fontSize="16px" lineHeight="22px" color="#9D69DE">
                  Apply and invest in
                </Text>
                <Text
                  fontFamily="Druk Wide Web"
                  fontStyle="normal"
                  fontWeight="700"
                  fontSize="40px"
                  lineHeight="110%"
                  color="#370063"
                >
                  {project?.name}
                </Text>
              </Flex>
            </Flex>
            <Flex
              flexDir={'row'}
              padding="20px"
              width={'100%'}
              gridGap="10px"
              className="TopRight info Box"
            >
              <Button
                leftIcon={<Image src="/assets/imgs/rocket.png" height={'15px'} />}
                bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
                borderRadius="16px"
                boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
                fontFamily="Druk Wide Web"
                fontSize={'12px !important'}
                color="white"
                transition="all 0.5s ease"
                _hover={{bg: 'linear-gradient(360deg, #9F24FF 0%,#7E1AFF  50%)'}}
                height={'54px'}
              >
                Apply Now
              </Button>
              <Button
                leftIcon={<Image src="/assets/imgs/booster.png" height={'15px'} />}
                bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
                borderRadius="16px"
                fontSize={'12px !important'}
                boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
                fontFamily="Druk Wide Web"
                color="white"
                transition="all 0.5s ease"
                _hover={{bg: 'linear-gradient(360deg, #9F24FF 0%,#7E1AFF  50%)'}}
                height={'54px'}
              >
                Booster Quests
              </Button>
            </Flex>
          </Flex>
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
