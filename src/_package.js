const repo_cache = {
	get: async (repo_name) => {
		const { repo_data } = await storage.get('repo_data')
		return repo_data[repo_name] || null
	},
	set: async (repo_name, data) => {
		const { repo_data } = await storage.get('repo_data')
		const object = { ...repo_data, [repo_name]: data }
		await storage.set({ repo_data: object })
		return
	},
}

const get_package_data = async (repo) => {
	let pkg = await repo_cache.get(repo)
	if (!pkg) {
		const url = `https://api.github.com/repos/${repo}/contents/package.json`
		const res = await fetch(url)
		if (res.status > 400) return repo_cache.set(repo, 1)
		const content = (await res.json()).content
		const name = JSON.parse(atob(content))?.name
		if (!name) return repo_cache.set(repo, 1)
		// organise
		pkg = { name, npm: await npm_data(name), date: new Date().toISOString() }
		repo_cache.set(repo, pkg)
	}
	if (!pkg.name) return
	const time_diff = (new Date() - new Date(pkg.date)) / (3600 * 24 * 1000)
	if (time_diff > 30 && pkg.npm) {
		pkg.npm = await npm_data(pkg.name)
		pkg.date = new Date().toISOString()
		repo_cache.set(repo, pkg)
	}
	return pkg
}

const npm_data = async (name) => {
	const url = `https://proxy.garygalaxy.workers.dev/npm/${name}`
	const res = await fetch(url).catch((e) => false)
	const data = await res?.json()
	return data
}

const add_package_info = async () => {
	const class_name = 'BtrGH_npm'
	const { npm_data: enabled } = await storage.get('npm_data')
	if (!enabled || $(`.file-navigation .${class_name}`).length > 0) return

	const parsedUrl = new URL(window.location.href)
	const [, owner, repo] = parsedUrl.pathname.split('/')
	if (!owner || !repo) return
	// get package name
	const repo_name = `${owner}/${repo}`
	const data = await get_package_data(repo_name)
	if (!data || !data.npm) return

	const nav_btn = $('.file-navigation > *:last-child')
	const npm_icon = `<svg viewBox="0 0 1024 1024" width="16" class="octicon"><path d="M768 896H256a128 128 0 0 1-128-128V256a128 128 0 0 1 128-128h512a128 128 0 0 1 128 128v512a128 128 0 0 1-128 128zM256 213.333333a42.666667 42.666667 0 0 0-42.666667 42.666667v512a42.666667 42.666667 0 0 0 42.666667 42.666667h512a42.666667 42.666667 0 0 0 42.666667-42.666667V256a42.666667 42.666667 0 0 0-42.666667-42.666667z" /><path d="M512 384h170.666667v426.666667h-170.666667z" /></svg>`

	// prettier-ignore
	const npm_widget = $(`
	<span class="${class_name} d-none d-md-flex ml-2">
		<details class="position-relative details-overlay details-reset js-codespaces-details-container">
			<summary class="btn px-2">${npm_icon}</summary>
			<div class="position-relative">
				<div class="dropdown-menu dropdown-menu-sw p-0" style="top: 6px; width: 296px">
					<ul class="list-style-none">
						<li class="Box-row p-3 d-flex" style="flex-direction:column;gap:0.5rem">
							<div class="text-bold npm_text">NPM Package</div>
							<div class="input-group">
								<input class="form-control input-monospace input-sm color-bg-subtle" value="npm install ${data.npm.package}" readonly />
								<div class="input-group-button">
								<clipboard-copy value="npm install ${data.npm.package}" class="btn btn-sm js-clipboard-copy tooltipped-no-delay ClipboardButton data-copy-feedback="Copied!" data-tooltip-direction="n" tabindex="0" role="button" >
									<svg height="16" viewBox="0 0 16 16" class="octicon js-clipboard-copy-icon"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>
									<svg height="16" viewBox="0 0 16 16" class="octicon js-clipboard-check-icon color-fg-success d-none"><path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>
								</clipboard-copy>
							</div>
							</div>
							<div class="color-fg-muted px-1">
							${data.npm.date && `Last Updated:<b class="ml-2">${_time(data.npm.date)}</b></br>`}
							${data.npm.license && `License:<b class="ml-2">${data.npm.license}</b></br>`}
							${data.npm.version && `Version:<b class="ml-2">${data.npm.version}</b></br>`}
							</div>
						</li>
						<li class="Box-row Box-row--hover-gray p-3 mt-0">
							<a class="d-flex flex-items-center color-fg-default text-bold no-underline" href="${data.npm.url}" target="_blank"><i class="mr-2">${npm_icon}</i>View Package Details</a>
						</li>
						${data.npm.homepage && `
						<li class="Box-row Box-row--hover-gray p-3 mt-0">
							<a class="d-flex flex-items-center color-fg-default text-bold no-underline" href="${data.npm.homepage}" target="_blank">
							<svg height="16" viewBox="0 0 16 16" class="octicon mr-2">
							<path d="M10.604 1h4.146a.25.25 0 01.25.25v4.146a.25.25 0 01-.427.177L13.03 4.03 9.28 7.78a.75.75 0 01-1.06-1.06l3.75-3.75-1.543-1.543A.25.25 0 0110.604 1zM3.75 2A1.75 1.75 0 002 3.75v8.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 12.25v-3.5a.75.75 0 00-1.5 0v3.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-8.5a.25.25 0 01.25-.25h3.5a.75.75 0 000-1.5h-3.5z"></path>
							</svg>
								Visit Homepage
							</a>
						</li>
						`}
						<li class="Box-row Box-row--hover-gray p-0 mt-0">
							<p class="p-3 m-0">Downloads:<b class="float-right">${data.npm.downloads.slice(-1)[0]}</b></p>
							<canvas id="npm_cart" height="50"></canvas>
						</li>
					</ul>
				</div>
			</div>
		</details>
	</span>
	`)

	const dark = $('html').attr('data-color-mode') !== 'light'
	const stroke = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'
	const bg = dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'

	const canvas = npm_widget.find('#npm_cart')[0].getContext('2d')
	// prettier-ignore
	new Chart(canvas, {
		type: 'line', data: {
		labels: data.npm.downloads,
		datasets: [{
			data: data.npm.downloads,
			borderWidth: 2, borderColor: stroke,
			fill: true, backgroundColor: bg,
			tension: 0.5,
		}]},
		options: {
			// responsive: false,
			elements: { point: { radius: 0 } },
			plugins: { tooltip: { enabled: false }, legend: { display: false } },
			scales: { y: { display: false }, x: { display: false } },
		},
	})

	nav_btn.before(npm_widget)
}
