<script lang="ts">
	import SettingsDialog from '$components/Modals/settings-dialog.svelte';
	import { Settings as SettingsIcon } from '@lucide/svelte';
	import type { Settings } from '$scripts/types/settings.svelte.ts';
	import { globalSettings } from '$scripts/types/settings.svelte.ts';
	import type { Product } from '$scripts/inventory.svelte.ts';
	import {
		reply,
		getSomething,
		tass,
		fetchProducts,
		products,
		productsById
	} from '$scripts/inventory.svelte.ts';

	let searchString = $state('');
	let filteredProducts: Product[] = $state([]);

	$effect(() => {
		if (searchString !== '') {
			filteredProducts = products.filter((p) =>
				p.name.toLowerCase().includes(searchString.toLowerCase())
			);
		} else {
			filteredProducts = [];
		}
	});
</script>

<h1 class="h1">Lets get some stuff.</h1>

<p>Currently {Object.keys(products).length} products in memory</p>
<p>Currently {Object.keys(productsById).length} products in memory</p>
<button class="btn preset-filled" onclick={fetchProducts}>Get some products!!</button>

<div>
	<input type="text" class="input" bind:value={searchString} />
</div>

{#each filteredProducts as p}
	<div class="card">
		<div>{p.id}</div>
		<div>{p.name}</div>
	</div>
	<hr />
{/each}
<button class="btn preset-filled" onclick={() => (productsById[4].name += ' HA')}
	>Ändra nåt!</button>

{#if products.length > 2}
	<button class="btn preset-filled" onclick={() => (products[2].name += ' HA')}>Ändra nåt!</button>
	<div class="card">
		<div>{products[2].id}</div>
		<div>{products[2].name}</div>
	</div>
{/if}

<style>
	h1 {
		line-height: 1.5;
	}
</style>
