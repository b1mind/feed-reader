<script>
	export let data
</script>

{#if !data?.user}
	<h1>PodRSS .social</h1>
	<p>
		You need to <a href="/auth/login">login</a> to use this app.
	</p>
	<p>Register for a Pod from any (NodeSolidServer)</p>
	<ul>
		<li>
			<a target="_blank" href="http://solidcommunity.net/register">
				SolidCommunity
			</a>
		</li>
		<li>
			<a target="_blank" href="https://datapod.igrant.io/register">iGrant.io</a>
		</li>
		<li>
			<a target="_blank" href="https://solidweb.org/register">solidweb.org</a>
		</li>
	</ul>
{:else}
	<h1>PodRSS .social</h1>

	<b>
		Welcome, enjoy owning your data!
		<br />
		{data?.allSessions?.length} users logged in.
	</b>

	<p>
		Get started by following someone with their WebId and find out what to add
		from their lists, start a list with opml, or make a new one by adding a
		feed!
	</p>

	<p>more to come...</p>
{/if}
