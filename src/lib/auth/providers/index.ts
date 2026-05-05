export enum AuthProviders {
  CREDENTIALS = "credentials",
}

export type AuthProvider = (typeof AuthProviders)[keyof typeof AuthProviders];
