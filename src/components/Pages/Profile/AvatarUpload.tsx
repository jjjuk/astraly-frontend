import React, { useEffect } from 'react'
import { uploadToS3 } from '../../../utils/upload-file'
import AuthActions from '../../../actions/auth.actions'
import { useFileChange } from '../../../utils/fileChange'
import { useMutation } from '@apollo/client'
import { UPDATE_PROFILE } from '../../../api/gql/mutations'
import { useAppDispatch } from '../../../hooks/hooks'
import { useSelector } from 'react-redux'
import { RootState } from '../../../stores/reduxStore'
import HexagonImage from '../../ui/HexagonImage'

const AvatarUpload = () => {
  const { fileName, fileContents, fileType, fileDispatch, handleFileChange } = useFileChange()
  const [mutateFunction] = useMutation(UPDATE_PROFILE)
  const dispatch = useAppDispatch()

  const { user } = useSelector((state: RootState) => state.Auth)

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
              avatar: file._id,
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
    <label htmlFor={'avatarUpload'} className="inline-block relative group">
      <HexagonImage url={user.avatar}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div
            className={`text-center pt-4 font-bold text-12 text-white ${
              user?.avatar ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
            }`}>
            {user?.avatar ? 'Change image' : 'Add Profile Image'}
          </div>
        </div>
      </HexagonImage>
      <input
        type="file"
        accept="image/*"
        id="avatarUpload"
        name="avatarUpload"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
  )
}

export default AvatarUpload
