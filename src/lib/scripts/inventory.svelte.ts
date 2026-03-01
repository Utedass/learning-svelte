import { globalSettings } from '$scripts/types/settings.svelte';

export const reply = $state({ content: 'empty' });

export const tass = $state([{ tass: 2 }, { tass: 4 }]);

export async function getSomething() {
	console.log('Whhaaaaa');
	const myHeaders = new Headers();

	myHeaders.append('GROCY-API-KEY', globalSettings.APIkey);

	const requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow' as RequestRedirect
	};

	let response: Response;
	try {
		response = await fetch(globalSettings.BaseUrl + '/objects/products', requestOptions);
		reply.content = JSON.stringify(await response.json(), null, 2);
	} catch (err) {
		console.log('Something sucked.');
	}
}

export const products: Product[] = $state([]);
export const productsById = $state<Record<number, Product>>({});

$effect.root(() => {
	$effect(() => {
		console.log('Nu kör vi för att productsById ändrats!');
		Object.assign(products, Object.values(productsById));
	});
	$effect(() => {
		console.log('Nu kör vi för att products ändrats!');
		const productRecord: Record<number, Product> = {};

		for (const p of products) {
			productRecord[p.id] = p;
		}
		Object.assign(productsById, productRecord);
	});
});

export type ProductsResponse = Product[];

export type Product = {
	id: number;
	name: string;
	description: string | null;
	product_group_id: number;
	active: number;
	location_id: number;
	shopping_location_id: number | null;
	qu_id_purchase: number;
	qu_id_stock: number;
	min_stock_amount: number;
	default_best_before_days: number;
	default_best_before_days_after_open: number;
	default_best_before_days_after_freezing: number;
	default_best_before_days_after_thawing: number;
	picture_file_name: string;
	enable_tare_weight_handling: number;
	tare_weight: number;
	not_check_stock_fulfillment_for_recipes: number;
	parent_product_id: number | null;
	calories: number;
	cumulate_min_stock_amount_of_sub_products: number;
	due_type: number;
	quick_consume_amount: number;
	hide_on_stock_overview: number;
	default_stock_label_type: number;
	should_not_be_frozen: number;
	treat_opened_as_out_of_stock: number;
	no_own_stock: number;
	default_consume_location_id: number;
	move_on_open: number;
	row_created_timestamp: string;
	qu_id_consume: number;
	auto_reprint_stock_label: number;
	quick_open_amount: number;
	qu_id_price: number;
	disable_open: number;
	default_purchase_price_type: number;
};

export async function fetchProducts() {
	console.log('Trying to populate some products');

	const myHeaders = new Headers();
	myHeaders.append('GROCY-API-KEY', globalSettings.APIkey);

	const params = new URLSearchParams();
	//params.append('limit', '3');

	const requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow' as RequestRedirect
	};

	try {
		const res = await fetch(globalSettings.BaseUrl + `/objects/products?${params}`, requestOptions);
		const list: Product[] = await res.json();
		Object.assign(products, list);

		console.log(`Retrieved ${Object.keys(products).length} products`);
	} catch (err) {
		console.log('Something sucked.');
	}
}
