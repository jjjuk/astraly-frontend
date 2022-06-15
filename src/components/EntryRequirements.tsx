import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

const EntryRequirements = () => {
  return (
    <Flex width={'100%'} bg="#fff" border={'2px #fff solid'} borderRadius="24px" flexDir={'column'}>
      <Flex
        bg={'#FAF3FF'}
        borderRadius="24px"
        width={'100%'}
        padding="25px"
        gridGap={'24px'}
        flexDir="column">
        <Text
          fontFamily="Druk Wide Web"
          fontWeight="700"
          fontSize="24px"
          lineHeight="31px"
          color="#370063">
          Get your Allocation
        </Text>
        <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
          We are excited to launch our IDO on Astraly. For a chance to win an allocation, please
          fill out the form below and perform all tasks accordingly.
        </Text>
        <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
          Good Luck!
        </Text>
      </Flex>
      <Flex flexDir={'column'} padding="25px" gridGap={'16px'}>
        <Text
          fontFamily="Druk Wide Web"
          fontWeight="700"
          fontSize="16px"
          lineHeight="21px"
          color="#9D69DE">
          Conditions of Entry
        </Text>
        <Text fontSize="16px" lineHeight="22px" color="#9D69DE">
          On Astraly, every holder xZKP holder can claim or buy tickets. However, due to the current
          jurisdiction, only users from countries where it is legally allowed to participate in IDOs
          will be able to receive an allocation and invest. <br />
          <br />
          ALL participants will be screened and cross-checked. These are a few of the possible
          violations that will lead to automatic allowlist disqualification: <br />
          <br />
          List of countries prohibited from participating: United States of America, China, Cuba,
          North Korea, Timor-Leste, Cambodia, Laos, Tanzania, Serbia, Tunisia, Uganda, Mali,
          Pakistan, Afghanistan, Somalia, Zimbabwe, Congo, Malawi, Mozambique, Crimea, Kyrgyzstan,
          Uzbekistan, Turkmenistan, Burundi, South Sudan, Sudan (north), Sudan (Darfur),
          Guinea-Bissau, Kosovo, Iran, Iraq, Libya, Russia, Syria, Ethiopia, Yemen, Sri Lanka,
          Belarus, and Venezuela
        </Text>
      </Flex>
    </Flex>
  )
}

export default EntryRequirements
