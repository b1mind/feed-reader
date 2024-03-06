<script>
	import { localSettings } from '$lib/stores'
	import Icon from '$lib/components/Icon.svelte'

	//note are we running this too much on every card? parent logic?
	let lastSeen = $localSettings.seenPosts
	let target = $localSettings.settings.target ? 'target="_blank"' : null
	let rotate = false
	let down = false

	function saveSeen(e, title) {
		e.target.closest('article').classList.add('seen')
		$localSettings.seenPosts = [title, ...$localSettings.seenPosts]
	}

	function toggleImg() {
		rotate = !rotate
		down = !down
	}

	export let title = ''
	export let link = ''
	export let published = ''
	export let categories = ''
	export let feedTitle = ''
	export let snippet = ''
	export let media = {}
</script>

<article class:seen={lastSeen.includes(title)}>
	<header>
		<!-- //todo check if author fallback to this -->
		{#if feedTitle}
			<b>{feedTitle}</b>
			<br />
		{/if}
		<a {target} href={link} on:click={(e) => saveSeen(e, title)}>
			{title}
		</a>

		<div class="wrap-flex">
			{#if categories}
				{#each categories.slice(-4) as tag}
					<b>{tag}</b>
				{/each}
			{/if}
		</div>
	</header>

	{#if snippet}
		<p>
			{snippet}
			<a href={link}>..Read More</a>
		</p>
	{/if}

	{#if media.url !== ''}
		<div class="media" class:down>
			{#if snippet}
				<button class:rotate type="button" on:click={toggleImg}
					><Icon name="arrow-shift-down"></Icon></button
				>
			{/if}

			{#if media.type === 'video/mp4'}
				<video controls preload="metadata">
					<source src={media.url} type={media.type} />
					<track kind="captions" />
				</video>
			{:else if media.type === 'audio/mpeg'}
				<figure>
					<audio
						controls
						src={media.url}
						type={media.type}
						preload="metadata"
					/>
					<figcaption>{title}</figcaption>
				</figure>
			{:else if media.url}
				<picture class="img">
					<!-- need fallback if fails to load -->

					<img src={media.url} alt={media.alt} loading="lazy" />
					<!-- <img
						src="https://picsum.photos/500/350?random={Math.random()}"
						loading="lazy"
						alt="random from picsum photos"
					/> -->
				</picture>

				<b class="error">image 404</b>
			{/if}
		</div>
	{/if}
	<footer><time>{published}</time></footer>
</article>

<style lang="scss">
	.seen {
		background: var(--clr-secondary-bg-alt);
	}

	article {
		--radius: 10px;
		padding: 0.5rem;
		display: grid;
		grid-template-rows:
			[header] auto
			[content] 1fr;
		grid-template-columns: 1fr;
		gap: 10px;
		border-radius: var(--radius);
		background: var(--clr-secondary-bg);
		overflow: hidden;
	}

	header {
		grid-row: header;

		& > a {
			font-size: 1.5rem;
			font-weight: bold;
		}

		& > a:visited {
			color: var(--clr-primary-dark);
		}
	}

	.wrap-flex {
		justify-content: end;
		margin-block-start: 4px;

		& > b {
			padding: 2px 5px;
			font-size: 0.75rem;
			background-color: var(--clr-primary-bg);
			border-radius: 10px;
		}
	}

	.media,
	p {
		grid-column: 1 / -1;
		grid-row: content;
	}

	.media {
		justify-self: center;
		align-self: end;
		position: relative;
		width: 100%;
		min-height: 100%;
		max-height: 250px;
		display: grid;
		place-content: center;
		border-radius: 8px;
		overflow: hidden;
		background-color: var(--seen, var(--clr-secondary-bg));

		button {
			--fill: var(--clr-primary);
			position: absolute;
			justify-self: end;
			align-self: start;
			padding: 1px;
			border: 0;
			border-radius: 0 10px 0 10px;
			z-index: 9;
			&:hover {
				--fill: var(--clr-primary-bg);
			}
		}
	}

	video {
		max-width: 100%;
	}

	video,
	picture,
	figure {
		z-index: 1;
	}

	.down {
		transform: translateY(99%);
	}

	.rotate {
		transform: rotate(180deg);
	}

	.error {
		position: absolute;
		place-self: center;
		z-index: 0;
	}
</style>
