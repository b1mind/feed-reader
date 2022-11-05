<script>
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import { session } from '$app/stores'
	// export let msg
</script>

<h1>Welcome</h1>
{#if $session.user}
	{$session.user.nick} you are logged in.
{/if}
