<script lang="ts">
	import SettingsDialog from '$components/Modals/settings-dialog.svelte';
	import { Settings as SettingsIcon } from '@lucide/svelte';
	import type { Settings } from '$scripts/types/settings.svelte.ts';
	import { globalSettings } from '$scripts/types/settings.svelte.ts';
	import type { Product } from '$scripts/inventory.svelte.ts';
	import { reply, getSomething, tass, fetchProducts, products } from '$scripts/inventory.svelte.ts';

	function onOpenChange() {
		console.log('State changed:', visible);
	}
</script>

<h1 class="h1">Lets get some stuff.</h1>

<p>{products.length}</p>
<button class="btn preset-filled" onclick={fetchProducts}>Get some products!!</button>

{#each Object.values(products) as p}
	<div class="card">
		<div>{p.id}</div>
		<div>{p.name}</div>
	</div>
	<hr />
{/each}
<button class="btn preset-filled" onclick={() => (products[4].name += ' HA')}>Ändra nåt!</button>

<style>
	h1 {
		line-height: 1.5;
	}
</style>
