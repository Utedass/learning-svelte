<script lang="ts">
	import SettingsDialog from '$components/Modals/settings-dialog.svelte';
	import { Settings as SettingsIcon } from '@lucide/svelte';
	import type { Settings } from '$scripts/types/settings';
	import { defaultSettings } from '$scripts/types/settings';

	let visible = $state(false);

	let settings: Settings = $state(defaultSettings());

	function onOpenChange() {
		console.log('State changed:', visible);
	}
</script>

<h1 class="h1">Lets get some stuff.</h1>

<button type="button" class="btn preset-filled" onclick={() => (visible = !visible)}
	>Show settings<SettingsIcon /></button>

<SettingsDialog bind:open={visible} bind:settings openOnBlank="true" />

<p>Current settings: {JSON.stringify(settings)}</p>

<style>
	h1 {
		line-height: 1.5;
	}
</style>
