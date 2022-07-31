import FaqItem from './FaqItem'

const FaqBlock = () => {
  return (
    <div className="ui-page-block" id="faq">
      <div className="g-container">
        <h2 className="t-block-title t-dark">FAQ</h2>
        <div className="ml-10">
          <FaqItem question="What is StarkNet and how to set up a wallet ? ">
            StarkNet is a L2 scaling solution of Ethereum. It allows users to benefit from lower gas
            fees and very cheap computation, allowing a brand new generation of Dapps to be
            developed. In order to interact with StarkNet and use Astraly, you’ll need to get a
            compatible wallet like Argent X or Braavos.
          </FaqItem>
          <FaqItem question="How to participate in the listed projects ?">
            To participate in the listed projects on the testnet you’ll need to go through several
            steps:
            <br />
            <br />
            <ul>
              <li>• Get testnet $ASTR tokens: https://testnet.astraly.xyz/buy</li>
              <li>
                • Lock your $ASTR tokens in our vault in order to get lottery tickets:
                https://testnet.astraly.xyz/stake
              </li>
              <li>• Claim your lottery ticket for the project you would like to invest in.</li>
              <li>• Go through the quests to increase your chances of getting an allocation.</li>
              <li>• Burn your lottery tickets to get your allocations.</li>
              <li>• Invest in the project.</li>
            </ul>{' '}
            <br />
            You’ll find more detailed steps of this process including screenshots here:
            https://wp.astraly.xyz/step-by-step-guide
          </FaqItem>
          <FaqItem question="What’s an INO and an IDO ?">
            INO = Initial NFT Offering. As the NFT market matures, Initial NFT Offering rises as a
            solution to incentivize and reward investors and communities by allowing them to
            purchase utility NFTs of a project before their launch. <br />
            <br />
            IDO = Initial DEX offering. An IDO is a crypto token offering run on a Decentralized
            Exchange (DEX). Liquidity pools (LP) play an essential role in IDO's by creating
            liquidity post-sale. A typical IDO lets users lock funds in exchange for new tokens
            during the token generation event. Some of the raised funds are then added with the new
            token to an LP before being returned later to the project.
          </FaqItem>
          <FaqItem question="How are projects selected ?">
            Projects go through a due diligence process including a review of: <br />
            <br />• The team and their backgrounds <br />• The tokenomics of the projects <br />•
            The codebase and eventual audits <br />
            <br />
            All the selected projects are also reviewed by our board of mentors and advisors
            including seasoned crypto startup founders and former executives at other leading
            launchpads.
          </FaqItem>
          <FaqItem question="How are backers selected for each project ?">
            There are 3 factors that come into play to determine who is most likely to get an
            allocation on the listed projects: <br />
            <br />
            1. Past on-chain activity: projects are looking at token holders that will bring the
            most value to the project. For instance, a metaverse project launching on StarkNet will
            prioritize users that were active creators in other metaverse projects in the past.
            <br />
            <br />
            2. Quest completion: completion of the quests listed with every project will further
            increase your chances of getting an allocation. <br />
            <br />
            3. Number of $ASTR tokens locked: the more $ASTR tokens you lock, the more lottery
            tickets you’ll get for each listed project. This has a consequent impact on your chances
            of getting an allocation.
          </FaqItem>
        </div>
      </div>
    </div>
  )
}

export default FaqBlock
