<script lang="ts">
	import SettingsDialog from '$components/Modals/settings-dialog.svelte';
	import { Settings as SettingsIcon } from '@lucide/svelte';
	import type { Settings } from '$scripts/types/settings.svelte.ts';
	import { globalSettings } from '$scripts/types/settings.svelte.ts';

	function onOpenChange() {
		console.log('State changed:', visible);
	}
</script>

<h1 class="h1">Lets get some stuff.</h1>

<style>
	h1 {
		line-height: 1.5;
	}
</style>
