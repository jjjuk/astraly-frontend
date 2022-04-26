/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: 'ZkPad - 1st decentralized launchpad on Starknet',
  titleTemplate: '%s',
  defaultTitle: 'ZkPad - 1st decentralized launchpad on Starknet',
  description: "We're building a venture investment platform for all.",
  canonical: 'https://app.zkpad.io/',
  openGraph: {
    url: 'https://app.zkpad.io/',
    title: 'ZkPad App',
    description: "We're building a venture investment platform for all.",
    images: [
      {
        url: 'https://zkpad.io/images/home/banner_3d_full.png',
        alt: 'ZkPad',
        width: 800,
        height: 420
      }
    ],
    site_name: 'ZkPad'
  },
  twitter: {
    cardType: 'summary_large_image',
    site: '@ZkPadfi',
    handle: '@ZkPadfi'
  }
};

export default defaultSEOConfig;
