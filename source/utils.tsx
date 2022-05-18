import React from 'jsx-dom'
import octoIcon from './data/octo-icon'
import browser from 'webextension-polyfill'

import type { FeaturesID } from './data/defaults'

// Icon Component =============================================
export type IconName = keyof typeof octoIcon
export interface IconProps extends React.SVGAttributes<SVGElement> {
	name: IconName
}
export function Icon(props: IconProps) {
	const { name, ...attr } = props
	if (!(name in octoIcon)) return <></>
	Object.assign(attr, {
		class: `octicon ${props.class || ''}`,
		viewBox: '0 0 16 16',
		width: 16,
		'aria-hidden': true,
		dangerouslySetInnerHTML: { __html: octoIcon[name] },
	})
	return <svg {...attr} />
}

// Storage ====================================================
export const storage = {
	get: async (...args: FeaturesID[]) => {
		const result = await browser.storage.sync.get(args)
		return args.length === 1 ? result[args[0]] : result
	},
	set: (args: Record<string, any>) => browser.storage.sync.set(args),
	getAll: async () => browser.storage.sync.get(null),
}

// ClassNames ===============================================
export function cn(...args: any[]) {
	if (!args.length) throw new Error('No argument is used')
	let names: string[] = []
	args.forEach((arg) => {
		if (!arg) return
		const argType = arg?.constructor
		if (argType === String || argType === Number) {
			names.push(arg.toString().replace(/^\./, ''))
		} else if (argType === Array) {
			let inner = cn.apply(null, arg)
			if (inner) names.push(inner)
		} else if (argType === Object) {
			let entries = Object.entries(arg)
			entries.map(([key, value]) => value && names.push(key))
		}
		return
	})
	return names.join(' ')
}
