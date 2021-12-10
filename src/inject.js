// Sticky Sidebar with Dynamic scroll
const dynamic_sidebar = async () => {
	const sidebar = $('.Layout-sidebar')
	if (sidebar.length < 1) return
	// check if enabled
	const { dynamic_scroll: enabled } = await storage.get('dynamic_scroll')
	if (!enabled) return
	// create dynamic scroll
	sidebar.addClass('dynamic_scroll')
	let a = window.scrollY
	$(document).on('scroll', (e) => {
		let b = window.scrollY
		let diff = b - a
		sidebar[0].scrollTop += diff * 0.5
		a = b
	})
}

const init_plugin = () => {
	dynamic_sidebar()
	modify_graph_colors()
	modify_repo_modal()
	add_package_info()
}
// Run on Document start
$(document).ready(async () => {
	console.log('plugin successfully initiated')
	init_plugin()

	setInterval(material_icons, 250)

	new MutationObserver(() => {
		init_plugin()
	}).observe(document.body, { childList: true })
})
