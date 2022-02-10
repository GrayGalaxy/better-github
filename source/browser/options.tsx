import React, { styled } from 'jsx-dom'
import { storage } from '../utils'
import { features, color_map } from '../data/defaults'

const Heading = styled.h2`font-size:1.25em;font-weight:400;margin:1.5em 0 .75em;border-bottom:1px solid var(--br);`
const Link = styled.a`color:var(--tx) !important;opacity:0.5;`


const FeaturesList = ({store}: any) => {
	const Label = styled.label`display:flex;gap:.5em;min-height:2em;line-height:1.25;margin-bottom:.5em;padding-top:.5em;max-width:max-content;`
	const SVG = styled.svg`position:absolute;pointer-events:none;left:0;width:20px;height:20px;fill:var(--bg);`
	const Input = styled.input`outline:none;appearance:none;width:20px;height:20px;border:1px solid var(--ch_f);;border-radius:2px;flex-shrink:0;`

	const fn = (e: Event) => {
		const { id, checked } = e.target as HTMLInputElement
		storage.set({ [id]: checked })
	}
	return (
		<form onChange={fn}>
			{features.map(({ id, text }) => (
				<Label class='simple-check'>
					<Input type='checkbox' checked={store[id]} id={id} />
					<SVG viewBox='0 0 20 20' class='knob'><path d='M8.143 12.6697L15.235 4.5L16.8 5.90363L8.23812 15.7667L3.80005 11.2556L5.27591 9.7555L8.143 12.6697Z' /></SVG>
					{text}
				</Label>
			))}
		</form>
	)
}

const ColorList = ({store}: any) => {
	const Form = styled.form`display:grid;grid-template-columns:repeat(auto-fit, 26px);grid-gap:.75em;`
	const Label = styled.label`border-radius:2px;height:26px;position:relative;transform:rotate(-90deg);`
	const Input = styled.input`outline:none;appearance:none;`
	const Border = styled.i`position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;transition:outline 100ms;`

	const fn = async (e: any) => {
		const id = Number(e.target.value)
		if (e.target.checked) storage.set({
			graph_theme: { id, light: color_map[id], dark: color_map[id].reverse() },
		})
	}
	const style = ([c1, c2, c3, c4]: string[]) => {
		const bg = ` ${c1} 90deg, ${c2} 90deg 180deg, ${c3} 180deg 270deg, ${c4} 270deg`
		return { background: `conic-gradient(${bg})` }
	}
	return (
		<Form onChange={fn}>
			{color_map.map((colors, i) => (
				<Label style={style(colors)} class='color-radio'>
					<Input type='radio' value={i} name='colors' checked={store.id === i} />
					<Border class='br' />
				</Label>
			))}
		</Form>
	)
}

const ClearCache = ()=>{
	const Button = styled.button`background:unset;border:1px solid var(--ch_f);border-radius:4px;display:flex;align-items:center;`
	const fn = (e: Event) => {
		storage.set({ repo_data: {} })
		const target = e.target as HTMLElement
		target.classList.add('working')
		setTimeout(() => target.classList.remove('working'), 500)
	}
	return (
		<div style={{ display: 'flex',alignItems:'center' }}>
			<Heading style={{ flex: 1, marginRight: '1em' }}>Clear Cache</Heading>
			<Button onClick={fn} class='opt_ClrCache'>
				<svg width='20' viewBox='0 0 20 20' class='opt_svg'>
					<path d='M3.07 9.05a7 7 0 0112.55-3.22l.13.17H12.5a.5.5 0 100 1h4a.5.5 0 00.5-.5v-4a.5.5 0 00-1 0v2.2a8 8 0 101.99 4.77.5.5 0 00-1 .08 7 7 0 11-13.92-.5z'></path>
				</svg>
				Clear
			</Button>
		</div>
	)
}


const ROOT = document.getElementById('root')
const feat_ids=features.map((f) => f.id)
const { graph_theme, ...feat_store } = await storage.get('graph_theme', ...feat_ids)

ROOT?.appendChild(<>
	<Heading>General Options</Heading>
	<FeaturesList store={feat_store} />
	<Heading>Contribution Graph Theme</Heading>
	<ColorList store={graph_theme}/>
	<ClearCache/>
	<br/>
	<p>For more information, visit <Link href='https://github.com/GrayGalaxy/better-github#readme' target='_blank'>the readme page</Link>.</p>
</>)
