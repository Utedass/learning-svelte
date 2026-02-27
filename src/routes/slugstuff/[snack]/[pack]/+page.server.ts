import { error } from '@sveltejs/kit';

export function load({ params }) {
	if (params.pack === 'toss') {
		error(500, 'Dont try to toss the pack');
	}
	return {
		page: params.snack + ' / ' + params.pack
	};
}
