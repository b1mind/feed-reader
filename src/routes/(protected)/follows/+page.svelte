<script>
	// export let data
</script>

<p>you have no friends with RSS feed lists</p>
<p>You can start by following:</p>
<ul>
	<li>podrss.solidcommunity.net</li>
	<li>b1mind.inrupt.net</li>
</ul>

<form action="/follows?/addFriend" method="POST">
	<label for="friend">
		Add full webId or name.domain
		<br />
		<input
			type="text"
			name="friend"
			placeholder="name.solidcommunity.net"
			required
		/>
	</label>
	<button>add</button>
</form>

<p>Persons(webId)'s you follow (foaf.known) that also have PodRSS lists</p>
