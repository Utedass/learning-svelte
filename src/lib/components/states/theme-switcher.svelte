<script lang="ts">
	import { globalSettings, ALL_THEMES } from '$scripts/types/settings.svelte.ts';

	// Change to affect theme instead
	$effect(() => {
		console.log('Lets apply Theme ' + JSON.stringify(globalSettings.Theme));
		console.log(`${globalSettings.Theme} in ${ALL_THEMES} = ${ALL_THEMES.includes(globalSettings.Theme)}`);
		if (ALL_THEMES.includes(globalSettings.Theme)) {
			document.documentElement.setAttribute('data-theme', globalSettings.Theme);
		} else {
			const randomElement = ALL_THEMES[Math.floor(Math.random() * ALL_THEMES.length)];
			document.documentElement.setAttribute('data-theme', randomElement);
		}
	});
</script>

<svelte:head>
	<script>
		//document.documentElement.setAttribute('data-mode', localStorage.getItem('mode') || 'dark');
	</script>
</svelte:head>
