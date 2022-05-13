import React from 'react';
import {
  Flex,
  HStack,
  SimpleGrid,
  Box,
  Text,
  Link,
  Image,
  useDisclosure,
  Heading
} from '@chakra-ui/react';
import NavLink from '../components/NavLink';
import {
  CareerLink,
  WhitepaperLink,
  TwitterLink,
  DiscordLink,
  GitHubLink,
  TelegramLink,
  TermConditionLink,
  PrivacyPolicyLink
} from '../constants';

interface Props {}

const Footer = (props: Props) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <Flex direction={['column', 'row']} justify="space-between" pt="20px" pb="20px">
      <Box mt="15px">
        <HStack spacing={['10px', '45px']} justify="space-between">
          <Flex justify="space-between" wrap="wrap" gap={{base: '20px', lg: '30px'}}>
            <NavLink name="Whitepaper" href={WhitepaperLink} />
            <NavLink name="Twitter" href={TwitterLink} />
            <NavLink name="Discord" href={DiscordLink} />
            <NavLink name="GitHub" href={GitHubLink} />
            {/* <NavLink name={`Terms & Condition`} href={TermConditionLink} />
            <NavLink name={`Privacy & Policy`} href={PrivacyPolicyLink} /> */}
          </Flex>
        </HStack>
      </Box>
      <Flex direction={['column', 'row']} justify="space-between">
        <Text color="gray.400" mt="15px" mr="50px">
          Get in touch:{' '}
          <Link color="purple.900" href="mailto: contact@zkpad.io">
            contact@zkpad.io
          </Link>
        </Text>
        <Link href="/">
          <Flex align="center" mr={5}>
            <Image src="/images/logo.png" alt="zkPad" mr="4" h="57px" />
            <Heading fontSize="24px" mt="5px" color="black">
              ZKPAD
            </Heading>
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Footer;
