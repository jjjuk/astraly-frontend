import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from 'layout'
import { Project, Round } from 'interfaces'
import { projects, quests } from 'utils/data'
import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react'
import styles from 'styles/pid.module.scss'
import ClaimOrBurn from 'components/ClaimOrBurn'
import EntryRequirements from 'components/EntryRequirements'
import ApplyNInvest from 'components/ApplyNInvest'
import Requirements from 'components/Requirements'
import Christophe from 'components/Christophe'
import BurnPage from 'components/Pages/Project/Burn/BurnPage'

const BurnContainer = () => {
  return <BurnPage />
  const router = useRouter()
  const { pid } = router.query
  const [project, setProject] = useState<Project | undefined>(undefined)

  useEffect(() => {
    setProject(projects.find((p) => p.id === Number(pid)))
  }, [pid])
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
            Burn for allocation
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
          textTransform="uppercase">
          Burn
        </Heading>
      </Flex>
      <Flex className="Container Project" flexDir={'row'} gridGap="10px">
        <Flex className="Left Container" width={'70%'} flexDir="column" gridGap="20px">
          <ClaimOrBurn idoID={pid} burn />
          <EntryRequirements />
          <ApplyNInvest project={project} />
        </Flex>
        <Image src="/assets/imgs/divider.png" height={'630px'} zIndex="100" mt="auto" mb="auto" />
        <Flex className="Right Container" width={'30%'} flexDir="column" gridGap={'16px'}>
          <Requirements />
          <Christophe project={project} />
        </Flex>
      </Flex>
    </Layout>
  )
}

export default BurnContainer
