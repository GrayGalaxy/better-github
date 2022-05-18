import ready from 'element-ready'
import { storage } from '../utils'

const vs_menu = await storage.get('vs_menu')

if (!vs_menu) {
	ready('[data-target="get-repo.modal"] [data-open-app="visual-studio"]').then((el) => {
		el?.parentElement!.setAttribute('hidden', 'true')
	})
}
