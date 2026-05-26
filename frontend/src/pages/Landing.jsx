import { Link } from 'react-router-dom'

const stats = [
	{ value: '8', label: 'feature inputs captured' },
	{ value: '1 click', label: 'to reach the form' },
	{ value: 'Live', label: 'prediction feedback' },
]

const Landing = () => {
	return (
		<main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(124,173,113,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(236,223,204,0.12),transparent_26%),linear-gradient(180deg,#101511_0%,#171d18_45%,#0d100d_100%)] text-[#f4f1e8]">
			<div className="absolute inset-0 -z-10 opacity-70 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[72px_72px]" />
			<div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#88a27c]/20 blur-3xl animate-pulse" />
			<div className="absolute -bottom-36 -right-24 h-80 w-80 rounded-full bg-[#d8c6aa]/10 blur-3xl animate-pulse [animation-delay:1.2s]" />

			<section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-12 lg:px-10">
				<div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
					<div className="max-w-3xl">
						<div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#d9cfbf] shadow-[0_10px_40px_rgba(0,0,0,0.18)] backdrop-blur">
							<span className="h-2 w-2 rounded-full bg-[#9ab18e] shadow-[0_0_20px_rgba(154,177,142,0.8)]" />
							Sports Marketing Intelligence
						</div>

						<h1 className="text-5xl font-black leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
							Predict the audience most likely to buy cricket kits.
						</h1>

						<p className="mt-6 max-w-2xl text-base leading-8 text-[#e8e0d0]/78 sm:text-lg">
							Use a focused fan profile to generate a purchase prediction and customer segment.
							The form lives on a separate route so this page can act as a polished launch screen.
						</p>

						<div className="mt-8 flex flex-wrap items-center gap-4">
							<Link
								to="/Home"
								className="group inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#93a98b] to-[#c9b79b] px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-[#101511] shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-[#c9b79b]/70"
							>
								Predict Now
								<span className="ml-2 text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
							</Link>

							{/* <a
								href="#highlights"
								className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold tracking-[0.08em] text-[#f3eadb] backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
							>
								See highlights
							</a> */}
						</div>

						{/* <div className="mt-10 grid gap-4 sm:grid-cols-3">
							{stats.map((stat) => (
								<div
									key={stat.label}
									className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/8"
								>
									<p className="text-2xl font-black tracking-[-0.04em] text-white flex justify-center">{stat.value}</p>
									<p className="mt-2 text-sm leading-6 text-[#dfd6c7]/75 flex justify-center">{stat.label}</p>
								</div>
							))}
						</div> */}
					</div>

					{/* <div id="highlights" className="relative">
							<div className="absolute inset-0 -z-10 rounded-4xl bg-linear-to-br from-[#95aa8b]/25 via-transparent to-[#ccb18c]/20 blur-2xl" />
							<div className="rounded-4xl border border-white/10 bg-white/10 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
							<div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
								<div>
									<p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#d8cdbb]">Preview</p>
									<h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-white">Built for quick predictions</h2>
								</div>
								<div className="rounded-full border border-white/10 bg-[#90a686]/15 px-3 py-1 text-xs font-semibold text-[#ebdfca]">
									Tailwind styled
								</div>
							</div>

							<div className="mt-6 grid gap-4">
								{[
									'Track age, city, income, team preference, and engagement signals.',
									'Get an output segment and buy-intent prediction from the backend.',
									'Return to the form route anytime without losing the landing page.'
								].map((item, index) => (
									<div key={item} className="flex gap-4 rounded-2xl border border-white/10 bg-black/15 p-4">
										<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#97ad8f]/18 text-sm font-black text-[#efe4d2]">
											0{index + 1}
										</div>
										<p className="text-sm leading-7 text-[#e8e0d0]/80">{item}</p>
									</div>
								))}
							</div>
						</div>
					</div> */}
				</div>
			</section>
		</main>
	)
}

export default Landing
