const modify_graph_colors = async () => {
	// only run on profile page
	if (!$('body').attr('class').includes('page-profile')) return

	const { graph_colors: colors } = await new Promise((res) => {
		chrome.storage.sync.get(['graph_colors'], res)
	})

	if (colors?.length < 4) return

	const color_index = (i, c = false) => {
		const dark = $(document).attr('data-color-mode') !== 'light'
		const index = dark ? 4 - i : i + 1
		return c ? colors[index] : index
	}

	for (let i = 0; i < 4; i++) {
		const j = color_index(i)
		const prop = `--color-calendar-graph-day-L${j}-bg`
		document.documentElement.style.setProperty(prop, colors[i])
	}

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
