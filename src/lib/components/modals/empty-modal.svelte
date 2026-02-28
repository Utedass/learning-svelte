<script lang="ts">
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		open: boolean;
		children: Snippet;
	}

	let { open = $bindable(), children }: Props = $props();

	let visible = $state(false);
</script>

<Dialog {open}>
	<Portal>
		<Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-900-100/20 backdrop-blur-xs" />
		<Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center p-4">
			<Dialog.Content class="bg-surface-50-950 w-full max-w-xl space-y-4 card p-4">
				{@render children()}
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>
