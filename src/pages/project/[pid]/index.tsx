import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from 'layout'
import { Project, Round } from 'interfaces'
import { projects } from 'utils/data'
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
} from '@chakra-ui/react'
import Link from 'next/link'
import styles from 'styles/pid.module.scss'

import { default as _ReactPlayer } from 'react-player'
import { ReactPlayerProps } from 'react-player/types/lib'
import ProjectPage from '../../../components/Pages/Project/ProjectPage'

const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>

const ProjectPageContainer = () => {
  return <ProjectPage />
  // const router = useRouter()
  // const { pid } = router.query
  // const [project, setProject] = useState<Project | undefined>(undefined)

  // useEffect(() => {
  //   setProject(projects.find((p) => p.id === Number(pid)))
  // }, [pid])

  // return (
  //   <Layout>
  //     <Breadcrumb color={'#9D69DE'}>
  //       <BreadcrumbItem>
  //         <BreadcrumbLink href="/launchpad" color={'#9D69DE'}>
  //           Launchpad
  //         </BreadcrumbLink>
  //       </BreadcrumbItem>
  //       <BreadcrumbItem>
  //         <BreadcrumbLink href="#" color={'#8F00FF'} fontWeight="900">
  //           {project?.name}
  //         </BreadcrumbLink>
  //       </BreadcrumbItem>
  //     </Breadcrumb>
  //     <Flex className="ProjectTitleWrapper" gridGap={'20px'} mt="25px">
  //       <a href="javascript:history.back()">
  //         <Image src="/assets/imgs/arrow.png" height={'43px'} />
  //       </a>
  //       <Heading
  //         size="2xl"
  //         color="purple.700"
  //         textShadow="-2px 2px 0px #8f00ff"
  //         mb={'64px'}
  //         textTransform="uppercase">
  //         {project?.name}
  //       </Heading>
  //     </Flex>
  //     <Flex className="Container Project" flexDir={'row'} gridGap="20px">
  //       <Flex className="Left Container" width={'70%'} flexDir="column">
  //         <Flex
  //           className="Steps Container"
  //           width={'100%'}
  //           borderRadius="24px"
  //           border={'2px solid #fff'}
  //           bg="#FAF3FF">
  //           <Flex
  //             className="Step 1"
  //             width={'25%'}
  //             borderRadius="24px"
  //             padding="20px"
  //             flexDir={'column'}
  //             height={'100%'}>
  //             <Text
  //               fontWeight="400"
  //               fontSize="16px"
  //               lineHeight="22px"
  //               color="#8F00FF"
  //               display={'flex'}
  //               flexDir="row">
  //               <Image src="/assets/imgs/star.png" mr={'3px'} height="10px" mt="auto" mb="auto" />
  //               Step 1
  //             </Text>
  //             <Text
  //               fontFamily="Druk Wide Web"
  //               fontWeight="700"
  //               fontSize="12px"
  //               lineHeight="150%"
  //               color="#8F00FF"
  //               mt="5px">
  //               Ticket Claim
  //             </Text>
  //             <Text
  //               fontWeight="400"
  //               fontSize="16px"
  //               lineHeight="22px"
  //               color="#8F00FF"
  //               display={'flex'}
  //               flexDir="row"
  //               mt="8px">
  //               You can claim your tickets.
  //             </Text>
  //             <Text
  //               fontWeight="400"
  //               fontSize="16px"
  //               lineHeight="22px"
  //               color="#8F00FF"
  //               display={'flex'}
  //               flexDir="row"
  //               pt="8px"
  //               mt="auto"
  //               mb="8px">
  //               2022-06-06
  //             </Text>
  //             <Button
  //               bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
  //               borderRadius="8px"
  //               boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
  //               width="100%"
  //               fontFamily="Druk Wide Web"
  //               color="white"
  //               transition="all 0.5s ease"
  //               _hover={{ bg: 'linear-gradient(360deg, #9F24FF 0%,#7E1AFF  50%)' }}
  //               height={'24px'}>
  //               Claim
  //             </Button>
  //           </Flex>
  //           <Flex
  //             className="Step 2"
  //             width={'25%'}
  //             borderRadius="24px"
  //             padding="20px"
  //             flexDir={'column'}
  //             height={'100%'}>
  //             <Text
  //               fontWeight="400"
  //               fontSize="16px"
  //               lineHeight="22px"
  //               color="#8F00FF"
  //               display={'flex'}
  //               flexDir="row">
  //               <Image src="/assets/imgs/star.png" mr={'3px'} height="10px" mt="auto" mb="auto" />
  //               Step 2
  //             </Text>
  //             <Text
  //               fontFamily="Druk Wide Web"
  //               fontWeight="700"
  //               fontSize="12px"
  //               lineHeight="150%"
  //               color="#8F00FF"
  //               mt="5px">
  //               Allocation
  //             </Text>
  //             <Text
  //               fontWeight="400"
  //               fontSize="16px"
  //               lineHeight="22px"
  //               color="#8F00FF"
  //               display={'flex'}
  //               flexDir="row"
  //               mt="8px">
  //               You can burn your tickets for allocation.
  //             </Text>
  //             <Text
  //               fontWeight="400"
  //               fontSize="16px"
  //               lineHeight="22px"
  //               color="#8F00FF"
  //               display={'flex'}
  //               flexDir="row"
  //               pt="8px"
  //               mt="auto"
  //               mb="8px">
  //               2022-06-06
  //             </Text>
  //             <Button
  //               bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
  //               borderRadius="8px"
  //               boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
  //               width="100%"
  //               fontFamily="Druk Wide Web"
  //               color="white"
  //               transition="all 0.5s ease"
  //               _hover={{ bg: 'linear-gradient(360deg, #9F24FF 0%,#7E1AFF  50%)' }}
  //               height={'24px'}>
  //               Claim
  //             </Button>
  //           </Flex>
  //           <Flex
  //             className="Step 3"
  //             width={'25%'}
  //             borderRadius="24px"
  //             padding="20px"
  //             flexDir={'column'}
  //             height={'100%'}>
  //             <Text
  //               fontWeight="400"
  //               fontSize="16px"
  //               lineHeight="22px"
  //               color="#8F00FF"
  //               display={'flex'}
  //               flexDir="row">
  //               <Image src="/assets/imgs/star.png" mr={'3px'} height="10px" mt="auto" mb="auto" />
  //               Step 3
  //             </Text>
  //             <Text
  //               fontFamily="Druk Wide Web"
  //               fontWeight="700"
  //               fontSize="12px"
  //               lineHeight="150%"
  //               color="#8F00FF"
  //               mt="5px">
  //               Purchase
  //             </Text>
  //             <Text
  //               fontWeight="400"
  //               fontSize="16px"
  //               lineHeight="22px"
  //               color="#8F00FF"
  //               display={'flex'}
  //               flexDir="row"
  //               mt="8px">
  //               You can invest in the IDO.
  //             </Text>
  //             <Text
  //               fontWeight="400"
  //               fontSize="16px"
  //               lineHeight="22px"
  //               color="#8F00FF"
  //               display={'flex'}
  //               flexDir="row"
  //               pt="8px"
  //               mt="auto"
  //               mb="8px">
  //               2022-06-06
  //             </Text>
  //             <Button
  //               bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
  //               borderRadius="8px"
  //               boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
  //               width="100%"
  //               fontFamily="Druk Wide Web"
  //               color="white"
  //               transition="all 0.5s ease"
  //               _hover={{ bg: 'linear-gradient(360deg, #9F24FF 0%,#7E1AFF  50%)' }}
  //               height={'24px'}>
  //               Claim
  //             </Button>
  //           </Flex>
  //           <Flex
  //             className="Step 4"
  //             width={'25%'}
  //             borderRadius="24px"
  //             padding="20px"
  //             flexDir={'column'}
  //             height={'100%'}>
  //             <Text
  //               fontWeight="400"
  //               fontSize="16px"
  //               lineHeight="22px"
  //               color="#8F00FF"
  //               display={'flex'}
  //               flexDir="row">
  //               <Image src="/assets/imgs/star.png" mr={'3px'} height="10px" mt="auto" mb="auto" />
  //               Step 4
  //             </Text>
  //             <Text
  //               fontFamily="Druk Wide Web"
  //               fontWeight="700"
  //               fontSize="12px"
  //               lineHeight="150%"
  //               color="#8F00FF"
  //               mt="5px">
  //               Distribution
  //             </Text>
  //             <Text
  //               fontWeight="400"
  //               fontSize="16px"
  //               lineHeight="22px"
  //               color="#8F00FF"
  //               display={'flex'}
  //               flexDir="row"
  //               mt="8px">
  //               The tokens are gradually sent to your wallet
  //             </Text>
  //             <Text
  //               fontWeight="400"
  //               fontSize="16px"
  //               lineHeight="22px"
  //               color="#8F00FF"
  //               display={'flex'}
  //               flexDir="row"
  //               pt="8px"
  //               mt="auto"
  //               mb="8px">
  //               2022-06-06
  //             </Text>
  //             <Button
  //               bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
  //               borderRadius="8px"
  //               boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
  //               width="100%"
  //               fontFamily="Druk Wide Web"
  //               color="white"
  //               transition="all 0.5s ease"
  //               _hover={{ bg: 'linear-gradient(360deg, #9F24FF 0%,#7E1AFF  50%)' }}
  //               height={'24px'}>
  //               Claim
  //             </Button>
  //           </Flex>
  //         </Flex>
  //         <Flex
  //           bg="#fff"
  //           borderRadius={'26px'}
  //           overflow="hidden"
  //           mt="16px"
  //           border="2px white solid"
  //           flexDir={'column'}
  //           pb="14px">
  //           <Flex width={'100%'} borderRadius={'26px'} overflow="hidden">
  //             <ReactPlayer width={'100%'} url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
  //           </Flex>
  //           <div
  //             style={{ transform: 'translateY(-35px)', marginRight: 'auto', marginLeft: '20px' }}>
  //             <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
  //               <div className={styles.hex2}>
  //                 <div className={styles.hexBackground2}>
  //                   <img src={project?.logo} />
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //           <Text
  //             fontFamily="Druk Wide Web"
  //             fontStyle="normal"
  //             fontWeight="700"
  //             fontSize="24px"
  //             lineHeight="31px"
  //             color="#8F00FF"
  //             ml={'20px'}>
  //             {project?.name}
  //           </Text>
  //           <Text
  //             fontSize="16px"
  //             lineHeight="19px"
  //             textTransform="uppercase"
  //             color="#9D69DE"
  //             ml={'20px'}>
  //             ${project?.ticker}
  //           </Text>
  //           <Flex gap="10px" ml={'20px'} mt="25px">
  //             {project?.categories?.map((category: string) => (
  //               <Badge
  //                 border="1px solid #8F00FF"
  //                 borderRadius="8px"
  //                 px={8}
  //                 py={'5px'}
  //                 fontWeight="bold"
  //                 bg={'#fff'}
  //                 color="#8F00FF">
  //                 {category}
  //               </Badge>
  //             ))}
  //           </Flex>
  //         </Flex>
  //       </Flex>
  //       <Image src="/assets/imgs/divider.png" height={'630px'} zIndex="100" mt="auto" mb="auto" />
  //       <Flex className="Right Container" width={'30%'} flexDir="column" gridGap={'16px'}>
  //         <Flex
  //           width={'100%'}
  //           filter="drop-shadow(0px 32px 48px rgba(55, 0, 99, 0.08))"
  //           bg={'#fff'}
  //           borderRadius="26px"
  //           border={'solid 2px #fff'}
  //           flexDir="column"
  //           className="TopRight info Box">
  //           <Flex width={'100%'} borderRadius="26px" bg="#FAF3FF" padding="20px">
  //             <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
  //               <div className={styles.hex}>
  //                 <div className={styles.hexBackground}>
  //                   <img src={project?.logo} />
  //                 </div>
  //               </div>
  //             </div>
  //             <Flex flexDir={'column'} ml="15px">
  //               <Text fontWeight="750" fontSize="16px" lineHeight="22px" color="#9D69DE">
  //                 Apply and invest in
  //               </Text>
  //               <Text
  //                 fontFamily="Druk Wide Web"
  //                 fontStyle="normal"
  //                 fontWeight="700"
  //                 fontSize="40px"
  //                 lineHeight="110%"
  //                 color="#370063">
  //                 {project?.name}
  //               </Text>
  //             </Flex>
  //           </Flex>
  //           <Flex
  //             flexDir={'row'}
  //             padding="20px"
  //             width={'100%'}
  //             gridGap="10px"
  //             className="TopRight info Box">
  //             <Button
  //               leftIcon={<Image src="/assets/imgs/rocket.png" height={'15px'} />}
  //               bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
  //               borderRadius="16px"
  //               boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
  //               fontFamily="Druk Wide Web"
  //               fontSize={'12px !important'}
  //               color="white"
  //               transition="all 0.5s ease"
  //               _hover={{ bg: 'linear-gradient(360deg, #9F24FF 0%,#7E1AFF  50%)' }}
  //               height={'54px'}>
  //               Apply Now
  //             </Button>
  //             <Link href={`/quests/${pid}`}>
  //               <Button
  //                 leftIcon={<Image src="/assets/imgs/booster.png" height={'15px'} />}
  //                 bg="linear-gradient(360deg, #7E1AFF 0%, #9F24FF 50%)"
  //                 borderRadius="16px"
  //                 fontSize={'12px !important'}
  //                 boxShadow="0px 20px 35px rgba(55, 0, 99, 0.2)"
  //                 fontFamily="Druk Wide Web"
  //                 color="white"
  //                 transition="all 0.5s ease"
  //                 _hover={{ bg: 'linear-gradient(360deg, #9F24FF 0%,#7E1AFF  50%)' }}
  //                 height={'54px'}>
  //                 Booster Quests
  //               </Button>
  //             </Link>
  //           </Flex>
  //         </Flex>
  //         <Flex
  //           bg={'#fff'}
  //           height="100%"
  //           borderRadius="24px"
  //           flexDir={'column'}
  //           border="2px solid #fff">
  //           <Flex flexDir={'column'} padding="20px">
  //             <Text
  //               fontFamily="Druk Wide Web"
  //               fontWeight="700"
  //               fontSize="16px"
  //               lineHeight="21px"
  //               color="#9D69DE"
  //               mb={'8px'}>
  //               Links
  //             </Text>
  //             <Flex gridGap={'10px'}></Flex>
  //           </Flex>
  //           <Flex flexDir={'column'} padding="20px" bg={'#FAF3FF'} borderRadius="24px">
  //             <Text
  //               fontFamily="Druk Wide Web"
  //               fontWeight="700"
  //               fontSize="16px"
  //               lineHeight="21px"
  //               color="#9D69DE"
  //               mb={'8px'}>
  //               Pitch
  //             </Text>
  //             <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
  //               {project?.description}
  //             </Text>
  //           </Flex>
  //           <Flex flexDir={'column'} padding="20px" borderRadius="24px">
  //             <Text
  //               fontFamily="Druk Wide Web"
  //               fontWeight="700"
  //               fontSize="16px"
  //               lineHeight="21px"
  //               color="#9D69DE"
  //               mb={'8px'}>
  //               Admission
  //             </Text>
  //             <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
  //               Have locked ASTR tokens 5 transactions on Uniswap in the last 6 month Have at least
  //               2500$ of tokens on your wallet
  //             </Text>
  //           </Flex>
  //           <Flex flexDir={'column'} padding="20px" bg={'#FAF3FF'} borderRadius="24px">
  //             <Text
  //               fontFamily="Druk Wide Web"
  //               fontWeight="700"
  //               fontSize="16px"
  //               lineHeight="21px"
  //               color="#9D69DE"
  //               mb={'8px'}>
  //               IDO Information
  //             </Text>
  //             <Flex width={'100%'}>
  //               <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
  //                 Hardcap
  //               </Text>
  //               <Text
  //                 fontFamily="Druk Wide Web"
  //                 fontStyle="normal"
  //                 fontWeight="700"
  //                 fontSize="16px"
  //                 lineHeight="21px"
  //                 textAlign="right"
  //                 color="#8F00FF"
  //                 ml={'auto'}>
  //                 {project?.totalRaise}
  //               </Text>
  //             </Flex>
  //             <Flex width={'100%'} mt="8px">
  //               <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
  //                 Token Price
  //               </Text>
  //               <Text
  //                 fontFamily="Druk Wide Web"
  //                 fontStyle="normal"
  //                 fontWeight="700"
  //                 fontSize="16px"
  //                 lineHeight="21px"
  //                 textAlign="right"
  //                 color="#8F00FF"
  //                 ml={'auto'}>
  //                 ${project?.maxAllocation}
  //               </Text>
  //             </Flex>
  //             <Flex width={'100%'} mt="8px">
  //               <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
  //                 Max. Allocation
  //               </Text>
  //               <Text
  //                 fontFamily="Druk Wide Web"
  //                 fontStyle="normal"
  //                 fontWeight="700"
  //                 fontSize="16px"
  //                 lineHeight="21px"
  //                 textAlign="right"
  //                 color="#8F00FF"
  //                 ml={'auto'}>
  //                 {project?.maxAllocation}
  //               </Text>
  //             </Flex>
  //             <Flex width={'100%'} mt="8px">
  //               <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
  //                 Type
  //               </Text>
  //               <Text
  //                 fontFamily="Druk Wide Web"
  //                 fontStyle="normal"
  //                 fontWeight="700"
  //                 fontSize="16px"
  //                 lineHeight="21px"
  //                 textAlign="right"
  //                 color="#8F00FF"
  //                 ml={'auto'}>
  //                 {project?.type}
  //               </Text>
  //             </Flex>
  //             <Flex width={'100%'} mt="8px">
  //               <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
  //                 Blockchain
  //               </Text>
  //               <Text
  //                 fontFamily="Druk Wide Web"
  //                 fontStyle="normal"
  //                 fontWeight="700"
  //                 fontSize="16px"
  //                 lineHeight="21px"
  //                 textAlign="right"
  //                 color="#8F00FF"
  //                 ml={'auto'}>
  //                 {project?.maxAllocation}
  //               </Text>
  //             </Flex>
  //           </Flex>
  //         </Flex>
  //       </Flex>
  //     </Flex>
  //     <Flex
  //       className="Information project container"
  //       gridGap={'20px'}
  //       borderRadius="24px"
  //       width={'100%'}
  //       bg="#fff"
  //       mt={'40px'}
  //       border="2px solid #fff"
  //       padding={'20px'}>
  //       <Flex className="Left container mov" width={'25%'} height="100%">
  //         <Flex
  //           bg={'#FAF3FF'}
  //           color="#9D69DE"
  //           flexDir={'column'}
  //           borderRadius="24px"
  //           gridGap={'15px'}
  //           padding="40px">
  //           <Text fontFamily="Druk Wide Web" fontWeight="700" fontSize="16px" color="#9D69DE">
  //             Due Diligence
  //           </Text>
  //           <Text fontFamily="Druk Wide Web" fontWeight="700" fontSize="16px" color="#9D69DE">
  //             Summary
  //           </Text>
  //           <Text fontFamily="Druk Wide Web" fontWeight="700" fontSize="16px" color="#9D69DE">
  //             Problem
  //           </Text>
  //           <Text fontFamily="Druk Wide Web" fontWeight="700" fontSize="16px" color="#9D69DE">
  //             Solution
  //           </Text>
  //           <Text fontFamily="Druk Wide Web" fontWeight="700" fontSize="16px" color="#9D69DE">
  //             Roadmap
  //           </Text>
  //           <Text fontFamily="Druk Wide Web" fontWeight="700" fontSize="16px" color="#9D69DE">
  //             Team
  //           </Text>
  //         </Flex>
  //       </Flex>
  //       <Flex className="Right container Information" width={'75%'} height="100%"></Flex>
  //     </Flex>
  //     <Flex gap="20px" mt={2}>
  //       <Flex bg="#8f00ff" width="40%" p={7} flexDir="column" gap="10px">
  //         <Flex gap="20px" alignItems="center">
  //           <Image src={project?.logo} alt="project logo" w="80px" />
  //           <Heading size="lg">{project?.name}</Heading>
  //         </Flex>
  //         <Flex flexDir="column">
  //           <Text fontSize="lg" fontWeight="bold">
  //             Categories
  //           </Text>
  //           <Flex gap="10px">
  //             {project?.categories?.map((category: string) => (
  //               <Badge bg="white" color="purple.700" px={8} py={2} fontWeight="bold">
  //                 {category}
  //               </Badge>
  //             ))}
  //           </Flex>
  //         </Flex>
  //         <Flex flexDir="column">
  //           <Text fontSize="lg" fontWeight="bold">
  //             Description
  //           </Text>
  //           <Text fontSize="md">{project?.description}</Text>
  //         </Flex>
  //       </Flex>
  //       <Flex bg="#8f00ff" width="60%" p={7} flexDir="column" gap="10px">
  //         <Heading size="md">IDO PROCESS</Heading>
  //         <Flex flexDir="row" mt={5}>
  //           {project?.rounds.map((round: Round, index: number) => (
  //             <Flex flexDir="column" minW="170px">
  //               <Flex
  //                 borderRadius="full"
  //                 alignItems="center"
  //                 justifyContent="center"
  //                 bg={project.currentRoundId === index ? 'purple.700' : 'purple.800'}
  //                 w="50px"
  //                 h="50px"
  //                 mb={5}>
  //                 {index}
  //               </Flex>
  //               <Text fontSize="lg" fontWeight="bold">
  //                 {round.title}
  //               </Text>
  //               <Text fontSize="sm" fontWeight="bold">
  //                 {round.startDate.toLocaleDateString()}
  //               </Text>
  //               <Text fontSize="xs">{round.description}</Text>
  //             </Flex>
  //           ))}
  //         </Flex>
  //       </Flex>
  //     </Flex>
  //     <Flex gap="20px" mt={10}>
  //       <Flex bg="#8f00ff" width="50%" p={7} flexDir="column" gap="10px">
  //         <Heading size="md">ADMISSION</Heading>
  //         <UnorderedList>
  //           <ListItem>Lorem ipsum dolor sit amet</ListItem>
  //           <ListItem>Consectetur adipiscing elit</ListItem>
  //           <ListItem>Integer molestie lorem at massa</ListItem>
  //           <ListItem>Facilisis in pretium nisl aliquet</ListItem>
  //         </UnorderedList>
  //       </Flex>
  //       <Flex bg="#8f00ff" width="50%" p={7} flexDir="column" gap="10px">
  //         <Heading size="md">IDO INFORMATION</Heading>
  //         <Stack direction="column" spacing={6}>
  //           <Flex justifyContent="space-between">
  //             <Text color="gray.100">Total raise</Text>
  //             <Text color="purple.600">
  //               ${project?.totalRaise?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
  //             </Text>
  //           </Flex>
  //           <Flex justifyContent="space-between">
  //             <Text color="gray.100">Token Price</Text>
  //             <Text color="purple.600">$ 0.01</Text>
  //           </Flex>
  //           <Flex justifyContent="space-between">
  //             <Text color="gray.100">Max. Allocation</Text>
  //             <Text color="purple.600">${project?.maxAllocation}</Text>
  //           </Flex>
  //           <Flex justifyContent="space-between">
  //             <Text color="gray.100">Sale Type</Text>
  //             <Text color="purple.600">Vested</Text>
  //           </Flex>
  //         </Stack>
  //       </Flex>
  //     </Flex>
  //   </Layout>
  // )
}

export default ProjectPageContainer
