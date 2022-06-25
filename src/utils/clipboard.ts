function fallbackCopyToClipboard(text: string): Promise<void> {
  const textArea = document.createElement('textarea')
  textArea.value = text

  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  const result = new Promise<void>((resolve, reject) => {
    try {
      const successful = document.execCommand('copy')
      resolve()
      // eslint-disable-next-line no-empty
    } catch (err) {
      reject()
    }
  })

  document.body.removeChild(textArea)
  return result
}

export function copyToClipboard(text: string): Promise<void> {
  if (!navigator.clipboard) {
    return fallbackCopyToClipboard(text)
  }

  return navigator.clipboard.writeText(text)
}
