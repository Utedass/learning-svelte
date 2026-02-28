<script lang="ts">
	import { onMount } from 'svelte';

	import {
		globalSettings,
		globalSettingsState,
		defaultSettings
	} from '$scripts/types/settings.svelte.ts';

	let mounted = false;

	// Save globalSettings to local storage as soon as they are changed (but after they are loaded)
	$effect(() => {
		console.log('The global settings effect running');
		const snapshot = JSON.stringify(globalSettings); // Dummy read just to register as dependency, because not read on first load.
		// We only want to react to changes after the initial assignments and loads.
		if (!mounted) return;
		console.log('The global settings are saved to browser');
		localStorage.setItem('appSettings', snapshot);
		globalSettingsState.stored = true;
	});

	// Load globalSettings from local storage
	onMount(() => {
		console.log('Global settings getting loaded');
		let mergedSettings: Settings = defaultSettings();
		const savedSettings = localStorage.getItem('appSettings');

		if (savedSettings) {
			console.log('Global settings restored!');
			mergedSettings = defaultSettings(JSON.parse(savedSettings));
			Object.assign(globalSettings, mergedSettings);
			globalSettingsState.stored = true;
		} else {
			console.log('No previous settings available.');
		}
		mounted = true;
	});
</script>
