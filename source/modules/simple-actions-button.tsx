import React from 'jsx-dom'
import $ from 'select-dom'
import { observe } from 'selector-observer'
import { Icon, IconName } from '../utils'

const selector = [
	'.btn[data-hotkey="t"]:not(.rgh-repo-filelist-actions)',
	'.pagehead-actions notifications-list-subscription-form [data-menu-button]',
	'.pagehead-actions button:not([name],[data-close-dialog]):is([data-view-component])',
]

observe(selector[0], {
	add(search) {
		search.classList.add('tooltipped', 'tooltipped-s')
		search.setAttribute('aria-label', 'Go to file')
		search.firstChild!.replaceWith(<Icon name='search' />)

		const addBtn = search.nextElementSibling!.querySelector('.dropdown-caret')?.parentElement
		addBtn?.classList.replace('d-md-flex', 'd-md-block')
		addBtn?.firstChild!.replaceWith(<Icon name='plus' />)

		const codeBtn = $('get-repo summary')
		codeBtn?.firstChild!.replaceWith(<Icon name='code' />)
	},
})

observe(selector[1], {
	add(el) {
		const child = $('span:not([hidden])', el)
		const text = child?.textContent?.trim()
		// prettier-ignore
		child?.replaceChildren(<>
			<Icon name='eye' />
			<span className='d-inline d-md-none'>{text}</span>
		</>)
	},
})

observe(selector[2], {
	add(el) {
		const textcontent = el.textContent?.trim().replace(/\n|\s/g, '')
		const content = textcontent?.match(/^(.+?)(\d+)?$/)
		if (!content) return
		const [t, text, count] = content
		const icon_name: { [K: string]: IconName } = {
			Fork: 'repo-forked',
			Starred: 'star-fill',
			Star: 'star',
			Unpin: 'pin',
			Pin: 'pin',
		}
		// prettier-ignore
		el.replaceChildren(<>
			<Icon name={icon_name[text]} class={text === 'Starred' ? 'starred-button-icon' : ''} />
			<span className='d-inline d-md-none'>{text}</span>
			<span className='Counter js-social-count'>{count}</span>
		</>)
	},
})
