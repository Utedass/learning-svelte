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
	let filterChilds = $state(false);
	let filterChildless = $state(false);
	let filterParents = $state(false);
	let showResults = $state(true);
	let showSelected = $state(false);
	let showParentRelations = $state(true);
	let searchString = $state('mjölk');

	let filteredProducts: Product[] = $state([]);
	let selectedProducts: Record<number, boolean> = $state({});

	let parentRelations: Record<number, number[]> = $state({});

	$effect(() => {
		let reducedList: Product[] = products;
		if (filterOrphans) {
			reducedList = reducedList.filter((e) => {
				return e.parent_product_id == null;
			});
		}
		if (filterChilds) {
			reducedList = reducedList.filter((e) => {
				return e.parent_product_id != null;
			});
		}
		if (filterChildless) {
			reducedList = reducedList.filter((e) => {
				return !(e.id in parentRelations);
			});
		}
		if (filterParents) {
			reducedList = reducedList.filter((e) => {
				return e.id in parentRelations;
			});
		}
		if (searchString.length > 0) {
			reducedList = reducedList.filter((p) =>
				p.name.toLocaleLowerCase().includes(searchString.toLowerCase())
			);
		}

		filteredProducts = reducedList;
	});

	function findParentChildRelations() {
		parentRelations = {};
		products.forEach((e) => {
			if (e.parent_product_id) {
				if (e.parent_product_id in parentRelations) {
					parentRelations[e.parent_product_id].push(e.id);
				} else {
					parentRelations[e.parent_product_id] = [e.id];
				}
			}
		});
	}

	// onMount function runs once the page loads
	onMount(async () => {
		await fetchAll();
		findParentChildRelations();
	});
</script>

<div>
	<div class="flex gap-4 m-1">
		<div>
			<button class="btn preset-filled" onclick={fetchAll}>Reload data</button>
		</div>
		<div>
			<button class="btn preset-filled" onclick={findParentChildRelations}
				>Gather parent child relations</button>
		</div>
	</div>
	<div>
		<div>
			<span>Filter orphans</span>
			<input type="checkbox" bind:checked={filterOrphans} />
		</div>
		<div>
			<span>Filter childs</span>
			<input type="checkbox" bind:checked={filterChilds} />
		</div>
		<div>
			<span>Filter childless</span>
			<input type="checkbox" bind:checked={filterChildless} />
		</div>
		<div>
			<span>Filter parents</span>
			<input type="checkbox" bind:checked={filterParents} />
		</div>
		<div>
			<span>Show result</span>
			<input type="checkbox" bind:checked={showResults} />
			<span>({filteredProducts.length} result{filteredProducts.length == 1 ? '' : 's'})</span>
		</div>
	</div>
	<div>
		<span class="label-text">Search</span>
		<input type="text" class="input text" bind:value={searchString} />
	</div>
	<div>
		<div class="m-1">
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
				>({Object.values(selectedProducts).filter((e) => {
					return e;
				}).length} selected)</span>
		</div>
	</div>
</div>

<hr />

{#if showResults}
	Search results
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
					<div class="input preset-filled-primary-50-950">
						<p>
							<span class="preset-tonal-tertiary w-fit">{p.parent_product_id}</span> - {productsById[
								p.parent_product_id
							].name}
						</p>
					</div>
				{/if}

				{#if p.id in parentRelations}
					<span class="label-text">Childs</span>
					<div class="input preset-filled-secondary-100-900">
						{#each parentRelations[p.id] as cid}
							{@const c = productsById[cid]}
							<p>
								<span class="preset-tonal-tertiary w-fit">{cid}</span> - {c.name}
							</p>
						{/each}
					</div>
				{/if}
			</div>
		</label>
	{/each}
{/if}

<hr />

{#if showSelected}
	Search results
	{#each Object.entries(selectedProducts) as [key, selected]}
		{@const p = productsById[Number(key)]}
		{#if selected}
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
						<div class="input preset-filled-primary-50-950">
							<p>
								<span class="preset-tonal-tertiary w-fit">{p.parent_product_id}</span> - {productsById[
									p.parent_product_id
								].name}
							</p>
						</div>
					{/if}

					{#if p.id in parentRelations}
						<span class="label-text">Childs</span>
						<div class="input preset-filled-secondary-100-900">
							{#each parentRelations[p.id] as cid}
								{@const c = productsById[cid]}
								<p>
									<span class="preset-tonal-tertiary w-fit">{cid}</span> - {c.name}
								</p>
							{/each}
						</div>
					{/if}
				</div>
			</label>
		{/if}
	{/each}
{/if}

{#if showSelected}
	Selected
	{#each Object.entries(selectedProducts) as [key, selected]}
		{@const p = productsById[Number(key)]}
		{#if selected}
			<div class="flex input preset-outlined-primary-400-600">
				<div class="flex-auto">
					<p>{p.id}</p>
					<p>{p.name}</p>
					{#if p.parent_product_id}
						<span class="label-text">Parent</span>
						<div class="input preset-filled-primary-50-950">
							<p>
								<span class="preset-tonal-tertiary w-fit">{p.parent_product_id}</span> - {productsById[
									p.parent_product_id
								].name}
							</p>
						</div>
					{/if}

					{#if p.id in parentRelations}
						<span class="label-text">Childs</span>
						<div class="input preset-filled-secondary-100-900">
							{#each parentRelations[p.id] as cid}
								{@const c = productsById[cid]}
								<p>
									<span class="preset-tonal-tertiary w-fit">{cid}</span> - {c.name}
								</p>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		{/if}
	{/each}
{/if}

<hr />
{#if showParentRelations}
	Parent relations
	<pre class="pre">
	{JSON.stringify(parentRelations, null, 2)}
</pre>
{/if}

<style>
	div {
		margin: 4px;
	}
</style>
