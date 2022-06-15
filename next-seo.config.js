/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: 'Astraly - Fundraising and community engagement platform on Starknet.',
  titleTemplate: '%s',
  defaultTitle: 'Astraly - Fundraising and community engagement platform on Starknet.',
  description: 'Target the right people for the right projects.',
  canonical: 'https://astraly.xyz/',
  openGraph: {
    url: 'https://astraly.xyz/',
    title: 'Astraly App',
    description: 'Target the right people for the right projects.',
    images: [
      {
        url: 'https://astraly.xyz/images/home/banner_3d_full.png',
        alt: 'Astraly',
        width: 800,
        height: 420,
      },
    ],
    site_name: 'Astraly',
  },
  twitter: {
    cardType: 'summary_large_image',
    site: '@AstralyXYZ',
    handle: '@AstralyXYZ',
  },
}

export default defaultSEOConfig
