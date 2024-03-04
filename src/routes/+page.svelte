<script>
	export let data
</script>

{#if !data?.info}
	<h1>Solid Pod RSS</h1>
	<p>
		You need to <a href="/auth/login">login</a> to use this app.
	</p>
	<p>Register for a Pod from any (NodeSolidServer)</p>
	<ul>
		<li>
			<a href="http://solidcommunity.net/register">SolidCommunity</a>
		</li>
		<li>
			<a href="https://datapod.igrant.io/register">iGrant.io</a>
		</li>
		<li>
			<a href="https://solidweb.org">solidweb.org</a>
		</li>
	</ul>
{:else}
	<h1>RSS Share Pod</h1>

	<b>
		{data?.allSessions?.length} users logged in. Enjoy owning your own data!
	</b>

	<p>
		Get started by following someone with their WebId and adding finding
		feeds/lists to add, make a start a list with opml, or make a new one!
	</p>

	<p>more to come...</p>
{/if}
