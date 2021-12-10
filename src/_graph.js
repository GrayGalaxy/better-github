const modify_graph_colors = async () => {
	// get colors
	const { graph_colors: colors } = await storage.get('graph_colors')
	if (!colors) return
	// modify colors based on theme
	const color_index = (i, c = false) => {
		const dark = $('html').attr('data-color-mode') !== 'light'
		const index = dark ? 4 - i : i + 1
		return c ? colors[index] : index
	}
	// add colors to stylesheet
	for (let i = 0; i < 4; i++) {
		const j = color_index(i)
		const prop = `--color-calendar-graph-day-L${j}-bg`
		document.documentElement.style.setProperty(prop, colors[i])
	}

	if (!$('body').attr('class').includes('page-profile')) return

	const progress_colors = () => {
		$('.Progress-item').css('background', color_index(3, true))
		$('path.js-highlight-blob')
			.attr('fill', color_index(2, true))
			.attr('stroke', color_index(2, true))
	}
	progress_colors()
	new MutationObserver(progress_colors).observe($('#js-contribution-activity')[0], {
		childList: true,
	})
}
