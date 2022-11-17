declare interface SVGIcon {
    id: string;
    url: string;
    viewBox: string;
}

declare module '*.svg' {
    const el: ReactElement;

    export default el;
}

declare module '*.png' {
    const content: string;

    export default content;
}

declare module '*.yaml' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content: any;

    export default content;
}
