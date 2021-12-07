// Sticky Sidebar with Dynamic scroll
function dynamic_sidebar() {
	const sidebar = $('.Layout-sidebar')
	if (sidebar.length < 1) return
	chrome.storage.sync.get({ dynamic_scroll: false }, (i) => {
		sidebar.addClass('dynamic_scroll')
		let a = window.scrollY
		$('.dynamic_scroll').on('scroll', (e) => {
			e.preventDefault()
		})
		$(document).on('scroll', () => {
			let b = window.scrollY
			let diff = b - a
			sidebar[0].scrollTop += diff * 0.65
			a = b
		})
	})
}

const init_plugin = () => {
	dynamic_sidebar()
	modify_graph_colors()
}
// Run on Document start
$(document).ready(() => {
	console.log('plugin successfully initiated')
	init_plugin()
	let a = location.href
	setInterval(() => {
		modify_repo_modal()

		let b = location.href
		if (a === b) return
		a = b
		init_plugin()
	}, 250)
})
