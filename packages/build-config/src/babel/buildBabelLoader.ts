import { BuildOptions } from '../types/types';
import { removeDataTestIdBabelPlugin } from './removeDataTestIdBabelPlugin';

export function buildBabelLoader({ mode }: BuildOptions) {
    const isDev = mode === 'development';
    const plugins = [];
    if (isDev) {
        plugins.push(require.resolve('react-refresh/babel'));
    } else {
        plugins.push([
            removeDataTestIdBabelPlugin,
            {
                props: ['data-testid'],
            },
        ]);
    }

    return {
        test: /\.[t,j]sx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                plugins: plugins.filter(Boolean),
            },
        },
    };
}
