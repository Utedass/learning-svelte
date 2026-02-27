<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();

	let dude = $state(0);
</script>

<div>
	<button class="badge preset-filled-primary-500" onclick={() => dude++}
		>{@render children?.()}</button
	>
	<p class="badge preset-tonal-success">Dude: {dude}</p>
</div>
