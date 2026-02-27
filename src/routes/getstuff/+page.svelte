<script lang="ts">
	import SettingsDialog from '$components/Modals/SettingsDialog.svelte';
	import { Settings } from '@lucide/svelte';

	let visible = $state(false);

	function onOpenChange() {
		console.log('State changed:', visible);
	}
</script>

<h1 class="h1">Lets get some stuff.</h1>

<button type="button" class="btn preset-filled" onclick={() => (visible = !visible)}
	>Show settings<Settings /></button>

<SettingsDialog bind:open={visible}>
	<p>Some settings here</p>
</SettingsDialog>

<div>
	<p>Current state: {visible ? 'Visible' : 'Hidden'}</p>
</div>

<style>
	h1 {
		line-height: 1.5;
	}
</style>
