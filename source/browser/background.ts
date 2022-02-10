import browser from 'webextension-polyfill'
import { features, color_map } from '../data/defaults'

// run on first first time installation and set the default values
browser.runtime.onInstalled.addListener(() => {
	browser.storage.sync.set({
		graph_theme: { id: 0, light: color_map[0], dark: color_map[0].reverse() },
		...Object.fromEntries(features.map(({ id, state }) => [id, state === 1])),
	})
})

// Change the icon color based on os color scheme
if (window.matchMedia('(prefers-color-scheme: dark)').matches)
	browser.browserAction.setIcon({ path: { 48: 'icon_light.png' } })

// open preferred url on click on the extension icon
browser.browserAction.onClicked.addListener(() => {
	browser.tabs.create({ url: 'https://github.com' })
})
