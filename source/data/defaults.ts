import { IconName } from '../utils'

export type FeaturesID =
	| 'vs_menu'
	| 'vsc_clone_btn'
	| 'vsc_insider'
	| 'simple_action_btn'
	| 'gh_tab_size'
	| 'graph_theme'

export interface Features {
	state: boolean | number | string
	icon?: IconName
	id: FeaturesID
	type: 'check' | 'radio' | 'text' | 'number' | string
	text: string
	props?: any
}

// prettier-ignore
export const features: Features[] = [
	{ state: false, type: 'check', id: 'vs_menu', text: 'Visual Studio' },
	{ state: true, type: 'check', id: 'vsc_clone_btn', text: 'VS Code Clone Button' },
	{ state: false, type: 'check', id: 'vsc_insider', text: 'VS Code Insider' },
	{ state: true, type: 'check', id: 'simple_action_btn', text: 'Simple Actions Button' },
	{ state: 2, type: 'number', id: 'gh_tab_size', text: 'Tab Size in GitHub', props: { min: 1, max: 8, step: 1 }},
]

export const color_map = [
	['#9be9a8', '#40c463', '#30a14e', '#216e39'],
	['#bbdefb', '#64b5f6', '#1e88e5', '#0d47a1'],
	['#ffecb3', '#ffd54f', '#ffb300', '#ff6f00'],
	['#bbdefb', '#64b5f6', '#1e88e5', '#0d47a1'],
	['#cfd8dc', '#90a4ae', '#546e7a', '#263238'],
	['#d7ccc8', '#a1887f', '#6d4c41', '#3e2723'],
	['#b2ebf2', '#4dd0e1', '#00acc1', '#006064'],
	['#d1c4e9', '#9575cd', '#5e35b1', '#311b92'],
	['#e0e0e0', '#9e9e9e', '#616161', '#414141'],
	['#c5cae9', '#7986cb', '#3949ab', '#1a237e'],
	['#b3e5fc', '#4fc3f7', '#039be5', '#01579b'],
	['#dcedc8', '#aed581', '#7cb342', '#33691e'],
	['#ffccbc', '#ff8a65', '#f4511e', '#bf360c'],
	['#ffe0b2', '#ffb74d', '#fb8c00', '#e65100'],
	['#f8bbd0', '#f06292', '#e91e63', '#880e4f'],
	['#e1bee7', '#ba68c8', '#8e24aa', '#4a148c'],
	['#ffcdd2', '#e57373', '#e53935', '#b71c1c'],
	['#b2dfdb', '#4db6ac', '#00897b', '#004d40'],
	['#fff9c4', '#fff176', '#ffd835', '#f57f17'],
	['#eae374', '#f9d62e', '#fc913a', '#ff4e50'],
]
