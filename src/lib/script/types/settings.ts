// Settings type
export type Settings = {
	BaseUrl: string;
	Port: number;
	APIkey: string;
};

export function defaultSettings(overrides: Partial<Settings> = {}): Settings {
	return {
		BaseUrl: 'https://localhost/api',
		Port: 443,
		APIkey: '',
		...overrides
	};
}

// metadata used to drive the settings form
export const settingsSchema = [
	{ key: 'BaseUrl', label: 'Base URL', type: 'string', style: 'input' },
	{ key: 'Port', label: 'Server port', type: 'number', style: 'input' },
	{ key: 'APIkey', label: 'Grocy API key', type: 'string', style: 'input' }
] as const;

export type SettingsKey = (typeof settingsSchema)[number]['key'];
