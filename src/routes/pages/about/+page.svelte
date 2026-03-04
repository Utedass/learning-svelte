<script lang="ts">
	import Örjan from '$components/knappajärnet.svelte';
</script>

<h1>Welcome to About</h1>

Damm är saker som gått sönder över tid.

<Örjan>Awesome interface props Britt-Marie!</Örjan>

{#snippet maskulinum()}
	<p>Maskulinum</p>
{/snippet}

{@render maskulinum()}

{#snippet greeting(name: string)}
	<p>Hello {name}!</p>
{/snippet}

{@render greeting('Sven')}

<p class="w-50 sm:w-100 md:w-150 lg:w-200 xl:w-250">
	This is expanding its box on purpose, based on browser width.<br /> Lorem ipsum dolor sit amet, consectetur
	adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</p>

What about this text?
<div class="flexparent">
	<div class="flexchild">Some text</div>
	<div class="flexchild">Some other text</div>
	<div class="flexchild">And some more text</div>
	<div class="flexchild">And some more text</div>
</div>

<style>
	.flexparent {
		display: flex;
		justify-content: space-evenly;
		flex-wrap: wrap;
		height: 250px;
		align-content: flex-end;
		gap: 2rem;
	}

	.flexchild {
		background-color: var(--color-primary-800);
		color: white;
		padding: 1rem;
		border-radius: 0.5rem;
		height: 50px;
		/*flex: 1;*/
	}
</style>
