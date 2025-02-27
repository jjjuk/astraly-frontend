import axios from 'axios'
import { useApi } from '../api'

export async function uploadToS3(
  {
    fileType,
    fileContents,
  }: {
    fileType: string
    fileContents: File
  },
  type = 'image'
) {
  const presignedPostUrl = await getPresignedPostUrl(fileType, type)

  const formData = new FormData()
  formData.append('Content-Type', fileType)
  Object.entries(presignedPostUrl.fields).forEach(([k, v]) => {
    formData.append(k, v as any)
  })
  formData.append('file', fileContents) // The file has be the last element

  const response = await axios.post(presignedPostUrl.url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return presignedPostUrl
}

type PresignedPostUrlResponse = {
  url: string
  fields: {
    key: string
    acl: string
    bucket: string
  }
  filePath: string
}

const GET_PRESIGNED_URL_API_PATH = 'get-presigned-url-s3'

async function getPresignedPostUrl(file: string, fileType = 'image') {
  const { getUploadUrl } = useApi()

  return getUploadUrl(file, fileType)
}
