import Constants from 'expo-constants'

export function getEnvironment(mode: "staging" | "prod" = "staging") {
  const staging = Constants?.manifest?.extra?.staging

  if (staging) {
    // use prod config since staging is deployed in prod firebase project
    return {
      ...Constants?.manifest?.extra?.config?.prod,
      baseURL: Constants?.manifest?.extra?.config?.staging?.baseURL
    }
  } else {
    return Constants?.manifest?.extra?.config?.prod
  }
}