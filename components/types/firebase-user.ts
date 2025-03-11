export type TFirebaseUser = {
    uid: string,
    email: string,
    emailVerified: boolean,
    isAnonymous: boolean,
    createdAt: string | number,
    lastLoginAt: string | number,
    apiKey: string,
    appName: string,
    providerData: TProviderData[],
    stsTokenManager: TTokenManager,
}

export type TProviderData = {
    providerId: string,
    uid: string,
    displayName: string | null,
    email: string,
    phoneNumber: string | null,
    photoURL: string | null
}

export type TTokenManager = {
    refreshToken: string,
    accessToken: string,
    expirationTime: number
}