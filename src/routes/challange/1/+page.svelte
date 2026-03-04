<div id="content">
	<header class="bg-parchment rounded-corner bordered">LANISTA</header>
	<div id="high-scores" class="bg-parchment rounded-corner bordered">Highscores</div>
	<div id="main-container">
		<div class="bg-parchment side-pane rounded-corner bordered">
			Left nav pane<br /><br /><br /><br />
		</div>
		<div id="main-content" class=" rounded-corner bordered">Main pane</div>
		<div class="bg-parchment side-pane rounded-corner bordered">Right nav pane</div>
	</div>
</div>

<style>
	asd* {
		border: 0.7px solid black;
	}

	header {
		padding: 0.7em;
	}

	#high-scores {
		padding: 0.7em;
	}

	#content {
		max-width: 1280px;
		margin: 0px auto;

		display: flex;
		flex-direction: column;
		gap: 1ex;
	}

	#main-container {
		display: flex;
		justify-content: space-between;
		gap: 1ex;
	}

	#main-content {
		background-color: white;
		width: 66.66%;
		min-height: 1500px;
		padding: 0.7em;
	}

	.side-pane {
		padding: 0.7em;
		width: 16.66%;
	}

	.rounded-corner {
		border-radius: 4px;
	}

	.bordered {
		border: 0.7px solid black;
	}
</style>
