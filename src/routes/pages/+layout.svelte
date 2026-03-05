<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import NavBar from '$components/nav-bar.svelte';
	import Footer from '$components/Footer.svelte';
	import SettingsKeeper from '$components/states/global-settings-state.svelte';
	import DarkModeSettings from '$components/states/dark-mode-state.svelte';
	import ThemeKeeper from '$components/states/theme-switcher.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<SettingsKeeper />
<DarkModeSettings />
<ThemeKeeper />

<div class="flex flex-col max-w-3xl min-h-screen mx-auto">
	<nav class="sticky top-0">
		<NavBar />
	</nav>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="sticky bottom-0">
		<Footer />
	</footer>
</div>
