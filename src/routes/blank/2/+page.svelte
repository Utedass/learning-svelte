<script type="ts">
	import { onMount } from 'svelte';
	let lastScroll = 0;
	let hideTopBar = $state(false);

	onMount(() => {
		window.addEventListener('scroll', () => {
			const currentScroll = window.pageYOffset;
			if (currentScroll > lastScroll) {
				// scrolling down
				hideTopBar = true;
			} else {
				// scrolling up
				hideTopBar = false;
			}
			lastScroll = currentScroll <= 0 ? 0 : currentScroll; // for mobile bounce
		});
	});
</script>

<div id="toolbar" class={[{ hideTopBar }]}>Look at my toolbar, its amazing.</div>
<div id="content">content. Top bar is {hideTopBar ? 'hiding' : 'visible'}</div>

<style>
	* {
		border: 0.7px solid black;
	}

	.hideTopBar {
		background-color: cyan;
		transform: translateY(-120%);
	}

	#content {
		height: 200vh;
	}

	#toolbar {
		position: sticky;
		top: 0;
		height: 10ex;
		transition: transform 0.4s ease;
	}

	@keyframes hide {
		from {
			translate: 0 0;
		}
		to {
			translate: 0 -120%;
		}
	}
</style>
