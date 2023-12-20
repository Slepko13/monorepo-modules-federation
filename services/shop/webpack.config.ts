import { resolve } from 'path';

import { buildWebpack, BuildMode, BuildPlatform } from '@packages/build-config';

import webpack, { Configuration } from 'webpack';
import packageJson from './package.json';

interface EnvVariables {
    mode?: BuildMode;
    port?: number;
    analyzer?: boolean;
    platform?: BuildPlatform;
}

export default (env: EnvVariables) => {
    const paths = {
        output: resolve(__dirname, 'build'),
        entry: resolve(__dirname, 'src', 'index.tsx'),
        html: resolve(__dirname, 'public', 'index.html'),
        favicon: resolve(__dirname, 'public', 'test-favicon.png'),
    };

    const config: Configuration = buildWebpack({
        target: env.mode === 'production' ? 'browserslist' : 'web',
        mode: env.mode === 'production' ? 'production' : 'development',
        port: env.port ?? 3001,
        analyzer: env.analyzer,
        platform: env.platform ?? 'desktop',
        paths,
    });

    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: 'shop',
        filename: 'remoteEntry.js',
        exposes: {
            './Router': './src/router/index.ts'
        },
        shared: {
            ...packageJson.dependencies,
            react: {
                eager: true,
                requiredVersion: packageJson.dependencies['react'],
            },
            'react-router-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-router-dom'],
            },
            'react-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-dom'],
            },
        }
    }));

    return config;
};
