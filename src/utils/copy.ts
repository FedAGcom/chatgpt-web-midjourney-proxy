export function copyToClip(text: string) {
  const cleanedText = text.replace(/^(#{1,6})\s+/gm, '')

  return new Promise((resolve, reject) => {
    try {
      const input: HTMLTextAreaElement = document.createElement('textarea')
      input.setAttribute('readonly', 'readonly')
      input.value = cleanedText
      document.body.appendChild(input)
      input.select()
      if (document.execCommand('copy'))
        document.execCommand('copy')

      document.body.removeChild(input)
      resolve(cleanedText)
    }
    catch (error) {
      reject(error)
    }
  })
}
