import path from 'node:path'
import { createRequire } from 'node:module'
import SASS from 'sass'
import CopyPlugin from 'copy-webpack-plugin'
const { resolve: resolvePackage } = createRequire(import.meta.url)

const config = (env, argv) => {
	const isDev = argv.mode === 'development'
	return {
		entry: {
			inject: './source/index',
			options: './source/browser/options',
			background: './source/browser/background',
		},
		output: { path: path.resolve('build') },
		resolve: { extensions: ['.js', '.ts', '.tsx'] },
		plugins: [
			new CopyPlugin({
				patterns: [
					{ from: resolvePackage('webextension-polyfill') },
					{ from: 'public' },
					{
						from: 'source/sass/*',
						to: '[name].css',
						transform(c, file) {
							const buffer = SASS.compile(file, { style: 'compressed' })
							return buffer.css.toString()
						},
					},
				],
			}),
		],
		module: {
			// prettier-ignore
			rules: [{ test: /\.tsx?$/, loader: 'esbuild-loader', options: {loader:'tsx',target:'esnext'} }],
		},
		devtool: isDev && 'inline-source-map',
		experiments: { topLevelAwait: true },
		optimization: { minimize: true },
		stats: 'minimal',
	}
}
export default config
