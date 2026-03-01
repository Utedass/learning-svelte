<script lang="ts">
	import { Accordion } from '@skeletonlabs/skeleton-svelte';
	import type { Location } from '$scripts/inventory.svelte';

	interface Props {
		locations: Location[];
	}

	let { locations }: Props = $props();
</script>

<Accordion>
	{#each locations as location}
		<Accordion.Item value={location.id.toString()}>
			<h3 class="card preset-filled-tertiary-100-900 h3">
				<Accordion.ItemTrigger>{location.name}</Accordion.ItemTrigger>
			</h3>

			<Accordion.ItemContent>
				<ul class="list-disc pl-4">
					<li><strong>ID:</strong> {location.id}</li>
					<li><strong>Description:</strong> {location.description ?? '–'}</li>
					<li><strong>Freezer:</strong> {location.is_freezer ? 'Yes' : 'No'}</li>
					<li><strong>Active:</strong> {location.active ? 'Yes' : 'No'}</li>
				</ul>
			</Accordion.ItemContent>
		</Accordion.Item>
	{/each}
</Accordion>

<style>
	/* additional component-specific styles can go here */
</style>
