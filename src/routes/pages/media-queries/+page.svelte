<h1>Browser / Device Capabilities</h1>

<table>
	<thead>
		<tr><th>Feature</th><th>Result</th></tr>
	</thead>
	<tbody>
		<tr><td>Hover (primary)</td><td class="result hover-hover"></td></tr>
		<tr><td>Any hover</td><td class="result any-hover-hover"></td></tr>

		<tr><td>Pointer fine</td><td class="result pointer-fine"></td></tr>
		<tr><td>Pointer coarse</td><td class="result pointer-coarse"></td></tr>
		<tr><td>Pointer none</td><td class="result pointer-none"></td></tr>

		<tr><td>Any pointer fine</td><td class="result any-pointer-fine"></td></tr>
		<tr><td>Any pointer coarse</td><td class="result any-pointer-coarse"></td></tr>
		<tr><td>Any pointer none</td><td class="result any-pointer-none"></td></tr>

		<tr><td>Dark color scheme</td><td class="result color-scheme-dark"></td></tr>
		<tr><td>Light color scheme</td><td class="result color-scheme-light"></td></tr>

		<tr><td>Reduced motion</td><td class="result reduced-motion"></td></tr>
		<tr><td>Reduced transparency</td><td class="result reduced-transparency"></td></tr>

		<tr><td>High contrast</td><td class="result contrast-more"></td></tr>
		<tr><td>Low contrast</td><td class="result contrast-less"></td></tr>

		<tr><td>Forced colors mode</td><td class="result forced-colors"></td></tr>

		<tr><td>Inverted colors</td><td class="result inverted-colors"></td></tr>

		<tr><td>HDR dynamic range</td><td class="result dynamic-range"></td></tr>

		<tr><td>Wide color gamut (P3)</td><td class="result gamut-p3"></td></tr>
		<tr><td>Wide color gamut (Rec2020)</td><td class="result gamut-rec2020"></td></tr>

		<tr><td>Monochrome display</td><td class="result monochrome"></td></tr>

		<tr><td>Grid display device</td><td class="result grid"></td></tr>
		<tr><td>Print device</td><td class="result print"></td></tr>
	</tbody>
</table>

<style>
	table {
		border-collapse: collapse;
	}

	td,
	th {
		border: 1px solid #ccc;
		padding: 6px 10px;
	}

	.result {
		color: white;
		font-weight: bold;
	}

	.result::before {
		content: 'not supported';
		background: #c33;
		padding: 2px 6px;
		display: inline-block;
	}

	/* hover */

	@media (hover: hover) {
		.hover-hover::before {
			content: 'supported';
			background: #2a9d3f;
		}
	}

	@media (any-hover: hover) {
		.any-hover-hover::before {
			content: 'supported';
			background: #2a9d3f;
		}
	}

	/* pointer */

	@media (pointer: fine) {
		.pointer-fine::before {
			content: 'supported';
			background: #2a9d3f;
		}
	}

	@media (pointer: coarse) {
		.pointer-coarse::before {
			content: 'supported';
			background: #2a9d3f;
		}
	}

	@media (pointer: none) {
		.pointer-none::before {
			content: 'supported';
			background: #2a9d3f;
		}
	}

	@media (any-pointer: fine) {
		.any-pointer-fine::before {
			content: 'supported';
			background: #2a9d3f;
		}
	}

	@media (any-pointer: coarse) {
		.any-pointer-coarse::before {
			content: 'supported';
			background: #2a9d3f;
		}
	}

	@media (any-pointer: none) {
		.any-pointer-none::before {
			content: 'supported';
			background: #2a9d3f;
		}
	}

	/* preferences */

	@media (prefers-color-scheme: dark) {
		.color-scheme-dark::before {
			content: 'supported';
			background: #2a9d3f;
		}
	}

	@media (prefers-color-scheme: light) {
		.color-scheme-light::before {
			content: 'supported';
			background: #2a9d3f;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.reduced-motion::before {
			content: 'supported';
			background: #2a9d3f;
		}
	}

	@media (prefers-reduced-transparency: reduce) {
		.reduced-transparency::before {
			content: 'supported';
			background: #2a9d3f;
		}
	}

	@media (prefers-contrast: more) {
		.contrast-more::before {
			content: 'supported';
			background: #2a9d3f;
		}
	}

	@media (prefers-contrast: less) {
		.contrast-less::before {
			content: 'supported';
			background: #2a9d3f;
		}
	}

	/* display environment */

	@media (forced-colors: active) {
		.forced-colors::before {
			content: 'supported';
			background: #2a9d3f;
		}
	}

	@media (inverted-colors: inverted) {
		.inverted-colors::before {
			content: 'supported';
			background: #2a9d3f;
		}
	}

	@media (dynamic-range: high) {
		.dynamic-range::before {
			content: 'supported';
			background: #2a9d3f;
		}
	}

	@media (color-gamut: p3) {
		.gamut-p3::before {
			content: 'supported';
			background: #2a9d3f;
		}
	}

	@media (color-gamut: rec2020) {
		.gamut-rec2020::before {
			content: 'supported';
			background: #2a9d3f;
		}
	}

	@media (monochrome) {
		.monochrome::before {
			content: 'supported';
			background: #2a9d3f;
		}
	}

	@media (grid) {
		.grid::before {
			content: 'supported';
			background: #2a9d3f;
		}
	}

	@media print {
		.print::before {
			content: 'supported';
			background: #2a9d3f;
		}
	}
</style>
