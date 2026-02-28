<script lang="ts">
	import SettingsDialog from '$components/Modals/settings-dialog.svelte';
	import { Settings as SettingsIcon } from '@lucide/svelte';
	import type { Settings } from '$scripts/types/settings.svelte.ts';
	import {
		defaultSettings,
		globalSettings,
		globalSettingsState
	} from '$scripts/types/settings.svelte.ts';

	let visible = $state(false);
</script>

<span class="badge-icon preset-filled" onclick={() => (visible = !visible)}>
	<SettingsIcon />
</span>

<SettingsDialog bind:open={visible} openOnBlank="true" />
