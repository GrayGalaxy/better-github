import React from 'jsx-dom'
import $ from 'select-dom'
import { observe } from 'selector-observer'
import { Icon } from '../utils'

observe('.btn[data-hotkey="t"]:not(.rgh-repo-filelist-actions)', {
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


/*

ready('.btn[data-hotkey="t"]:not(.rgh-repo-filelist-actions)').then((el) => {
	if(!el) return
	el.classList.add('tooltipped', 'tooltipped-s')
	el.setAttribute('aria-label', 'Go to file')
	el.firstChild!.replaceWith(<Icon name='search' />)

	const addBtn = el.nextElementSibling!.querySelector('.dropdown-caret')?.parentElement
	addBtn?.classList.replace('d-md-flex', 'd-md-block')
	addBtn?.firstChild!.replaceWith(<Icon name='plus' />)

	const codeBtn = $('get-repo summary')
	codeBtn?.firstChild!.replaceWith(<Icon name='code' />)
})
*/