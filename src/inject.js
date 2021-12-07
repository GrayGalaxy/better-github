// Sticky Sidebar with Dynamic scroll
const dynamic_sidebar = async () => {
	const sidebar = $('.Layout-sidebar')
	if (sidebar.length < 1) return

	let { dynamic_scroll: enabled } = await new Promise((res) => {
		chrome.storage.sync.get(['dynamic_scroll'], res)
	})
	if (!enabled) return

	sidebar.addClass('dynamic_scroll')
	let a = window.scrollY
	$(document).on('scroll', () => {
		let b = window.scrollY
		let diff = b - a
		sidebar[0].scrollTop += diff * 0.65
		a = b
	})
}

const init_plugin = () => {
	dynamic_sidebar()
	modify_graph_colors()
	modify_repo_modal()
}
// Run on Document start
$(document).ready(() => {
	console.log('plugin successfully initiated')
	init_plugin()

	setTimeout(replace_icons, 250)

	new MutationObserver((event) => {
		event.forEach((e) => {
			if (e.addedNodes.length > 0) init_plugin()
		})
	}).observe(document.body, { childList: true })
})
