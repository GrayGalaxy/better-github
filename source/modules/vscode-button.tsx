import React, { styled } from 'jsx-dom'
import $ from 'select-dom'
import ready from 'element-ready'
import { Icon, storage, cn } from '../utils'

const vscCloneBtn = await storage.get('vsc_clone_btn')
const isInsider = await storage.get('vsc_insider')

ready('[data-target="get-repo.modal"]').then((el) => {
	if (!vscCloneBtn) return
	const className = '.BtrGH_vscode_btn'
	if ($(className, el)) return

	const ins = isInsider ? '-insiders' : ''
	const link_1 = $('input[value^="https"]', el)?.value.toString()
	const link_2 = link_1?.replace(/\.git$/, '') as string
	const href = {
		clone: `vscode${ins}://vscode.git/clone?url=${link_1}&shouldRecurse=true`,
		remote: `vscode${ins}://ms-vscode.remote-repositories${ins}/open?url=${link_2}`,
	}

	// prettier-ignore
	const Link = styled.a`padding:4px 10px;margin:-4px 0;color:var(--color-fg-default);background-color:var(--color-btn-bg);text-decoration:none;`

	const first = $('.Box-row:first-of-type', el)
	if (first)
		first.parentElement?.insertBefore(
			<li class={cn('Box-row Box-row--hover-gray d-flex flex-items-center', className)}>
				<Icon name='link' class='mr-2' />
				<span className='text-bold mr-auto'>
					VS Code
					{isInsider && <span class='Label Label--secondary no-wrap ml-1'>Insider</span>}
				</span>
				<Link href={href.clone}>Clone</Link>
				<Link href={href.remote}>Remote</Link>
			</li>,
			first.nextSibling
		)
})
