export function getPageConfigFilename(path: string, locale: string): string {
    return `${locale}/${path}.yaml`;
}
