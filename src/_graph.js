const modify_graph_colors = async () => {
	// only run on profile page
	if (!$('body').attr('class').includes('page-profile')) return

	const { graph_colors: colors } = await new Promise((res) => {
		chrome.storage.sync.get(['graph_colors'], res)
	})

	const dark_theme = $(document).attr('data-color-mode') === 'dark'
	if (colors?.length < 4) return

	for (let i = 0; i < 4; i++) {
		const j = dark_theme ? 4 - i : i + 1
		const prop = `--color-calendar-graph-day-L${j}-bg`
		document.documentElement.style.setProperty(prop, colors[i])
		if (i === 3) {
			$('.Progress-item').css('background', colors[j])
		}
	}
}
