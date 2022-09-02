import { ProjectType } from 'interfaces'
import React from 'react'

const AllocationBurnInfo = ({ projectType }: { projectType: ProjectType }) => {
  return (
    <div className="block--contrast">
      <div className="mb-6 title--medium">Burn tickets</div>

      <p className="text-primaryClear leading-138">
        We are excited to launch our {projectType} on Astraly. For a chance to win an allocation,
        please fill out the form below and perform all tasks accordingly.
      </p>

      <p className="mt-6 uppercase text-primaryClear">Good Luck! 🚀</p>
    </div>
  )
}

const AllocationClaimInfo = ({ projectType }: { projectType: ProjectType }) => {
  return (
    <div className="block--contrast">
      <div className="mb-6 title--medium">Claim your tickets</div>

      <p className="text-primaryClear leading-138">
        We are excited to launch our {projectType} on Astraly. For a chance to win an allocation,
        please fill out the form below and perform all tasks accordingly.
      </p>

      <p className="mt-6 uppercase text-primaryClear">Good Luck! 🚀</p>
    </div>
  )
}

const AllocationPurchaseInfo = ({ projectType }: { projectType: ProjectType }) => {
  return (
    <div className="block--contrast">
      <div className="mb-6 title--medium">Participate in the {projectType}</div>

      <p className="text-primaryClear leading-138">
        We are excited to launch our {projectType} on Astraly. For a chance to win an allocation,
        please fill out the form below and perform all tasks accordingly.
      </p>

      <p className="mt-6 uppercase text-primaryClear">Good Luck! 🚀</p>
    </div>
  )
}

const AllocationInfo: React.FC<{
  type?: 'claim' | 'burn' | 'purchase'
  projectType: ProjectType
}> = ({ type = 'claim', projectType = ProjectType.IDO }) => {
  return (
    <div className="block AllocationInfo">
      {type === 'claim' && <AllocationClaimInfo projectType={projectType} />}
      {type === 'burn' && <AllocationBurnInfo projectType={projectType} />}
      {type === 'purchase' && <AllocationPurchaseInfo projectType={projectType} />}

      <div className="block__item">
        <div className="mb-4 title--small">Conditions of entry</div>

        <ul className="ml-4 list-disc text-primaryClear leading-138">
          <li className="mb-5">
            On Astraly, every xASTR holder can claim or buy tickets. However, due to the
            current jurisdiction, only users from countries where it is legally allowed to
            participate in {projectType}s will be able to receive an allocation and invest.
          </li>
          <li className="mb-5">
            ALL participants will be screened and cross-checked. These are a few of the possible
            violations that will lead to automatic allow list disqualification:
          </li>
          <li className="mb-5">Prohibited countries of origin:</li>
          List of countries prohibited from participating: United States of America, China, Cuba,
          North Korea, Timor-Leste, Cambodia, Laos, Tanzania, Serbia, Tunisia, Uganda, Mali,
          Pakistan, Afghanistan, Somalia, Zimbabwe, Congo, Malawi, Mozambique, Crimea, Kyrgyzstan,
          Uzbekistan, Turkmenistan, Burundi, South Sudan, Sudan (north), Sudan (Darfur),
          Guinea-Bissau, Kosovo, Iran, Iraq, Libya, Russia, Syria, Ethiopia, Yemen, Sri Lanka,
          Belarus, and Venezuela
        </ul>
      </div>
    </div>
  )
}

export default AllocationInfo
