<script lang="ts">
	import LightDarkToggle from '$components/light-dark-toggle.svelte';
</script>

<div class="flex preset-filled-secondary-100-900 p-4">
	<div class="wrap flex items-center gap-4">
		<a href="/">home</a>
		<a href="/about">about</a>
		<a href="/trystuff">trystuff</a>
		<a href="/slugstuff">slugstuff</a>
		<a href="/layouts1">layouts1</a>
		<a href="/layouts2">layouts2</a>
		<a href="/getstuff">getstuff</a>
		<a href="/404">404</a>
	</div>
	<div class="ml-auto">
		<span>Dark mode </span>
		<LightDarkToggle />
	</div>
</div>

<style>
	.wrap {
		flex-wrap: wrap;
	}
</style>
