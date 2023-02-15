<script>
	export let data
</script>

{#if !data.user}
	<p>not logged in</p>
{:else}
	<main>
		<h1>{data.user.name}: {data.user.nick}</h1>
		<img src={data.user.img} width="300px" alt="profile" />
		<p>
			<i>{data.user.note || ``}</i>
			<i>{data.user.contacts || ``}</i>
		</p>
	</main>
{/if}
