export const defaultMsg = 'Missing environment variables'

export default class MissingEnvVars extends Error {
  constructor(msg?: string) {
    if (!msg) {
      super(defaultMsg)
    } else {
      super(msg)
    }
  }
}
