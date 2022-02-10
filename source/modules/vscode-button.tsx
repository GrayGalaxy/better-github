import React, { styled } from 'jsx-dom'
import $ from 'select-dom'
import { observe } from 'selector-observer'
import { Icon, storage } from '../utils'

const vscCloneBtn = await storage.get('vsc_clone_btn')
const isInsider = await storage.get('vsc_insider')

observe('[data-target="get-repo.modal"]', {
	add(el) {
		if (!vscCloneBtn) return
		const className = 'BtrGH_vscode_btn'
		if ($(`.${className}`, el)) return

		const ins = isInsider ? '-insiders' : ''
		const link_1 = $('input[value^="https"]', el)?.value.toString()
		const link_2 = link_1?.replace(/\.git$/, '')
		const href = {
			clone: `vscode${ins}://vscode.git/clone?url=${link_1}&shouldRecurse=true`,
			rrmote: `vscode${ins}://github.remotehub${ins}/open?url=${link_2}`,
		}

		// prettier-ignore
		const Link = styled.a`padding:4px 10px;margin:-4px 0;color:var(--color-fg-default);background-color:var(--color-btn-bg);text-decoration:none;`

		const first = $('.Box-row:first-of-type', el)
		if (first)
			first.parentElement?.insertBefore(
				<li class='Box-row Box-row--hover-gray d-flex flex-items-center BtrGH_vscode_btn'>
					<Icon name='link' class='mr-2' />
					<span className='text-bold mr-auto'>
						VS Code
						{isInsider && <span class='Label Label--secondary no-wrap ml-1'>Insider</span>}
					</span>
					<Link href={href.clone}>Clone</Link>
					<Link href={href.rrmote}>Remote</Link>
				</li>,
				first.nextSibling
			)
	},
})
