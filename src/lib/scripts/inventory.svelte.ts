import { globalSettings } from '$scripts/types/settings.svelte';

export const products: Product[] = $state([]);
export const productsById = $state<Record<number, Product>>({});

export const locations = $state<Location[]>([]);
export const locationsById = $state<Record<number, Location>>({});

export const productGroups = $state<ProductGroup[]>([]);
export const productGroupsById = $state<Record<number, ProductGroup>>({});

export const productBarcodes = $state<ProductBarcode[]>([]);
export const productBarcodesById = $state<Record<number, ProductBarcode>>({});

export const stockEntries = $state<StockEntryWithUserfields[]>([]);
export const stockEntriesById = $state<Record<number, StockEntryWithUserfields>>({});

export async function fetchAll() {
	await Promise.all([
		fetchProducts(),
		fetchLocations(),
		fetchProductGroups(),
		fetchProductBarcodes(),
		fetchStock()
	]);
}

async function fetchObjects<T extends { id: number }>(
	endpoint: string,
	arrayState: T[],
	recordState: Record<number, T>
) {
	const myHeaders = new Headers();
	myHeaders.append('GROCY-API-KEY', globalSettings.APIkey);

	const requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow' as RequestRedirect
	};

	const res = await fetch(`${globalSettings.BaseUrl}/objects/${endpoint}`, requestOptions);
	const list: T[] = await res.json();

	// reset array
	arrayState.length = 0;
	arrayState.push(...list);

	// reset record
	for (const k in recordState) delete recordState[k];
	for (const item of list) recordState[item.id] = item;
}

export async function fetchLocations() {
	await fetchObjects<Location>('locations', locations, locationsById);
}

export async function fetchProductGroups() {
	await fetchObjects<ProductGroup>('product_groups', productGroups, productGroupsById);
}

export async function fetchProductBarcodes() {
	await fetchObjects<ProductBarcode>('product_barcodes', productBarcodes, productBarcodesById);
}

export async function fetchStock() {
	await fetchObjects<StockEntryWithUserfields>('stock', stockEntries, stockEntriesById);
}

export async function fetchProducts() {
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

		// Add the Products to the products list
		Object.assign(products, list);

		// Add the Products to the productsById Record as well
		const productRecord: Record<number, Product> = {};
		for (const p of products) {
			productRecord[p.id] = p;
		}
		Object.assign(productsById, productRecord);

		console.log(`Retrieved ${Object.keys(products).length} products`);
	} catch (err) {
		console.log('Something sucked.');
	}
}

export type Product = {
	id: number;
	name: string;
	description: string | null;
	product_group_id: number;
	active: 0 | 1;
	location_id: number;
	shopping_location_id: number | null;
	qu_id_purchase: number;
	qu_id_stock: number;
	min_stock_amount: number;
	default_best_before_days: number;
	default_best_before_days_after_open: number;
	default_best_before_days_after_freezing: number;
	default_best_before_days_after_thawing: number;
	picture_file_name: string | null;
	enable_tare_weight_handling: 0 | 1;
	tare_weight: number;
	not_check_stock_fulfillment_for_recipes: 0 | 1;
	parent_product_id: number | null;
	calories: number;
	cumulate_min_stock_amount_of_sub_products: 0 | 1;
	due_type: number;
	quick_consume_amount: number;
	hide_on_stock_overview: 0 | 1;
	default_stock_label_type: number;
	should_not_be_frozen: 0 | 1;
	treat_opened_as_out_of_stock: 0 | 1;
	no_own_stock: 0 | 1;
	default_consume_location_id: number | null;
	move_on_open: 0 | 1;
	row_created_timestamp: string;
	qu_id_consume: number;
	auto_reprint_stock_label: 0 | 1;
	quick_open_amount: number;
	qu_id_price: number;
	disable_open: 0 | 1;
	default_purchase_price_type: number;
};

export type Location = {
	id: number;
	name: string;
	description: string | null;
	row_created_timestamp: string;
	is_freezer: 0 | 1;
	active: 0 | 1;
};

export type ProductGroup = {
	id: number;
	name: string;
	description: string | null;
	row_created_timestamp: string;
	name_plural?: string | null;
	plural_forms?: string | null;
	active: 0 | 1;
};

export type ProductBarcode = {
	id: number;
	product_id: number;
	barcode: string;
	qu_id: number;
	amount: number | null;
	shopping_location_id: number | null;
	last_price: number | null;
	row_created_timestamp: string;
	note: string | null;
};

export type StockEntry = {
	id: number;
	product_id: number;
	amount: number;
	best_before_date: string;
	purchased_date: string;
	stock_id: string;
	price: number | null;
	open: 0 | 1;
	opened_date: string;
	row_created_timestamp: string;
	location_id: number;
	shopping_location_id: number | null;
	note: string | null;
};

export type StockEntryWithUserfields = StockEntry & {
	userfields: Record<string, unknown> | null;
};

export type StockCurrentLocationSimple = {
	id: number;
	product_id: number;
	amount: number;
	location_id: number;
	location_name: string;
	location_is_freezer: 0 | 1;
};

export type StockCurrentLocationAggregated = {
	amount: number;
	amount_aggregated: number;
	value: number;
	best_before_date: string;
	amount_opened: number;
	amount_opened_aggregated: number;
	is_aggregated_amount: 0 | 1;
	due_type: number;
	product_id: number;
	product: Product;
};

export type QuantityUnit = {
	id: number;
	name: string;
	description: string | null;
	row_created_timestamp: string;
	name_plural: string | null;
	plural_forms: string | null;
	active: 0 | 1;
};

export type StockProductDetails = {
	product: Product;
	product_barcodes: ProductBarcode[];
	last_purchased: string | null;
	last_used: string | null;
	stock_amount: number;
	stock_value: number;
	stock_amount_opened: number;
	stock_amount_aggregated: number;
	stock_amount_opened_aggregated: number;
	quantity_unit_stock: QuantityUnit;
	default_quantity_unit_purchase: QuantityUnit;
	default_quantity_unit_consume: QuantityUnit;
	quantity_unit_price: QuantityUnit;
	last_price: number | null;
	avg_price: number | null;
	oldest_price: number | null;
	current_price: number | null;
	last_shopping_location_id: number | null;
	default_shopping_location_id: number | null;
	next_due_date: string | null;
	location: Location;
	average_shelf_life_days: number;
	spoil_rate_percent: number;
	is_aggregated_amount: 0 | 1;
	has_childs: boolean;
	default_consume_location: Location | null;
	qu_conversion_factor_purchase_to_stock: number;
	qu_conversion_factor_price_to_stock: number;
};

export type StockProductLocation = {
	id: number;
	product_id: number;
	amount: number;
	location_id: number;
	location_name: string;
	location_is_freezer: 0 | 1;
};

export type StockProductEntry = StockEntry & {
	priority?: number;
};
