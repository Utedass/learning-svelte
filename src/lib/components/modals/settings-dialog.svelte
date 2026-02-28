<script lang="ts">
	import { onMount } from 'svelte';
	import Modal from '$components/modals/empty-modal.svelte';
	import { XIcon } from '@lucide/svelte';
	import type { Settings, SettingsKey } from '$types/settings';
	import { defaultSettings, settingsSchema } from '$types/settings';
	interface Props {
		open: boolean;
		settings: Settings;
		openOnBlank: boolean;
	}

	let { open = $bindable(), settings = $bindable(), openOnBlank = false } = $props();

	let oldSettings: Settings = $state(defaultSettings());
	let newSettings: Settings = $state(defaultSettings());

	$inspect(oldSettings);
	$inspect(newSettings);

	onMount(() => {
		console.log('SettingsDialog mounted');
		// Load settings from localStorage and merge with default settings.
		const savedSettings = localStorage.getItem('appSettings');
		if (savedSettings) {
			oldSettings = defaultSettings(JSON.parse(savedSettings));
			newSettings = { ...oldSettings };
			settings = { ...oldSettings };
		} else if (openOnBlank) {
			open = true;
		}
	});

	function isDirty(key: SettingsKey) {
		// simple deep comparison via JSON; good enough for primitives/arrays
		return JSON.stringify(oldSettings[key]) !== JSON.stringify(newSettings[key]);
	}

	function applySettings() {
		localStorage.setItem('appSettings', JSON.stringify(newSettings));
		console.log('Saved settings: ' + JSON.stringify(newSettings));
		oldSettings = { ...newSettings };
		settings = { ...oldSettings };
	}

	function closeSettings() {
		open = false;
	}

	function saveAndClose() {
		applySettings();
		closeSettings();
	}

	function handleEnter(e: KeyboardEvent) {
		console.log('Key down! ' + e.key);
		if (e.key === 'Enter') {
			console.log('Enter pressed anywhere in container');
			applySettings();
		}
		if (e.key === 'Escape') {
			closeSettings();
		}
	}
</script>

<Modal bind:open>
	<header class="flex items-center justify-between">
		<div class="text-lg font-bold">Settings</div>
		<button onclick={closeSettings} class="btn-icon hover:preset-tonal">
			<XIcon class="size-4" />
		</button>
	</header>
	<div>
		{#each settingsSchema as field}
			<label class="label" onkeydown={handleEnter}>
				<span class="label-text">{field.label}</span>
				{#if field.type === 'checkbox'}
					<input
						type="checkbox"
						class="{field.style} {isDirty(field.key) ? 'preset-tonal-warning' : ''}"
						bind:checked={newSettings[field.key as SettingsKey]} />
				{:else if field.type === 'string'}
					<input
						type={field.type}
						class="{field.style} {isDirty(field.key) ? 'preset-tonal-warning' : ''}"
						bind:value={newSettings[field.key as SettingsKey]} />
				{:else if field.type === 'number'}
					<input
						type={field.type}
						class="{field.style} {isDirty(field.key) ? 'preset-tonal-warning' : ''}"
						bind:value={newSettings[field.key as SettingsKey]} />
				{/if}
			</label>
		{/each}
	</div>
	<footer class="flex justify-end gap-2">
		<button class="btn preset-tonal" onclick={() => (open = false)}>Cancel</button>
		<button type="button" class="btn preset-filled" onclick={applySettings}>Apply</button>
		<button type="button" class="btn preset-filled" onclick={saveAndClose}>Save</button>
	</footer>
</Modal>
