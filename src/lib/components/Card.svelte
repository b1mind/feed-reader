<script>
	import { localSettings } from '$lib/stores'

	//note are we running this too much on every card? parent logic?
	let lastSeen = $localSettings.seenPosts

	function saveSeen(e, title) {
		e.target.closest('li').classList.add('seen')
		$localSettings.seenPosts = [title, ...$localSettings.seenPosts]
		// console.log($localSettings)
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
		<b>{feedTitle}</b>
		<a href={link} on:click={(e) => saveSeen(e, title)}>
			{title}
		</a>
		<br />

		<time>{published}</time>
		<div class="wrap-flex">
			{#if categories}
				{#each categories.slice(-3) as tag}
					<b>{tag}</b>
				{/each}
			{/if}
		</div>
	</header>

	{#if snippet}
		<p>{snippet}</p>
	{/if}

	<div class="img">
		{#if media.type === 'video/mp4'}
			<video controls>
				<source src={media.url} type={media.type} />
				<track kind="captions" />
			</video>
		{:else if media.type === 'audio/mpeg'}
			<figure>
				<audio controls src={media.url} type={media.type} preload="none" />
				<figcaption>{title}</figcaption>
			</figure>
		{:else if media.url}
			<img src={media.url} alt={media.alt} loading="lazy" />
		{:else}
			<!-- <img
				src="https://picsum.photos/500/350?random={Math.random()}"
				loading="lazy"
				alt="random from picsum photos"
			/> -->
		{/if}
	</div>
	<footer>foot</footer>
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
		border-radius: var(--radius);
		background: var(--clr-secondary-bg);
		overflow: hidden;
	}

	header {
		grid-row: header;
	}

	.wrap-flex > b {
		padding: 2px 5px;
		font-size: 0.75rem;
		background-color: var(--clr-primary-bg);
		border-radius: 10px;
	}

	a {
		font-size: 1.5rem;
		font-weight: bold;
	}

	a:visited {
		color: var(--clr-primary-dark);
	}

	.img,
	p {
		grid-column: 1 / -1;
		grid-row: content;
	}

	.img {
		justify-self: center;
		max-height: 250px;
		display: grid;
		border-radius: 8px;
		overflow: hidden;
		background-color: var(--seen, var(--clr-secondary-bg));
		z-index: 1;
	}

	img {
		display: block;
		max-width: 100%;
		max-height: 100%;
		object-fit: cover;
	}

	video {
		max-width: 100%;
	}
</style>
