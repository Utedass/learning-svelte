<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import NavBar from '$components/nav-bar.svelte';
	import Footer from '$components/footer.svelte';
	import SettingsKeeper from '$components/states/global-settings-state.svelte';
	import DarkModeSettings from '$components/states/dark-mode-state.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<SettingsKeeper />
<DarkModeSettings />

<div class="thewholepage">
	<nav>
		<NavBar />
	</nav>

	<main>
		{@render children()}
	</main>

	<footer>
		<Footer />
	</footer>
</div>

<style>
	.thewholepage {
		width: 80%;
		margin: 0 auto;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	nav {
		position: sticky;
		top: 0;
	}
	main {
		flex: 1;
	}
	footer {
		position: sticky;
		bottom: 0;
	}
</style>
