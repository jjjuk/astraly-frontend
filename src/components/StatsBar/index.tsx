import {Flex, Text} from '@chakra-ui/react';
import React from 'react';
import Marquee from 'react-fast-marquee';

interface Stat {
  title: string;
  value: string;
}

const Stat = ({title, value}: Stat) => {
  return (
    <Flex gap="10px" margin="0 20px">
      <Text color="black" fontWeight="black">
        {title}
      </Text>
      <Text color="purple.900" fontWeight="black">
        {value}
      </Text>
    </Flex>
  );
};

// borderTop = '1px solid #9D69DE';
// borderBottom = '1px solid #9D69DE';
// justifyContent = 'space-evenly';
// width = '100vw';

const StatsBar = () => {
  return (
    <Marquee
      style={{
        marginTop: '50px',
        background: 'white'
      }}
      gradient={false}
    >
      <Stat title="Average APY" value="83%" />
      <Stat title="Total Value Staked" value="$ 210, 000, 000" />
      <Stat title="ZKP Staked" value="12,000,000 ZKP" />
      <Stat title="ZKP-LP Staked" value="12,000,000 ZKP-LP" />
      <Stat title="Unique Stakers" value="20,000" />
    </Marquee>
  );
};

export default StatsBar;
