
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
		RouteId(): "/" | "/travel" | "/travel/[slug]" | "/travel/[slug]/[photoSlug]";
		RouteParams(): {
			"/travel/[slug]": { slug: string };
			"/travel/[slug]/[photoSlug]": { slug: string; photoSlug: string }
		};
		LayoutParams(): {
			"/": { slug?: string | undefined; photoSlug?: string | undefined };
			"/travel": { slug?: string | undefined; photoSlug?: string | undefined };
			"/travel/[slug]": { slug: string; photoSlug?: string | undefined };
			"/travel/[slug]/[photoSlug]": { slug: string; photoSlug: string }
		};
		Pathname(): "/" | "/travel" | `/travel/${string}` & {} | `/travel/${string}/` & {} | `/travel/${string}/${string}` & {} | `/travel/${string}/${string}/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/fonts/inter/Inter_18pt-Italic.ttf" | "/fonts/inter/Inter_18pt-Medium.ttf" | "/fonts/inter/Inter_18pt-MediumItalic.ttf" | "/fonts/inter/Inter_18pt-Regular.ttf" | "/fonts/inter/Inter_18pt-SemiBold.ttf" | "/fonts/inter/Inter_18pt-SemiBoldItalic.ttf" | "/fonts/lora/Lora-Bold.ttf" | "/fonts/lora/Lora-BoldItalic.ttf" | "/fonts/lora/Lora-Italic.ttf" | "/fonts/lora/Lora-Medium.ttf" | "/fonts/lora/Lora-MediumItalic.ttf" | "/fonts/lora/Lora-Regular.ttf" | "/fonts/lora/Lora-SemiBold.ttf" | "/fonts/lora/Lora-SemiBoldItalic.ttf" | "/images/trips/norway-2026/Bergen_Gateway_to_the_Fjords_of_Norway_pillars.webp" | "/images/trips/norway-2026/OIP.webp" | "/images/trips/norway-2026/OIP2.webp" | "/images/trips/norway-2026/OIP3.webp" | "/images/trips/norway-2026/thumbnails/Bergen_Gateway_to_the_Fjords_of_Norway_pillars.webp" | "/images/trips/norway-2026/thumbnails/OIP.webp" | "/images/trips/norway-2026/thumbnails/OIP2.webp" | "/images/trips/norway-2026/thumbnails/OIP3.webp" | "/robots.txt" | string & {};
	}
}