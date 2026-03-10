<script lang="ts">
	/*
	For this to work properly there need to be a global-settings-state component BEFORE this dialog is used.
	Otherwise loading initial settings wont work.
	*/
	import { onMount, untrack } from 'svelte';
	import Modal from '$components/modals/empty-modal.svelte';
	import { XIcon } from '@lucide/svelte';
	import type { Settings, SettingsKey } from '$scripts/types/settings.svelte';
	import {
		defaultSettings,
		settingsSchema,
		globalSettings,
		globalSettingsState
	} from '$scripts/types/settings.svelte';

	interface Props {
		open: boolean;
		openOnBlank: boolean; // If true, open the dialog if no previous settings were loaded
	}

	let { open = $bindable(), openOnBlank = false } = $props();

	let oldSettings: Settings = $state(defaultSettings());
	let newSettings: Settings = $state(defaultSettings());

	// Copy the global settings on load. Also, determine if dialog should load opened.
	onMount(() => {
		newSettings = { ...globalSettings };
		oldSettings = { ...globalSettings };
		if (openOnBlank && !globalSettingsState.stored) {
			open = true;
		}
	});

	// Update the dialogs fields if globalSettings changes, unless they carry local changes
	$effect(() => {
		settingsSchema.forEach((setting) => {
			if (!untrack(() => isDirty(setting.key))) {
				newSettings[setting.key] = globalSettings[setting.key];
				oldSettings[setting.key] = globalSettings[setting.key];
			}
		});
	});

	function isDirty(key: SettingsKey) {
		// simple deep comparison via JSON; good enough for primitives/arrays
		return JSON.stringify(oldSettings[key]) !== JSON.stringify(newSettings[key]);
	}

	function applySettings() {
		oldSettings = { ...newSettings };
		Object.assign(globalSettings, newSettings);
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
			<button class="block w-1/1" onkeydown={handleEnter}>
				<label class="label">
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
			</button>
		{/each}
	</div>
	<footer class="flex justify-end gap-2">
		<button class="btn preset-tonal" onclick={() => (open = false)}>Cancel</button>
		<button type="button" class="btn preset-filled" onclick={applySettings}>Apply</button>
		<button type="button" class="btn preset-filled" onclick={saveAndClose}>Save</button>
	</footer>
</Modal>
