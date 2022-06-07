import { ChangeEventHandler } from 'react'
import styles from './UrlInput.module.scss'
import Hint from '../Hint/Hint'
import BaseButton from '../buttons/BaseButton'
import Explore from 'assets/icons/currentColor/Explore.svg?inline'
import Check from 'assets/icons/solid/Check.svg'

const UrlInput = ({
  value,
  onChange,
  setValue,
}: {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  setValue: (value: string) => void
}) => {
  const handlePaste = async () => {
    setValue(await navigator.clipboard.readText())
  }
  return (
    <div
      className={`UrlInput ${styles.urlInputContainer} ${value && styles.urlInputContainerValid}`}>
      <div className="flex items-center flex-shrink-0 mr-6">
        <Explore className={'mr-2'} />
        <div className="font-heading text-12 mr-2 uppercase">Url</div>

        <Hint>Explain</Hint>
      </div>

      <input
        value={value}
        onChange={onChange}
        className={'ml-auto mr-4 text-right bg-transparent w-full'}
        placeholder={'Paste URL here'}
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
