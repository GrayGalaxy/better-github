const material_icons = async () => {
	const icon_class = 'bgh_icon',
		container = $('.js-navigation-container'),
		list = container?.find('.js-navigation-item[role="row"]')
	// check if icons are already loaded
	if (list?.length < 1 || $(`.${icon_class}`).length) return
	// check if enabled
	const { material_icons: enabled } = await storage.get('material_icons')
	if (!enabled) return
	// load icons
	list.each((i, item) => {
		const $item = $(item)
		const svg = $item.find('svg')
		if (!svg.length) return
		const name = $item.find('a.js-navigation-open').text()
		const ext = name.match(/.*?[.](?<ext>xml.dist|xml.dist.sample|yml.dist|\w+)$/)?.[1]
		const config = {
			name,
			ext,
			name_l: name.toLowerCase(),
			dir: svg.attr('aria-label') === 'Directory',
			submodule: svg.attr('aria-label') === 'Submodule',
		}
		const icon_name = get_icon_name(config)
		if (!icon_name) return
		const icon_path = chrome.runtime.getURL(`assets/svg/${icon_name}.svg`)
		const icon = $(`<img  class="${icon_class}" src="${icon_path}" width="20"/>`)
		svg.before(icon)
		svg[0] &&
			$.each(svg[0].attributes, (i, attr) => {
				if (attr.specified) icon.attr(attr.name, attr.value)
			})
		icon.addClass(icon_class)
		svg.remove()
	})
}

// get icon name
const get_icon_name = ({ name, name_l, ext, dir, submodule }) => {
	if (submodule) return 'f_git'
	if (!dir && icon_map.file[name]) return icon_map.file[name]
	if (dir && icon_map.folder[name]) return icon_map.folder[name]
	if (!dir && icon_map.file[name_l]) return icon_map.file[name_l]
	if (dir && icon_map.folder[name_l]) return icon_map.folder[name_l]
	if (!dir && icon_map.file_ext[ext]) return icon_map.file_ext[ext]
	if (dir && icon_map.language[ext]) return icon_map.language[ext]
	if (!dir && language_map.file[name]) return language_map.file[name]
	if (!dir && language_map.file[name_l]) return language_map.file[name_l]
	if (!dir && language_map.file_ext[ext]) return language_map.file_ext[ext]
	if (dir) return 'folder'
	return 'file'
}
