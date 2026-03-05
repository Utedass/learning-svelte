// Settings type
export type Settings = {
	BaseUrl: string;
	Port: number;
	APIkey: string;
	DarkMode: SettingsDarkMode;
	Theme: Theme;
};

export const ALL_THEMES = [
  'cerberus',
  'sahara',
  'vox',
  'catppuccin',
  'concord',
  'fennec',
  'legacy',
  'modern',
  'mint',
  'nouveau',
  'reign',
  'seafoam'
] as const;
//export type Theme = 'cerberus' | 'sahara' | 'vox';
// Voodo explained at https://www.reddit.com/r/typescript/comments/nv0icn/is_it_possible_to_create_an_array_union_types_as/
export type Theme = (typeof ALL_THEMES)[number];


export type SettingsDarkMode = 'light' | 'dark' | 'system';

export function defaultSettings(overrides: Partial<Settings> = {}): Settings {
	return {
		BaseUrl: 'https://localhost/api',
		Port: 443,
		APIkey: '',
		DarkMode: 'system',
		Theme: 'vox',
		...overrides
	};
}

export const globalSettingsState = $state({ stored: false });

export const globalSettings: Settings = $state(defaultSettings());

// metadata used to drive the settings form
export const settingsSchema = [
	{ key: 'BaseUrl', label: 'Base URL', type: 'string', style: 'input' },
	{ key: 'Port', label: 'Server port', type: 'number', style: 'input' },
	{ key: 'APIkey', label: 'Grocy API key', type: 'string', style: 'input' },
	{
		key: 'DarkMode',
		label: 'Dark mode setting (dark, light, system)',
		type: 'string',
		style: 'input'
	},
	{
		key: 'Theme',
		label: 'Theme (' + ALL_THEMES.join(', ') + ')',
		type: 'string',
		style: 'input'
	}
] as const;

export type SettingsKey = (typeof settingsSchema)[number]['key'];
