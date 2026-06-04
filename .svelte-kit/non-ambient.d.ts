
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/travel";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/travel": Record<string, never>
		};
		Pathname(): "/" | "/travel";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/fonts/inter/Inter_18pt-Italic.ttf" | "/fonts/inter/Inter_18pt-Medium.ttf" | "/fonts/inter/Inter_18pt-MediumItalic.ttf" | "/fonts/inter/Inter_18pt-Regular.ttf" | "/fonts/inter/Inter_18pt-SemiBold.ttf" | "/fonts/inter/Inter_18pt-SemiBoldItalic.ttf" | "/fonts/lora/Lora-Bold.ttf" | "/fonts/lora/Lora-BoldItalic.ttf" | "/fonts/lora/Lora-Italic.ttf" | "/fonts/lora/Lora-Medium.ttf" | "/fonts/lora/Lora-MediumItalic.ttf" | "/fonts/lora/Lora-Regular.ttf" | "/fonts/lora/Lora-SemiBold.ttf" | "/fonts/lora/Lora-SemiBoldItalic.ttf" | "/robots.txt" | string & {};
	}
}