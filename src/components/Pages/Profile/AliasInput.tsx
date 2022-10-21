import React, { FC, useCallback, useEffect, useState } from 'react'
import { useStarknetReact } from '@web3-starknet-react/core'
import { useMutation } from '@apollo/client'
import { UPDATE_PROFILE } from '../../../api/gql/mutations'
import AuthActions from '../../../actions/auth.actions'
import BaseInput from '../../ui/inputs/BaseInput'
import BaseButton from '../../ui/buttons/BaseButton'
import { isSameAddress } from '../../../utils'
import { useSelector, useStore } from 'react-redux'
import { useAppDispatch } from 'hooks/hooks'
import ButtonTitle from 'components/ui/buttons/ButtonTitle'

const AliasInput: FC<{ user?: any; isSelf?: boolean }> = ({ user, isSelf = false }) => {
  const { account } = useStarknetReact()
  const [alias, setAlias] = useState('')
  const [mutateFunction] = useMutation(UPDATE_PROFILE)
  const [isEditing, setIsEditing] = useState(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    setAlias(user?.alias ?? '')
  }, [user?.alias])

  const saveAlias = useCallback(async () => {
    setIsEditing(false)
    const { data } = await mutateFunction({
      variables: {
        data: {
          alias,
        },
      },
    })

    data.updateAccount && dispatch(AuthActions.fetchSuccess(data.updateAccount))
  }, [alias])

  if (!isSelf) {
    return <div className="ml-6">{user.alias}</div>
  }

  return (
    <div className="flex items-center gap-4 ml-6">
      {!isEditing && user?.alias && <div>{user.alias}</div>}
      {!isEditing && (
        <BaseButton xSmall={true} onClick={() => setIsEditing(true)}>
          <ButtonTitle title={!user?.alias ? 'Add Username' : 'change'} />
        </BaseButton>
      )}
      {isEditing && (
        <>
          <BaseInput
            size={'sm'}
            value={alias}
            type="text"
            onChange={(e) => {
              setAlias(e.target.value)
            }}
          />
          <BaseButton xSmall={true} onClick={saveAlias}>
            <ButtonTitle title="Save" />
          </BaseButton>
        </>
      )}
    </div>
  )
}

export default AliasInput
