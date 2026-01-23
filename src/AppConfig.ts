export const PageNotFoundProcessing = {
    Info: 'Info',
    Redirection: 'Redirection'
} as const;

export type PageNotFoundProcessing = (typeof PageNotFoundProcessing)[keyof typeof PageNotFoundProcessing];

export type AppConfig = {
    pageNotFoundProcessing: PageNotFoundProcessing;
};

export const appConfig: AppConfig = {
    pageNotFoundProcessing: PageNotFoundProcessing.Info
};
