// Sticky Sidebar with Dynamic scroll
function dynamic_sidebar() {
	const sidebar = $('.Layout-sidebar')
	sidebar.addClass('dynamic_scroll')
	let a = window.scrollY
	$(document).on('scroll', () => {
		if (!sidebar[0]) return
		let b = window.scrollY
		let diff = b - a
		sidebar[0].scrollTop += diff * 0.65
		a = b
	})
}

// vscode://vscode.git/clone?url=
// vscode://github.remotehub/open?url=

// Open With VS Code Button
const add_vscode_btn = () => {
	const modal = $('[data-target="get-repo.modal"]')
	if (modal.length < 1) return
	const list = modal.find('ul.list-style-none')
	const link = modal.find('input[value^="https"]')[0]?.value?.replace(/.git$/, '')

	let v_cln = 'vscode://vscode.git/clone?url=',
		v_rmt = 'vscode://github.remotehub/open?url='

	// check if insider branch
	chrome.storage.sync.get({ vsc_insider: false }, (items) => {
		if (!items.vsc_insider) return
		v_cln = 'vscode-insiders://vscode.git/clone?url='
		v_rmt = 'vscode-insiders://github.remotehub-insiders/open?url='
	})

	const lastChild = list.find('li').last()
	const vscode_links = [
		{ href: v_cln + link, T: 'Clone with VS Code', E: 'HTTPS' },
		{ href: v_rmt + link, T: 'Open with VS Code', E: 'Remote' },
	]

	vscode_links.forEach((obj, i) => {
		const { href, T, E } = obj
		const $btn = $(`
			<li class="Box-row Box-row--hover-gray p-3 mt-0 BtrGH_btn">
			<a class="d-flex flex-items-center color-fg-default text-bold no-underline" href="${href}">
				<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-link flex-shrink-0 mr-2">
				<path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z">
				</path>
				</svg>
				${T}${E ? `<small class='color-fg-muted ml-2'>${E}</small>` : ''}
			</a>
			</li>`)
		lastChild.before($btn)
	})
}

// Run on Plugin Initialization
const initPlugin = () => {
	chrome.storage.sync.get({ dynamic_scroll: false }, (i) => {
		console.log(i);
		if (i.dynamic_scroll) dynamic_sidebar()
	})
	add_vscode_btn()
}
// Run on Document start
$(document).ready(() => {
	console.log('plugin successfully initiated')
	initPlugin()

	let a = location.href
	new MutationObserver(() => {
		let b = location.href
		if (a === b) return
		a = b
		initPlugin()
	}).observe(document, { subtree: true, childList: true })
})
