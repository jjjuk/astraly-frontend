import { Project } from '../../interfaces'
import { FC, useEffect, useState } from 'react'
import BaseAdminInput from '../ui/inputs/BaseAdminInput'
import _ from 'lodash'
import BaseButton from '../ui/buttons/BaseButton'
import ImageUpload from '../ui/inputs/ImageUpload'
import AdminInputGroup from '../ui/inputs/AdminInputGroup'
import styles from './ProjectForm.module.scss'
import classNames from 'classnames'
import DatePicker from '../ui/inputs/DatePicker'
import VideoUpload from '../ui/inputs/VideoUpload'
import { useMutation } from '@apollo/client'
import { UPDATE_PROJECT, UPDATE_QUEST } from '../../api/gql/mutations'

const ProjectForm: FC<{ project: Project }> = ({ project }) => {
  const [projectForm, setProjectForm] = useState({} as Project)
  const [title, setTitle] = useState('New project')
  const [saveMutation] = useMutation(UPDATE_PROJECT)
  const [mediaUrl, setMediaUrl] = useState('')

  const saveProject = async () => {
    saveMutation({
      variables: {
        data: {
          idoId: projectForm.idoId,
          name: projectForm.name,
          description: projectForm.description,
          // @ts-ignore
          logo: projectForm.logoId,
          // @ts-ignore
          cover: projectForm.coverId,
          // @ts-ignore
          coverVideo: projectForm.coverVideoId,
          ticker: projectForm.ticker,
          categories: projectForm.categories,
          rounds: projectForm.rounds.map((x) => {
            return {
              title: x.title,
              description: x.description,
              startDate: x.startDate,
              endDate: x.endDate,
            }
          }),
          links: projectForm.links?.map((x) => ({ key: x.key, value: x.value })) ?? [],
          projectDescription:
            projectForm.projectDescription?.map((x) => ({ key: x.key, value: x.value })) ?? [],
          admission: projectForm.admission,
          totalRaise: projectForm.totalRaise != null ? Number(projectForm.totalRaise) : undefined,
          tokenAddress: projectForm.tokenAddress,
          tokenPrice: projectForm.tokenPrice != null ? Number(projectForm.tokenPrice) : undefined,
          maxAllocation:
            projectForm.maxAllocation != null ? Number(projectForm.maxAllocation) : undefined,
        },
      },
    })
  }

  useEffect(() => {
    const clone = _.cloneDeep(project)
    if (!project.projectDescription) {
      clone.projectDescription = [
        {
          key: 'Highlights',
          value: '',
        },
        {
          key: 'Summary',
          value: '',
        },
        {
          key: 'Problem',
          value: '',
        },
        {
          key: 'Solution',
          value: '',
        },
        {
          key: 'Roadmap',
          value: '',
        },
        {
          key: 'Team',
          value: '',
        },
        {
          key: 'Backers',
          value: '',
        },
      ]
    }
    setProjectForm(clone)
  }, [project])

  useEffect(() => {
    setTitle(projectForm.name || 'New Project')
  }, [projectForm.name])

  const setField = (field: string, index?: number, subfield?: string) => (e: any) => {
    const project = {
      ...projectForm,
    }

    if (index != null && subfield) {
      // @ts-ignore
      project[field][index][subfield] = e.target.value
    } else if (index != null) {
      // @ts-ignore
      project[field][index] = e.target.value
    } else {
      console.log(field, e.target.value)
      // @ts-ignore
      project[field] = e.target.value
    }

    setProjectForm(project)
  }

  const setDescription = (key: string) => (e: any) => {
    const index = projectForm.projectDescription?.findIndex((x) => x.key === key)
    setField('projectDescription', index, 'value')(e)
  }

  const getDescription = (key: string) => {
    const index = projectForm.projectDescription?.findIndex((x) => x.key === key)

    // @ts-ignore
    return projectForm.projectDescription && projectForm.projectDescription[index]
      ? // @ts-ignore
        projectForm.projectDescription[index]['value']
      : ''
  }

  const addLink = () => {
    setProjectForm({
      ...projectForm,
      links: [
        ...(projectForm.links ?? []),
        {
          key: '',
          value: '',
        },
      ],
    })
  }

  const addCategory = () => {
    setProjectForm({
      ...projectForm,
      categories: [...(projectForm.categories ?? []), ''],
    })
  }
  const addRound = () => {
    setProjectForm({
      ...projectForm,
      rounds: [
        ...(projectForm.rounds ?? []),
        {
          title: '',
          description: '',
          startDate: new Date(),
          endDate: new Date(),
        },
      ],
    })
  }

  const removeLink = (index: number) => {
    setProjectForm({
      ...projectForm,
      links: projectForm.links?.filter((x, i) => i !== index) ?? [],
    })
  }
  const removeCategory = (index: number) => {
    setProjectForm({
      ...projectForm,
      categories: projectForm.categories?.filter((x, i) => i !== index) ?? [],
    })
  }
  const removeRound = (index: number) => {
    setProjectForm({
      ...projectForm,
      rounds: projectForm.rounds?.filter((x, i) => i !== index) ?? [],
    })
  }

  return (
    <div className={classNames(styles.ProjectForm, 'ProjectForm g-container')}>
      <div className="col relative">
        <div className="text-24 font-heading mb-4 flex sticky top-0 left-0 bg-white p-6 z-10">
          {title}
          <BaseButton small={true} className="px-4 ml-8" onClick={saveProject}>
            Save
          </BaseButton>
        </div>
        <BaseAdminInput
          label={'Ticker'}
          value={projectForm.ticker || ''}
          onChange={setField('ticker')}
        />

        <BaseAdminInput label={'Name'} value={projectForm.name || ''} onChange={setField('name')} />
        <BaseAdminInput
          label={'Description'}
          value={projectForm.description || ''}
          onChange={setField('description')}
        />

        <BaseAdminInput
          label={'Admission'}
          value={projectForm.admission || ''}
          onChange={setField('admission')}
        />

        <div className="grid grid-cols-4 gap-4 my-10">
          <BaseAdminInput
            label={'Total raise'}
            value={String(projectForm.totalRaise) || ''}
            onChange={setField('totalRaise')}
          />

          <BaseAdminInput
            label={'token Address'}
            value={projectForm.tokenAddress || ''}
            onChange={setField('tokenAddress')}
          />

          <BaseAdminInput
            label={'Token Price'}
            value={String(projectForm.tokenPrice) || ''}
            onChange={setField('tokenPrice')}
          />

          <BaseAdminInput
            label={'Max Allocation'}
            value={String(projectForm.maxAllocation) || ''}
            onChange={setField('maxAllocation')}
          />
        </div>

        <AdminInputGroup left={<span>Logo</span>} onClick={() => {}}>
          <ImageUpload
            src={projectForm.logo}
            onChange={({ _id, filePath }) => {
              setProjectForm({
                ...projectForm,
                logo: filePath,
                // @ts-ignore
                logoId: _id,
              })
            }}
          />
        </AdminInputGroup>
        <AdminInputGroup left={<span>Image cover</span>} onClick={() => {}}>
          <ImageUpload
            src={projectForm.cover}
            onChange={({ _id, filePath }) => {
              setProjectForm({
                ...projectForm,
                cover: filePath,
                // @ts-ignore
                coverId: _id,
              })
            }}
          />
        </AdminInputGroup>
        <AdminInputGroup left={<span>Video cover</span>} onClick={() => {}}>
          <VideoUpload
            src={projectForm.coverVideo}
            onChange={({ _id, filePath }) => {
              setProjectForm({
                ...projectForm,
                coverVideo: filePath,
                // @ts-ignore
                coverVideoId: _id,
              })
            }}
          />
        </AdminInputGroup>
        <h3 className="flex uppercase font-bold text-24">
          Links{' '}
          <BaseButton xSmall={true} onClick={addLink} className="ml-4">
            add{' '}
          </BaseButton>
        </h3>
        {projectForm.links?.map((x, index) => (
          <div className="flex gap-4 items-center" key={index}>
            <BaseAdminInput
              label={'type'}
              value={x.key}
              onChange={setField('links', index, 'key')}
            />
            <BaseAdminInput
              label={'link'}
              value={x.value}
              onChange={setField('links', index, 'value')}
            />
            <div className="delete cursor-pointer" onClick={() => removeLink(index)}>
              remove
            </div>
          </div>
        ))}
        <h3>Content</h3>
        <ImageUpload
          src={mediaUrl}
          onChange={({ filePath }) => {
            setMediaUrl(filePath)
          }}
        />
        {mediaUrl}
        <AdminInputGroup left={<span>Highlights</span>} onClick={() => {}}>
          <textarea onChange={setDescription('Highlights')} value={getDescription('Highlights')} />
        </AdminInputGroup>
        <AdminInputGroup left={<span>Summary</span>} onClick={() => {}}>
          <textarea onChange={setDescription('Summary')} value={getDescription('Summary')} />
        </AdminInputGroup>
        <AdminInputGroup left={<span>Problem</span>} onClick={() => {}}>
          <textarea onChange={setDescription('Problem')} value={getDescription('Problem')} />
        </AdminInputGroup>
        <AdminInputGroup left={<span>Solution</span>} onClick={() => {}}>
          <textarea onChange={setDescription('Solution')} value={getDescription('Solution')} />
        </AdminInputGroup>
        <AdminInputGroup left={<span>Roadmap</span>} onClick={() => {}}>
          <textarea onChange={setDescription('Roadmap')} value={getDescription('Roadmap')} />
        </AdminInputGroup>
        <AdminInputGroup left={<span>Team</span>} onClick={() => {}}>
          <textarea onChange={setDescription('Team')} value={getDescription('Team')} />
        </AdminInputGroup>
        <AdminInputGroup left={<span>Backers</span>} onClick={() => {}}>
          <textarea onChange={setDescription('Backers')} value={getDescription('Backers')} />
        </AdminInputGroup>
        <h3 className="flex items-center">
          Categories
          <BaseButton xSmall={true} onClick={addCategory} className="ml-4">
            add{' '}
          </BaseButton>
        </h3>
        {projectForm.categories?.map((x, index) => (
          <div key={index} className="flex items-center gap-4">
            <BaseAdminInput label={''} value={x} onChange={setField('categories', index)} />
            <div className="delete cursor-pointer" onClick={() => removeCategory(index)}>
              remove
            </div>
          </div>
        ))}
        <h3 className="flex items-center">
          Rounds
          <BaseButton xSmall={true} onClick={addRound} className="ml-4">
            add{' '}
          </BaseButton>
        </h3>
        {projectForm.rounds?.map((x, index) => (
          <div key={index} className="mb-4">
            <h4 className="flex">
              Round {index + 1}
              <div
                className="delete cursor-pointer ml-4 font-bold"
                onClick={() => removeRound(index)}>
                remove
              </div>
            </h4>
            <div className="flex gap-4 items-center">
              <BaseAdminInput
                label={'title'}
                value={x.title}
                onChange={setField('rounds', index, 'title')}
              />
              <BaseAdminInput
                label={'description'}
                value={x.description}
                onChange={setField('rounds', index, 'description')}
              />
              <DatePicker
                value={new Date(x.startDate)}
                onInput={(e) =>
                  setField(
                    'rounds',
                    index,
                    'startDate'
                  )({
                    target: { value: e },
                  })
                }
              />
              <DatePicker
                value={new Date(x.endDate)}
                onInput={(e) =>
                  setField(
                    'rounds',
                    index,
                    'endDate'
                  )({
                    target: { value: e },
                  })
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectForm
