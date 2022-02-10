import { observe } from 'selector-observer'
import { storage } from '../utils'

// get colors
const graph_theme = await storage.get('graph_theme')

const isDarkTheme = document.documentElement.getAttribute('data-color-mode')  !== 'light'
const colors = isDarkTheme? graph_theme.dark : graph_theme.light


observe('.js-header-wrapper',{add(el) {
	for(let i = 0; i < 4; i++) {
		const prop = `--color-calendar-graph-day-L${i + 1}-bg`
		document.documentElement.style.setProperty(prop, colors[i])
	}
}})

observe('.js-activity-overview-graph .js-highlight-blob',{add(el) {
	el.setAttribute('fill', colors[0])
	el.setAttribute('stroke', colors[0])
}})

observe('.contribution-activity-listing .Progress-item', {
	add(el) {
		let width: any = (el as HTMLElement).style.width
		width = width && parseInt(width)
		if (!width && typeof width === 'number') return
		for (let i = 0; i < 4; i++)
			if (Math.floor(width / 25) >= i)
				(el as HTMLElement).style.setProperty('background-color', colors[i])
	},
})
