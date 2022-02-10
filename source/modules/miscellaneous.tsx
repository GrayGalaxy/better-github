import { observe } from 'selector-observer'
import { storage } from '../utils'

const vs_menu = await storage.get('vs_menu')

// Removes 'Open in Visual Studio' menu item from the repository list
if (!vs_menu)
	observe('[data-target="get-repo.modal"] [data-open-app="visual-studio"]', {
		add(el) {
			const parent = el.parentElement
			parent?.remove()
		},
	})
