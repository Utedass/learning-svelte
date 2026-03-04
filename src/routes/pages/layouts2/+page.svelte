<aside>Wheree?</aside>

<div id="master">
	<div class="inside">Alfabete</div>
	<div class="inside">Bajskorv</div>
	<div class="inside">Citron</div>
	<div class="inside">Datanörd</div>
</div>

<hr />

<div>
	<div class="mahfloat">Some shit that might be contained in a little box?</div>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum
		mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis
		dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue
	</p>
	<p class="cleared">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum
		mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis
		dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue
		enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non
		tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut
		turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna
		consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl
		imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra.
	</p>
</div>

<hr />

<header>
	<h1 class="h1">Sample flexbox example</h1>
</header>
<section>
	<article>
		<h2 class="h2">First article</h2>
		<p>Content…</p>
	</article>
	<article>
		<h2 class="h2">Second article</h2>
		<p>Content…</p>
	</article>
	<article>
		<h2 class="h2">Third article</h2>
		<p>Content…</p>
	</article>
	<article>
		<h2 class="h2">Fourth article</h2>
		<p>Content…</p>
	</article>
	<article>
		<h2 class="h2">Fifth article</h2>
		<p>Content…</p>
	</article>
</section>

<p class="positioned">....</p>

<style>
	section {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row-reverse;
	}
	article {
		padding: 10px;
		margin: 10px;
		background: aqua;
		color: black;
		min-width: 200px;
		flex: 1;
	}
	article:nth-child(2) {
		flex: 2 50%;
	}
	header {
		background: purple;
		height: 100px;
	}
	h1 {
		text-align: center;
		color: white;
		line-height: 100px;
		margin: 0;
	}
	.positioned {
		background: yellow;
		position: fixed;
		bottom: 0;
		left: 50%;
	}
	.insides {
		font-size: 2em;
		padding: 20px;
		margin: 5px auto;
		max-width: 900px;
	}
	hr {
		margin: 50px auto;
		width: 80%;
	}
	.mahfloat {
		float: right;
		width: 200px;
		padding: 20px;
	}
	.cleared {
		clear: both;
	}
</style>
