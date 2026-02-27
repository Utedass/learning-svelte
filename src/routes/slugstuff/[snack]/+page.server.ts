import { error } from '@sveltejs/kit';

export function load({ params }) {
	if (params.snack === 'chips') {
		error(500, "I don't like chips");
	}
	return {
		page: params.snack
	};
}
