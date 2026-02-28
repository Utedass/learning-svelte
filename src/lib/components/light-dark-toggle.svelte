<script lang="ts">
	import { Switch } from '@skeletonlabs/skeleton-svelte';
	import { globalSettings } from '$scripts/types/settings.svelte.ts';

	let checked = $state(false);

	$effect(() => {
		if (globalSettings.DarkMode == 'light') {
			checked = false;
		} else if (globalSettings.DarkMode == 'dark') {
			checked = true;
		} else {
			checked = true;
		}
	});

	const onCheckedChange = (event: { checked: boolean }) => {
		if (!checked) {
			globalSettings.DarkMode = 'dark';
		} else {
			globalSettings.DarkMode = 'light';
		}
		//checked = event.checked;
	};
</script>

<Switch {checked} {onCheckedChange}>
	<Switch.Control>
		<Switch.Thumb />
	</Switch.Control>
	<Switch.HiddenInput />
</Switch>
