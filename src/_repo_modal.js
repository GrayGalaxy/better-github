// Open With VS Code Button
const modify_repo_modal = async () => {
	const btn_class = 'BtrGH_btn',
		btn_container = 'BtrGH_container'
	if ($(`.${btn_class}`).length > 0) return

	const modal = $('[data-target="get-repo.modal"]')
	if (modal.length < 1) return

	const box = $(`
	<li class="Box-row Box-row--hover-gray d-flex" style="user-select:none;align-items:center">
		<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-link flex-shrink-0 mr-2">
		<path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z">
		</path>
		</svg>
		<div class="text-bold mr-auto ${btn_container}">Open With VSCode</div>
	</li>
	`)

	// prettier-ignore
	const link = [
		modal.find('input[value^="https"]').val(),
		modal.find('input[value^="git"]').val(),
		modal.find('input[value^="https"]').val().replace(/\.git$/, ''),
	]
	let vsc_buttons = [
		{ name: 'Remote', href: `vscode://github.remotehub/open?url=${link[2]}` },
		{ name: 'SSH', href: `vscode://vscode.git/clone?url=${link[1]}` },
		{ name: 'HTTPS', href: `vscode://vscode.git/clone?url=${link[0]}` },
	]
	chrome.storage.sync.get({ vsc_insider: false }, (i) => {
		if (i.vsc_insider) {
			let data = JSON.stringify(vsc_buttons).replace(/(vscode|remotehub)(:?)/g, '$1-insiders$2')
			vsc_buttons = JSON.parse(data)
		}
		vsc_buttons.forEach((e) => {
			box.find(`.${btn_container}`).after($(`<a class=${btn_class} href=${e.href}>${e.name}</a>`))
		})
		modal.find('.Box-row:first-of-type').after(box)
	})
	chrome.storage.sync.get({ visual_studio: true }, (i) => {
		if (!i.visual_studio) modal.find('[data-open-app="visual-studio"]').parent().remove()
	})
}
