<script lang="ts">
	import SettingsDialog from '$components/Modals/settings-dialog.svelte';
	import { Settings as SettingsIcon } from '@lucide/svelte';
	import type { Settings } from '$scripts/types/settings.svelte';
	import { globalSettings } from '$scripts/types/settings.svelte';
	import type {
		Product,
		Location,
		ProductGroup,
		ProductBarcode,
		StockEntry,
		StockEntryWithUserfields,
		StockCurrentLocationSimple,
		StockCurrentLocationAggregated,
		QuantityUnit,
		StockProductDetails,
		StockProductLocation,
		StockProductEntry
	} from '$scripts/inventory.svelte';
	import {
		fetchAll,
		products,
		productsById,
		locations,
		locationsById,
		productGroups,
		productGroupsById,
		productBarcodes,
		productBarcodesById,
		stockEntries,
		stockEntriesById
	} from '$scripts/inventory.svelte';
	import LocationAccordion from '$components/items/location-accordion.svelte';

	let searchString = $state('7311041070383');
	let filteredProducts: Product[] = $state([]);

	function createProduct(id: number, name: string): Product {
		const p: Product = {
			id: id,
			name: name,
			description: 'Yeeehaaah',
			product_group_id: 1337,
			active: 1,
			location_id: 1337,
			shopping_location_id: 1338,
			qu_id_purchase: 1337,
			qu_id_stock: 1337,
			min_stock_amount: 1337,
			default_best_before_days: 1337,
			default_best_before_days_after_open: 1337,
			default_best_before_days_after_freezing: 1337,
			default_best_before_days_after_thawing: 1337,
			picture_file_name: 'Yeeehaaah',
			enable_tare_weight_handling: 1,
			tare_weight: 1337,
			not_check_stock_fulfillment_for_recipes: 1,
			parent_product_id: 1338,
			calories: 1337,
			cumulate_min_stock_amount_of_sub_products: 1,
			due_type: 1337,
			quick_consume_amount: 1337,
			hide_on_stock_overview: 1,
			default_stock_label_type: 1337,
			should_not_be_frozen: 1,
			treat_opened_as_out_of_stock: 1,
			no_own_stock: 1,
			default_consume_location_id: 1337,
			move_on_open: 1,
			row_created_timestamp: 'Yeeehaaah',
			qu_id_consume: 1337,
			auto_reprint_stock_label: 1,
			quick_open_amount: 1337,
			qu_id_price: 1337,
			disable_open: 1,
			default_purchase_price_type: 1337
		};
		return p;
	}

	let searchReasoning: string = $state('');

	$effect(() => {
		if (searchString !== '') {
			let reasoningString = '';
			const matchingProductNames = products.filter((p) =>
				p.name.toLocaleLowerCase().includes(searchString.toLowerCase())
			);
			const matchingBarcodes = productBarcodes.filter((b) => {
				return b.barcode === searchString;
			});
			const grocyLabelMatch = searchString.match('grcy:p:(\\d+):([0-9a-c]{13})');

			reasoningString = `Number of matching product names: ${matchingProductNames.length}\n`;
			reasoningString += `Number of matching barcodes: ${matchingBarcodes.length}\n`;
			if (grocyLabelMatch) {
				reasoningString += `Seems to be a grocy-label with product-id: ${grocyLabelMatch[1]} and stock-id: ${grocyLabelMatch[2]}\n`;
			} else {
				reasoningString += `Does not seem to be a grocy-label\n`;
			}

			if (matchingProductNames.length == 1) {
				reasoningString += `Found sole match based on product name, continue with ${matchingProductNames[0].name}`;
			} else {
				reasoningString += `Couldn't determine product based on product name.`;
			}

			searchReasoning = reasoningString;
			filteredProducts = products.filter((p) =>
				p.name.toLowerCase().includes(searchString.toLowerCase())
			);
		} else {
			filteredProducts = [];
		}
	});
</script>

<pre class="pre">{JSON.stringify(stockEntriesById[187], null, 2)}</pre>
<pre class="pre">{JSON.stringify('grcy:p:74:686969187aa7c'.match('grcy:p:\\d'), null, 2)}</pre>

<h1 class="h1">Lets get some stuff.</h1>
<div>
	<button class="btn preset-filled" onclick={fetchAll}>Get some products!!</button>
	<p>Currently {Object.keys(products).length} products in memory</p>
	<p>Currently {Object.keys(productsById).length} productsById in memory</p>
	<p>Currently {Object.keys(locations).length} locations in memory</p>
	<p>Currently {Object.keys(locationsById).length} locationsById in memory</p>
	<p>Currently {Object.keys(productGroups).length} productGroups in memory</p>
	<p>Currently {Object.keys(productGroupsById).length} productGroupsById in memory</p>
	<p>Currently {Object.keys(productBarcodes).length} productBarcodes in memory</p>
	<p>Currently {Object.keys(productBarcodesById).length} productBarcodesById in memory</p>
	<p>Currently {Object.keys(stockEntries).length} stockEntries in memory</p>
	<p>Currently {Object.keys(stockEntriesById).length} stockEntriesById in memory</p>
</div>

<div class="flex gap-2 my-2">
	<button
		class="btn preset-filled"
		onclick={() => {
			products.push(createProduct(1337, 'döderpastej'));
		}}>Lägg till i products</button>
	<button
		class="btn preset-filled"
		onclick={() => {
			productsById[1338] = createProduct(1338, 'kameltå');
		}}>Lägg till i productsById</button>
</div>

<div class="flex gap-2 my-2">
	{#if products.length > 2}
		<button class="btn preset-filled" onclick={() => (products[2].name += ' HA')}
			>Ändra nåt!</button>
		<div class="card">
			<div>Lök by index</div>
			<div>{products[2].id}</div>
			<div>{products[2].name}</div>
		</div>
	{/if}
	{#if '4' in productsById}
		<button class="btn preset-filled" onclick={() => (productsById[4].name += ' HO')}
			>Ändra nåt!</button>

		<div class="card">
			<div>Lök by id</div>
			<div>{productsById[4].id}</div>
			<div>{productsById[4].name}</div>
		</div>
	{/if}
</div>

<div>
	<input type="text" class="input" bind:value={searchString} />
</div>
<div>
	<span>Reasoning:</span>
	<textarea disabled class="input disabled">{searchReasoning}</textarea>
</div>

{#each filteredProducts as p}
	<div class="card border border-surface-500">
		<ul class="list">
			{#each Object.entries(p) as [key, value]}
				<li class="border-b border-surface-500 w-full flex justify-between">
					<strong class="ml-4">{key}:</strong>
					<span class="mr-4">{value ? value : '<undefined>'}</span>
				</li>
			{/each}
		</ul>
	</div>
	<hr class="hr border-t-4" />
{/each}

{#each stockEntries.slice(0, 10) as p}
	<div class="card border border-surface-500">
		<ul class="list">
			{#each Object.entries(p) as [key, value]}
				<li class="border-b border-surface-500 w-full flex justify-between">
					<strong class="ml-4">{key}:</strong>
					<span class="mr-4">{value ? value : '<undefined>'}</span>
				</li>
			{/each}
		</ul>
	</div>
	<hr class="hr border-t-4" />
{/each}

<LocationAccordion {locations} />

<style>
	h1 {
		line-height: 1.5;
	}
	textarea {
		height: 20em;
	}
</style>
