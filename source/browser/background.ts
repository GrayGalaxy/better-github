import browser from 'webextension-polyfill'
import { features, color_map } from '../data/defaults'
import { storage } from '../utils'

// run on first first time installation and set the default values
browser.runtime.onInstalled.addListener(() => {
	browser.storage.sync.set({
		graph_theme: { id: 0, light: color_map[0], dark: color_map[0].reverse() },
		...Object.fromEntries(features.map(({ id, state }) => [id, state])),
	})
})

// Modify css on load
browser.tabs.onUpdated.addListener((id, info) => {
	if (info?.status !== 'loading') return
	browser.tabs.get(id).then((tab) => {
		const host = tab.url && new URL(tab.url).hostname
		if (!host?.includes('github.com')) return
		storage.get('gh_tab_size').then((tab_size) => {
			const CSS = `.blob-code-content table tr td { tab-size: ${tab_size} }`
			browser.tabs.insertCSS({ runAt: 'document_start', code: CSS })
		})
	})
})

// Change the icon color based on os color scheme
if (window.matchMedia('(prefers-color-scheme: dark)').matches)
	browser.browserAction.setIcon({ path: { 48: 'icon_light.png' } })

// open preferred url on click on the extension icon
browser.browserAction.onClicked.addListener(() => {
	browser.tabs.create({ url: 'https://github.com' })
})
