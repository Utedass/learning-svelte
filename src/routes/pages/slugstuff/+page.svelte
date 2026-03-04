<script lang="ts">
	let { data } = $props();
</script>

<h1 class="h1">Hey!</h1>

<h3 class="h3">These data are passed from the server:</h3>
<ul>
	<li>Snack: {data.snack}</li>
	<li>Pack: {data.pack}</li>
</ul>

<h4 class="h4">Go to one of the slugged pages:</h4>
<ul>
	<li><a href="/slugstuff/chips">/slugstuff/chips</a></li>
	<li><a href="/slugstuff/pretzels">/slugstuff/pretzels</a></li>
</ul>
