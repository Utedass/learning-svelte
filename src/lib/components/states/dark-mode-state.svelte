<script lang="ts">
	import { globalSettings } from '$scripts/types/settings.svelte.ts';

	let darkMode = $state('system');

	$effect(() => {
		console.log('Lets apply light/dark mode! ' + JSON.stringify(darkMode));
		if (globalSettings.DarkMode == 'light') {
			document.documentElement.setAttribute('data-mode', 'light');
		} else if (globalSettings.DarkMode == 'dark') {
			document.documentElement.setAttribute('data-mode', 'dark');
		} else {
			document.documentElement.setAttribute('data-mode', 'dark');
		}
	});
</script>

<svelte:head>
	<script>
		//document.documentElement.setAttribute('data-mode', localStorage.getItem('mode') || 'dark');
	</script>
</svelte:head>
