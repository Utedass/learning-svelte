<script lang="ts">
	import LightDarkToggle from '$components/light-dark-toggle.svelte';
	import SettingsGear from '$components/settings-gear.svelte';
</script>

<div class="flex preset-filled-secondary-100-900 p-4">
	<div class="flex flex-wrap items-center gap-4">
		<a href="/pages/./">home</a>
		<a href="/pages/about">about</a>
		<a href="/pages/trystuff">trystuff</a>
		<a href="/pages/slugstuff">slugstuff</a>
		<a href="/pages/layouts1">layouts1</a>
		<a href="/pages/layouts2">layouts2</a>
		<a href="/pages/getstuff">getstuff</a>
		<a href="/pages/hierarchy">Grocy parents</a>
		<a href="/pages/zebra">Zebra</a>
		<a href="/pages/media-queries">Media queries</a>
		<a href="/pages/404">404</a>
	</div>
	<div class="ml-auto flex flex-wrap-reverse gap-4 items-center">
		<LightDarkToggle />
		<SettingsGear />
	</div>
</div>
