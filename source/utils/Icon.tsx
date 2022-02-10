import React from 'jsx-dom'
import octoIcon from '../data/octo-icon'

export type IconName = keyof typeof octoIcon
export interface IconProps extends React.SVGAttributes<SVGElement> {
	name: IconName
}
export function Icon(props: IconProps) {
	const { name, ...attr } = props
	if (!(name in octoIcon)) return <></>
	Object.assign(attr, {
		class: `octicon ${props.class || ''}`,
		viewBox: '0 0 16 16',
		width: 16,
		'aria-hidden': true,
		dangerouslySetInnerHTML: { __html: octoIcon[name] },
	})
	return <svg {...attr} />
}
export default Icon
