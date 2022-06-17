import { ChangeEventHandler, useEffect, useState } from 'react'
import styles from './UrlInput.module.scss'
import Hint from '../Hint/Hint'
import BaseButton from '../buttons/BaseButton'
import Explore from 'assets/icons/currentColor/Explore.svg?inline'
import Gear from 'assets/icons/currentColor/Gear.svg?inline'
import Check from 'assets/icons/solid/Check.svg'
import { QuestType } from '../../../interfaces'

const UrlInput = ({
  questType,
  value,
  onChange,
  setValue,
}: {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  setValue: (value: string) => void
  questType: QuestType
}) => {
  const handlePaste = async () => {
    setValue(await navigator.clipboard.readText())
  }
  const defaultOptions = {
    icon: <Explore className={'mr-2'} />,
    label: 'Url',
    placeholder: 'Paste URL here',
  }
  const [options, setOptions] = useState(defaultOptions)

  useEffect(() => {
    setOptions(
      questType === 'PRODUCT'
        ? {
            icon: <Gear className={'mr-2'} />,
            label: 'HASH',
            placeholder: 'Paste Transaction Hash here',
          }
        : defaultOptions
    )
  }, [questType])
  return (
    <div
      className={`UrlInput ${styles.urlInputContainer} ${value && styles.urlInputContainerValid}`}>
      <div className="flex items-center flex-shrink-0 mr-6">
        {options.icon}
        <div className="font-heading text-12 mr-2 uppercase">{options.label}</div>

        <Hint>You can find the transaction hash on voyager or on your Argent X wallet.</Hint>
      </div>

      <input
        value={value}
        onChange={onChange}
        className={'ml-auto mr-4 text-right bg-transparent w-full'}
        placeholder={options.placeholder}
      />

      {!value && (
        <BaseButton xSmall={true} className={'uppercase'} onClick={handlePaste}>
          Paste
        </BaseButton>
      )}

      {value && <img src={Check} alt={''} />}
    </div>
  )
}

export default UrlInput
