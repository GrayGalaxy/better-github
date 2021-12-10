//#region conffig
const storage = chrome.storage?.sync

const elements = [
	{ id: 'visual_studio', text: 'Visual Studio', state: true },
	{ id: 'vsc_insider', text: 'VS Code Insider', state: false },
	{ id: 'dynamic_scroll', text: 'Dynamic Scroll', state: false },
	{ id: 'material_icons', text: 'Material Icons', state: false },
	{ id: 'npm_data', text: 'NPM Package Data', state: false },
]
const colors_map = [
	['#9be9a8', '#40c463', '#30a14e', '#216e39'],
	['#bbdefb', '#64b5f6', '#1e88e5', '#0d47a1'],
	['#ffecb3', '#ffd54f', '#ffb300', '#ff6f00'],
	['#bbdefb', '#64b5f6', '#1e88e5', '#0d47a1'],
	['#cfd8dc', '#90a4ae', '#546e7a', '#263238'],
	['#d7ccc8', '#a1887f', '#6d4c41', '#3e2723'],
	['#b2ebf2', '#4dd0e1', '#00acc1', '#006064'],
	['#d1c4e9', '#9575cd', '#5e35b1', '#311b92'],
	['#e0e0e0', '#9e9e9e', '#616161', '#414141'],
	['#c5cae9', '#7986cb', '#3949ab', '#1a237e'],
	['#b3e5fc', '#4fc3f7', '#039be5', '#01579b'],
	['#dcedc8', '#aed581', '#7cb342', '#33691e'],
	['#ffccbc', '#ff8a65', '#f4511e', '#bf360c'],
	['#ffe0b2', '#ffb74d', '#fb8c00', '#e65100'],
	['#f8bbd0', '#f06292', '#e91e63', '#880e4f'],
	['#e1bee7', '#ba68c8', '#8e24aa', '#4a148c'],
	['#ffcdd2', '#e57373', '#e53935', '#b71c1c'],
	['#b2dfdb', '#4db6ac', '#00897b', '#004d40'],
	['#fff9c4', '#fff176', '#ffd835', '#f57f17'],
	['#eae374', '#f9d62e', '#fc913a', '#ff4e50'],
]
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
	storage?.get([id], (i) => {
		option.find('input').attr('checked', i[id])
	})
	general_option.append(option)
})

general_option.on('change', (e) => {
	const { checked, value } = e.target
	storage?.set({ [value]: checked })
})

const color_selector = $('.color-selector')
colors_map.forEach((colors, index) => {
	const choices = $(`
	<label class="color-radio">
	<input type="radio" name="graph-color" value="${index}"/>
	<i class="br"/>
	</label>
	`)
	colors.forEach((c, i) => choices.css(`--c${i + 1}`, c))

	const input = choices.find('input')
	storage?.get(['graph_theme'], (i) => {
		input.attr('checked', i.graph_theme === index)
	})
	color_selector.append(choices)
})
color_selector.on('change', (e) => {
	const id = parseInt(e.target.value)
	storage?.set({ graph_theme: id, graph_colors: colors_map[id] })
})

$(document.body).append(color_selector)

$(() => {
	const clear_cache = $(`
	<h2 class="single-line">
		Clear Cache
		<button>
			<svg width="20" height="20" viewBox="0 0 20 20" class="c01230">
			<path d="M3.07 9.05a7 7 0 0112.55-3.22l.13.17H12.5a.5.5 0 100 1h4a.5.5 0 00.5-.5v-4a.5.5 0 00-1 0v2.2a8 8 0 101.99 4.77.5.5 0 00-1 .08 7 7 0 11-13.92-.5z"></path>
			</svg>
			Clear
		</button>
	</h2>
	`)
	const btn = clear_cache.find('button')
	btn.on('click', () => {
		storage?.set({ repo_data: {} })
		setTimeout(() => {
			storage.get(null, (i) => console.log(i))
		}, 1000)
	})
	$(document.body).append(clear_cache)
})
