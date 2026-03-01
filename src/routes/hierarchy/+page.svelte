<script lang="ts">
	import { onMount } from 'svelte';
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

	let filterOrphans = $state(false);
	let filterParents = $state(false);
	let showResults = $state(true);
	let showSelected = $state(false);
	let searchString = $state('mjölk');

	let filteredProducts: Product[] = $state([]);
	let selectedProducts: Record<number, boolean> = $state({});

	$effect(() => {
		let reducedList: Product[] = products;
		if (filterOrphans) {
			reducedList = reducedList.filter((e) => {
				return e.parent_product_id == null;
			});
		}
		if (filterParents) {
		}
		if (searchString.length > 0) {
			reducedList = reducedList.filter((p) =>
				p.name.toLocaleLowerCase().includes(searchString.toLowerCase())
			);
		}

		filteredProducts = reducedList;
	});
</script>

<div>
	<div>
		<div>
			<button class="btn preset-filled" onclick={fetchAll}>Reload data</button>
		</div>
	</div>
	<div>
		<div>
			<span>Filter orphans</span>
			<input type="checkbox" bind:checked={filterOrphans} />
		</div>
		<div>
			<span>Filter parents</span>
			<input type="checkbox" bind:checked={filterParents} />
		</div>
		<div>
			<span>Show result</span>
			<input type="checkbox" bind:checked={showResults} />
		</div>
	</div>
	<div>
		<span class="label-text">Search</span>
		<input type="text" class="input text" bind:value={searchString} />
	</div>
	<div>
		<div>
			<button
				class="btn preset-filled"
				onclick={() => {
					filteredProducts.forEach((e) => {
						selectedProducts[e.id] = true;
					});
				}}>Add filtered to selection</button>
		</div>
		<div>
			<button
				class="btn preset-filled"
				onclick={() => {
					selectedProducts = {};
				}}>Clear all selected</button>
		</div>
		<div>
			<span>
				<span>Show selected</span>
				<input type="checkbox" bind:checked={showSelected} />
			</span>
			<span
				>Currently selected products: {Object.values(selectedProducts).filter((e) => {
					return e;
				}).length}</span>
		</div>
	</div>
</div>

<hr />

{#if showResults}
	{#each filteredProducts as p}
		<label class="flex input preset-outlined-primary-400-600">
			<div
				class="flex-none p-2 border-none
			 preset-outlined-primary-400-600 flex place-items-center">
				<input type="checkbox" bind:checked={selectedProducts[p.id]} />
			</div>
			<div class="flex-auto">
				<p class="preset-tonal-tertiary w-fit">{p.id}</p>
				<p>{p.name}</p>
				{#if p.parent_product_id}
					<span class="label-text">Parent</span>
					<div class="input preset-outlined-primary-400-600">
						<p><span></span> {productsById[p.parent_product_id].name}</p>
					</div>
				{/if}
			</div>
		</label>
	{/each}
{/if}

<hr />
Selected
{#if showSelected}
	{#each Object.entries(selectedProducts) as [key, selected]}
		{@const p = productsById[Number(key)]}
		{#if selected}
			<div class="flex input preset-outlined-primary-400-600">
				<div class="flex-auto">
					<p>{p.id}</p>
					<p>{p.name}</p>
					{#if p.parent_product_id}
						<div class="input preset-outlined-primary-400-600">
							<p>{productsById[p.parent_product_id].name}</p>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	{/each}
{/if}

<style>
</style>
