<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import NavBar from '$components/NavBar.svelte';
	import Footer from '$components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

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
		min-height: 400px;
	}
	nav {
		position: fixed;
		top: 0;
		width: 80%;
	}
	main {
		margin-top: 80px;
		margin-bottom: 80px;
	}
	footer {
		position: fixed;
		bottom: 0;
		width: 80%;
	}
</style>
