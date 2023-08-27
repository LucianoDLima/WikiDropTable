import path from 'path';

const webpackConfig = () => ({
    mode: 'production',
    entry: [
        path.resolve(__dirname, './src/typescript/index.ts'),
        path.resolve(__dirname, './src/typescript/historyUpdate.ts'),
        path.resolve(__dirname, './src/typescript/grandExchange.ts'),
        path.resolve(__dirname, './src/typescript/colorMode.ts'),
        path.resolve(__dirname, './src/typescript/geOptions.ts'),
        path.resolve(__dirname, './src/typescript/reduceAnims.ts'),
        path.resolve(__dirname, './src/typescript/tooltip.ts')
    ],
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'public', 'static', 'bundle'),
    },
});

export default webpackConfig;