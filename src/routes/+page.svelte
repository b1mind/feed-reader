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
	<h1>Welcome</h1>
	{data?.allSessions?.length} users logged in. provider.
{/if}
