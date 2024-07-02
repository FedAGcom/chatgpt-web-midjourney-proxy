export const getModelLabel = (model: string) => {
  switch (true) {
    case model === 'gpt-3.5-turbo-0301':
      return 'Gpt-3.5'
    case model === 'gpt-4o':
      return 'Gpt-4o'
    default:
      return model
  }
}
