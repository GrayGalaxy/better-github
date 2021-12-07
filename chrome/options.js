//#region conffig
const elements = [
	{ id: 'visual_studio', text: 'Visual Studio', state: true },
	{ id: 'vsc_insider', text: 'VS Code Insider', state: false },
	{ id: 'dynamic_scroll', text: 'Dynamic Scrill', state: false },
	{ id: 'material_icons', text: 'Material Icons', state: false },
]
const colors = {
	Default: ['#9be9a8', '#40c463', '#30a14e', '#216e39'],
	Blue: ['#bbdefb', '#64b5f6', '#1e88e5', '#0d47a1'],
	Amber: ['#ffecb3', '#ffd54f', '#ffb300', '#ff6f00'],
	Blue: ['#bbdefb', '#64b5f6', '#1e88e5', '#0d47a1'],
	Blue_Grey: ['#cfd8dc', '#90a4ae', '#546e7a', '#263238'],
	Brown: ['#d7ccc8', '#a1887f', '#6d4c41', '#3e2723'],
	Cyan: ['#b2ebf2', '#4dd0e1', '#00acc1', '#006064'],
	Deep_Purple: ['#d1c4e9', '#9575cd', '#5e35b1', '#311b92'],
	Grey: ['#e0e0e0', '#9e9e9e', '#616161', '#414141'],
	Indigo: ['#c5cae9', '#7986cb', '#3949ab', '#1a237e'],
	Light_Blue: ['#b3e5fc', '#4fc3f7', '#039be5', '#01579b'],
	Light_Green: ['#dcedc8', '#aed581', '#7cb342', '#33691e'],
	Deep_Orange: ['#ffccbc', '#ff8a65', '#f4511e', '#bf360c'],
	Orange: ['#ffe0b2', '#ffb74d', '#fb8c00', '#e65100'],
	Pink: ['#f8bbd0', '#f06292', '#e91e63', '#880e4f'],
	Purple: ['#e1bee7', '#ba68c8', '#8e24aa', '#4a148c'],
	Red: ['#ffcdd2', '#e57373', '#e53935', '#b71c1c'],
	Teal: ['#b2dfdb', '#4db6ac', '#00897b', '#004d40'],
	Gold: ['#fff9c4', '#fff176', '#ffd835', '#f57f17'],
	Summer: ['#eae374', '#f9d62e', '#fc913a', '#ff4e50'],
}
//#endregion
const general_option = $('.general-option')
// Set options
elements.forEach(({ id, text, state }) => {
	const option = $(`
	<label class="sinple-check">
		<div class="check"><input type="checkbox" id="${id}_btn" value=${id} />
		<svg viewBox="0 0 20 20" class="knob"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.143 12.6697L15.235 4.5L16.8 5.90363L8.23812 15.7667L3.80005 11.2556L5.27591 9.7555L8.143 12.6697Z"/></svg>
		</div>
		${text}
	</label>
	`)
	chrome.storage?.sync.get({ [id]: state }, (i) => {
		option.find('input').attr('checked', i[id])
	})
	general_option.append(option)
})

general_option.on('change', (e) => {
	const { checked, value } = e.target
	chrome.storage?.sync.set({ [value]: checked })
})

const color_selector = $('.color-selector')
Object.entries(colors).forEach(([key, colors]) => {
	let style = ''
	colors.forEach((c, i) => (style += `--c${i + 1}:${c};`))
	const choices = $(`
		<label class="color-radio" style="${style}">
		<input type="radio" name="graph-color" value="${key}"/>
		<i class="br"/>
		</label>
		`)
	const input = choices.find('input')
	chrome.storage?.sync.get({ graph_theme: 'GitHub' }, (i) => {
		input.attr('checked', i.graph_theme === key)
	})
	color_selector.append(choices)
})
color_selector.on('change', (e) => {
	const id = e.target.value
	chrome.storage?.sync.set({ graph_theme: id, graph_colors: colors[id] })
})

$(document.body).append(color_selector)
