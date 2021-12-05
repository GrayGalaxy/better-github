const ins_btn = document.getElementById('BtrGH_insBtn')
const dnscr_btn = document.getElementById('BtrGH_dnscrBtn')

document.addEventListener('DOMContentLoaded', () => {
	chrome.storage.sync.get(
		{
			vsc_insider: false,
			dynamic_scroll: false,
		},
		(i) => {
			ins_btn.checked = i.vsc_insider
			dnscr_btn.checked = i.dynamic_scroll
		}
	)
})

ins_btn.addEventListener('change', (e) => {
	const checked = e.target.checked
	chrome.storage.sync.set({ vsc_insider: checked })
})

dnscr_btn.addEventListener('change', (e) => {
	const checked = e.target.checked
	chrome.storage.sync.set({ dynamic_scroll: checked })
})
