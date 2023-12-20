export interface BuildPaths {
    entry: string;
    html: string;
    output: string;
    favicon: string;
}

export type BuildMode = 'production' | 'development';

export type BuildTarget = 'browserslist' | 'web';
export type BuildPlatform = 'mobile' | 'desktop';

export interface BuildOptions {
    port: number;
    paths: BuildPaths;
    mode: BuildMode;
    target: BuildTarget;
    analyzer?: boolean;
    platform?: BuildPlatform;
}
