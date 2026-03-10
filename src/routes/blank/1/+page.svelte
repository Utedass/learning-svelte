Outside everything Here comes the flex div:
<div id="flex-container" class="common-container-mods bg-shade-1">
	Text inside
	<div class="common-content-mods">Dive inside</div>
	<div class="common-content-mods">Dive inside</div>
	<span class="common-content-mods"> Span inside </span>
	<span class="common-content-mods"> Span inside </span>
</div>

Here is the not-flex-div
<div id="non-flex-container" class="common-container-mods bg-shade-1">
	Text inside
	<div class="common-content-mods">Dive inside</div>
	<div class="common-content-mods">Dive inside</div>
	<span class="common-content-mods"> Span inside </span>
	<span class="common-content-mods"> Span inside </span>
</div>

<div id="filter-area">
	<table><tbody><tr><td>Tja!</td><td>Yo!</td></tr></tbody></table>
</div>

<style>
	:root {
		--color-shade-1: #e3ff19;
		--color-shade-2: #9eb211;
		--color-shade-3: aquamarine;
		--color-shade-4: rgb(179, 154, 127);
		--color-shade-5: #abcdef;
	}

	* {
		border: 0.7px solid black;
	}

	#flex-container {
		display: flex;
	}

	#non-flex-container {
	}

	.common-container-mods {
		awidth: 800px;
		background-color: var(--color-shade-1);
	}

	.common-container-mods :nth-child(1) {
		flex-basis: 200px;
		background-color: var(--color-shade-3);
	}

	.common-container-mods :nth-child(2) {
		width: 800px;
		background-color: var(--color-shade-5);
	}

	.common-container-mods :nth-child(3) {
		width: 20px;
		background-color: var(--color-shade-4);
	}

	.common-content-mods {
		background-color: var(--color-shade-2);
	}
</style>
