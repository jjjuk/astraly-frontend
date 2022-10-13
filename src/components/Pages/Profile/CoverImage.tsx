import React, { FC, useEffect } from 'react'
import { uploadToS3 } from '../../../utils/upload-file'
import AuthActions from '../../../actions/auth.actions'
import { useFileChange } from '../../../utils/fileChange'
import { useMutation } from '@apollo/client'
import { UPDATE_PROFILE } from '../../../api/gql/mutations'
import { useAppDispatch } from '../../../hooks/hooks'

const CoverImage: FC<{ user?: any; isSelf?: boolean }> = ({ user, isSelf = false }) => {
  const { fileName, fileContents, fileType, fileDispatch, handleFileChange } = useFileChange()
  const [mutateFunction] = useMutation(UPDATE_PROFILE)
  const dispatch = useAppDispatch()

  const handleUpload = async () => {
    if (!fileName) {
      return
    }

    try {
      if (fileType && fileContents) {
        const file = await uploadToS3({ fileType, fileContents })

        console.log({
          file,
        })

        // console.log('filePath is', filePath);
        fileDispatch({ type: 'RESET_FILE_STATE' })

        mutateFunction({
          variables: {
            data: {
              cover: file._id,
            },
          },
        }).then(({ data }) => {
          dispatch(AuthActions.fetchSuccess(data.updateAccount))
        })
      }
    } catch (err) {
      console.log('error is', err)
    }
  }
  useEffect(() => {
    handleUpload()
  }, [fileName])

  return (
    <label
      htmlFor={'picture'}
      className="border border-2 border-white bg-primaryClearBg dark:bg-gray3 dark:border-primary rounded-3xl h-50 flex items-center justify-center overflow-hidden cursor-pointer group">
      {isSelf && (
        <div
          className={`border-2 border-primaryClear text-primaryClear dark:text-white font-heading text-12 px-4 rounded-xl py-1 bg-white dark:bg-gray3 absolute transition-all ${
            user?.cover ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          }`}>
          {user?.cover ? 'Change cover' : 'Add cover image'}
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        id="picture"
        name="picture"
        className="hidden"
        onChange={handleFileChange}
      />

      {user && user.cover && (
        <img
          src={user.cover}
          alt={''}
          className={'w-full pointer-events-none h-full object-cover '}
        />
      )}
    </label>
  )
}

export default CoverImage
