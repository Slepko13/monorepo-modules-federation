import { resolve } from 'path';
import { buildWebpack, BuildMode, BuildPlatform } from '@packages/build-config';
import webpack from 'webpack';

import packageJson from './package.json';

interface EnvVariables {
    mode?: BuildMode;
    port?: number;
    analyzer?: boolean;
    platform?: BuildPlatform;
    SHOP_REMOTE_URL: string
    ADMIN_REMOTE_URL: string
}

export default (env: EnvVariables) => {
    const paths = {
        output: resolve(__dirname, 'build'),
        entry: resolve(__dirname, 'src', 'index.tsx'),
        html: resolve(__dirname, 'public', 'index.html'),
        favicon: resolve(__dirname, 'public', 'test-favicon.png'),
    };

    const SHOP_REMOTE_URL =  env.SHOP_REMOTE_URL ?? 'http://localhost:3001'
    const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? 'http://localhost:3002'

    const config: webpack.Configuration = buildWebpack({
        target: env.mode === 'production' ? 'browserslist' : 'web',
        mode: env.mode === 'production' ? 'production' : 'development',
        port: env.port ?? 3000,
        analyzer: env.analyzer,
        platform: env.platform ?? 'desktop',
        paths,
    });

    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: 'host',
        filename: 'remoteEntry.js',
        remotes: {
            shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
            admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
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
    }))

    return config;
};
