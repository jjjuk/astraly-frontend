import { Quest, QuestType } from '../../interfaces'
import { useEffect, useState } from 'react'
import BaseAdminInput from '../ui/inputs/BaseAdminInput'
import BaseButton from '../ui/buttons/BaseButton'
import { useMutation } from '@apollo/client'
import { UPDATE_QUEST } from '../../api/gql/mutations'
import { useRouter } from 'next/router'
import ToastActions from '../../actions/toast.actions'
import { ToastState } from '../ui/Toast/utils'
import { useAppDispatch } from '../../hooks/hooks'
import BaseButtonsGroup from '../ui/inputs/BaseButtonsGroup'
import AdminInputGroup from '../ui/inputs/AdminInputGroup'
import _ from 'lodash'

const QuestForm = ({ quest }: { quest: Quest }) => {
  const [questForm, setQuestForm] = useState({} as Quest)
  const [title, setTitle] = useState('New Quest')
  const [saveMutation] = useMutation(UPDATE_QUEST)
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    setQuestForm(_.cloneDeep(quest))
  }, [quest])

  useEffect(() => {
    setTitle(questForm.name ?? 'New Quest')
  }, [questForm.name])

  const saveQuest = async () => {
    saveMutation({
      variables: {
        data: {
          _id: questForm._id,
          name: questForm.name,
          description: questForm.description,
          icon: questForm.icon,
          idoId: questForm.idoId != null ? Number(questForm.idoId) : null,
          link: questForm.link,
          type: questForm.type,
          subType: questForm.subType,
          event: {
            name: questForm.event?.name || null,
            transmitterContract: questForm.event?.transmitterContract || null,
            callData: questForm.event?.callData
              ? questForm.event?.callData.map((x) => ({
                  name: x.name,
                  type: x.type,
                  ...(x.type === 'Uint256'
                    ? {
                        value: {
                          low: Number(x.value.low),
                          high: Number(x.value.high),
                        },
                      }
                    : {
                        value: {
                          value: x.value.value,
                        },
                      }),
                }))
              : [],
          },
        },
      },
    }).then(({ data }) => {
      dispatch(
        ToastActions.addToast({
          title: 'Success',
          action: <div className="font-heading text-12 text-primary">Quest saved</div>,
          state: ToastState.VALID,
          autoClose: true,
        })
      )
      if (!questForm._id) {
        router.replace(`/admin/quests/${data.updateQuest._id}`)
      }
    })
  }

  const setField =
    (
      field: string,
      parent?: keyof Quest,
      subParent?: 'callData',
      index?: number,
      subField?: string
    ) =>
    (e: any) => {
      const quest = {
        ...questForm,
      }

      if (parent && subParent && index != null && subField) {
        // @ts-ignore
        if (!quest[parent][subParent][index][subField]) {
          // @ts-ignore
          quest[parent][subParent][index][subField] = {}
        }

        // @ts-ignore
        quest[parent][subParent][index][subField][field] = e.target.value as any
      } else if (parent && subParent && index != null) {
        // @ts-ignore
        quest[parent][subParent][index][field] = e.target.value as any
      } else if (parent) {
        // @ts-ignore
        if (!quest[parent]) {
          // @ts-ignore
          quest[parent] = {}
        }
        // @ts-ignore
        quest[parent][field] = e.target.value as any
      } else {
        // @ts-ignore
        quest[field] = e.target.value as any
      }

      setQuestForm(quest)
    }

  const addCallData = () => {
    setQuestForm({
      ...questForm,
      // @ts-ignore
      event: {
        ...questForm.event,
        callData: [
          ...(questForm.event?.callData ? questForm.event.callData : []),
          {
            name: '',
            type: '',
            value: {
              low: '',
              high: '',
            },
          },
        ],
      },
    })
  }
  return (
    <div className="QuestForm g-container">
      <div className="grid grid-cols-3">
        <div className="col">
          <div className="text-24 font-heading mb-4 flex">
            {title}
            <BaseButton small={true} className="px-4 ml-8" onClick={saveQuest}>
              Save
            </BaseButton>
          </div>

          <BaseAdminInput label={'name'} value={questForm.name || ''} onChange={setField('name')} />

          <BaseAdminInput
            label={'description'}
            value={questForm.description || ''}
            onChange={setField('description')}
          />

          <AdminInputGroup left={'Icon'} onClick={() => {}}>
            <BaseButtonsGroup
              options={[
                { label: 'twitter', value: 'twitter' },
                { label: 'discord', value: 'discord' },
                { label: 'send', value: 'send' },
                { label: 'lock', value: 'lock' },
              ]}
              value={questForm.icon}
              onInput={(value) =>
                setField('icon')({
                  target: {
                    value,
                  },
                })
              }
            />
          </AdminInputGroup>

          <AdminInputGroup left={'Type'} onClick={() => {}}>
            <BaseButtonsGroup
              options={[
                { label: 'Social', value: QuestType.SOCIAL },
                { label: 'Product', value: QuestType.PRODUCT },
              ]}
              value={questForm.type}
              onInput={(value) =>
                setField('type')({
                  target: {
                    value,
                  },
                })
              }
            />
          </AdminInputGroup>

          <AdminInputGroup left={'SubType'} onClick={() => {}}>
            <BaseButtonsGroup
              options={[
                { label: 'Follow', value: 'follow' },
                { label: 'Retweet', value: 'retweet' },
              ]}
              value={questForm.subType || ''}
              onInput={(value) =>
                setField('subType')({
                  target: {
                    value,
                  },
                })
              }
            />
          </AdminInputGroup>

          <BaseAdminInput label={'link'} value={questForm.link || ''} onChange={setField('link')} />
          <BaseAdminInput
            label={'idoId'}
            value={String(questForm.idoId) || ''}
            onChange={setField('idoId')}
          />
        </div>

        <div className="col">
          <div className="text-24 font-bold mb-4">Event</div>

          <BaseAdminInput
            label={'name'}
            value={questForm.event?.name || ''}
            onChange={setField('name', 'event')}
          />
          <BaseAdminInput
            label={'transmitterContract'}
            value={questForm.event?.transmitterContract || ''}
            onChange={setField('transmitterContract', 'event')}
          />
        </div>

        <div className="col">
          <div className="text-24 font-bold">callData</div>
          <div className="text-14 text-primary" onClick={addCallData}>
            + add
          </div>

          {questForm.event?.callData?.map((callData, index) => (
            <div key={index} className="bg-primaryClearBg rounded-3xl mb-4 p-8">
              <div className="text-18 font-bold">{index}</div>
              <BaseAdminInput
                label={'name'}
                value={callData.name || ''}
                onChange={setField('name', 'event', 'callData', index)}
              />

              <AdminInputGroup left={'Type'} onClick={() => {}}>
                <BaseButtonsGroup
                  options={[
                    { label: 'Uint256', value: 'Uint256' },
                    { label: 'Felt', value: 'Felt' },
                  ]}
                  value={callData.type}
                  onInput={(value) =>
                    setField(
                      'type',
                      'event',
                      'callData',
                      index
                    )({
                      target: {
                        value,
                      },
                    })
                  }
                />
              </AdminInputGroup>

              {callData.type === 'Uint256' && (
                <>
                  <BaseAdminInput
                    label={'low'}
                    value={callData.value.low || ''}
                    onChange={setField('low', 'event', 'callData', index, 'value')}
                  />

                  <BaseAdminInput
                    label={'high'}
                    value={callData.value.high || ''}
                    onChange={setField('high', 'event', 'callData', index, 'value')}
                  />
                </>
              )}

              {callData.type !== 'Uint256' && (
                <>
                  <BaseAdminInput
                    label={'value'}
                    value={callData.value.value || ''}
                    onChange={setField('value', 'event', 'callData', index, 'value')}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuestForm
