import browser from 'webextension-polyfill'

export { Icon } from './Icon'
export type { IconName } from './Icon'

export const storage = {
	get: async (...args: string[]) => {
		const result = await browser.storage.sync.get(args)
		return args.length === 1 ? result[args[0]] : result
	},
	set: (args: Record<string, any>) => browser.storage.sync.set(args),
	getAll: async () => browser.storage.sync.get(null),
}
