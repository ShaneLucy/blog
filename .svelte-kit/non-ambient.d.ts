
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
		RouteId(): "/" | "/about" | "/travel" | "/travel/[slug]" | "/travel/[slug]/[photoSlug]";
		RouteParams(): {
			"/travel/[slug]": { slug: string };
			"/travel/[slug]/[photoSlug]": { slug: string; photoSlug: string }
		};
		LayoutParams(): {
			"/": { slug?: string | undefined; photoSlug?: string | undefined };
			"/about": Record<string, never>;
			"/travel": { slug?: string | undefined; photoSlug?: string | undefined };
			"/travel/[slug]": { slug: string; photoSlug?: string | undefined };
			"/travel/[slug]/[photoSlug]": { slug: string; photoSlug: string }
		};
		Pathname(): "/" | "/about" | "/travel" | `/travel/${string}` & {} | `/travel/${string}/` & {} | `/travel/${string}/${string}` & {} | `/travel/${string}/${string}/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.svg" | "/images/trips/norway-2026/Bergen-Church.webp" | "/images/trips/norway-2026/Bergen-Fountain.webp" | "/images/trips/norway-2026/Bergen-Harbour.webp" | "/images/trips/norway-2026/Bergen-Streets-2.webp" | "/images/trips/norway-2026/Bergen-Streets.webp" | "/images/trips/norway-2026/Bergen-Tree-Archway.webp" | "/images/trips/norway-2026/Butter-Chicken.webp" | "/images/trips/norway-2026/Church-View-From-Mountain.webp" | "/images/trips/norway-2026/Elven-Whiskey-Cocktail.webp" | "/images/trips/norway-2026/Even-More-Sunset-Bergen-Harbour-2.webp" | "/images/trips/norway-2026/Even-More-Sunset-Bergen-Harbour.webp" | "/images/trips/norway-2026/Fjord-Cruise-1.webp" | "/images/trips/norway-2026/Fjord-Cruise-10.webp" | "/images/trips/norway-2026/Fjord-Cruise-11.webp" | "/images/trips/norway-2026/Fjord-Cruise-12.webp" | "/images/trips/norway-2026/Fjord-Cruise-13.webp" | "/images/trips/norway-2026/Fjord-Cruise-14.webp" | "/images/trips/norway-2026/Fjord-Cruise-15.webp" | "/images/trips/norway-2026/Fjord-Cruise-16.webp" | "/images/trips/norway-2026/Fjord-Cruise-2.webp" | "/images/trips/norway-2026/Fjord-Cruise-3.webp" | "/images/trips/norway-2026/Fjord-Cruise-4.webp" | "/images/trips/norway-2026/Fjord-Cruise-5.webp" | "/images/trips/norway-2026/Fjord-Cruise-6.webp" | "/images/trips/norway-2026/Fjord-Cruise-7.webp" | "/images/trips/norway-2026/Fjord-Cruise-8.webp" | "/images/trips/norway-2026/Fjord-Cruise-9.webp" | "/images/trips/norway-2026/Flying-Alesund-Oslo.webp" | "/images/trips/norway-2026/Hotdog-And-Beer.webp" | "/images/trips/norway-2026/More-Sunset-Bergen-Harbour.webp" | "/images/trips/norway-2026/Oat-Latte-And-Espresso-Cafe-Mash.webp" | "/images/trips/norway-2026/Røyk BBY Brisket.webp" | "/images/trips/norway-2026/Spanish-Norwegian-Infusion-Tapas.webp" | "/images/trips/norway-2026/Sunset-Bergen-Harbour.webp" | "/images/trips/norway-2026/thumbnails/Bergen-Church.webp" | "/images/trips/norway-2026/thumbnails/Bergen-Fountain.webp" | "/images/trips/norway-2026/thumbnails/Bergen-Harbour.webp" | "/images/trips/norway-2026/thumbnails/Bergen-Streets-2.webp" | "/images/trips/norway-2026/thumbnails/Bergen-Streets.webp" | "/images/trips/norway-2026/thumbnails/Bergen-Tree-Archway.webp" | "/images/trips/norway-2026/thumbnails/Butter-Chicken.webp" | "/images/trips/norway-2026/thumbnails/Church-View-From-Mountain.webp" | "/images/trips/norway-2026/thumbnails/Elven-Whiskey-Cocktail.webp" | "/images/trips/norway-2026/thumbnails/Even-More-Sunset-Bergen-Harbour-2.webp" | "/images/trips/norway-2026/thumbnails/Even-More-Sunset-Bergen-Harbour.webp" | "/images/trips/norway-2026/thumbnails/Fjord-Cruise-1.webp" | "/images/trips/norway-2026/thumbnails/Fjord-Cruise-10.webp" | "/images/trips/norway-2026/thumbnails/Fjord-Cruise-11.webp" | "/images/trips/norway-2026/thumbnails/Fjord-Cruise-12.webp" | "/images/trips/norway-2026/thumbnails/Fjord-Cruise-13.webp" | "/images/trips/norway-2026/thumbnails/Fjord-Cruise-14.webp" | "/images/trips/norway-2026/thumbnails/Fjord-Cruise-15.webp" | "/images/trips/norway-2026/thumbnails/Fjord-Cruise-16.webp" | "/images/trips/norway-2026/thumbnails/Fjord-Cruise-2.webp" | "/images/trips/norway-2026/thumbnails/Fjord-Cruise-3.webp" | "/images/trips/norway-2026/thumbnails/Fjord-Cruise-4.webp" | "/images/trips/norway-2026/thumbnails/Fjord-Cruise-5.webp" | "/images/trips/norway-2026/thumbnails/Fjord-Cruise-6.webp" | "/images/trips/norway-2026/thumbnails/Fjord-Cruise-7.webp" | "/images/trips/norway-2026/thumbnails/Fjord-Cruise-8.webp" | "/images/trips/norway-2026/thumbnails/Fjord-Cruise-9.webp" | "/images/trips/norway-2026/thumbnails/Flying-Alesund-Oslo.webp" | "/images/trips/norway-2026/thumbnails/Hotdog-And-Beer.webp" | "/images/trips/norway-2026/thumbnails/More-Sunset-Bergen-Harbour.webp" | "/images/trips/norway-2026/thumbnails/Oat-Latte-And-Espresso-Cafe-Mash.webp" | "/images/trips/norway-2026/thumbnails/Røyk BBY Brisket.webp" | "/images/trips/norway-2026/thumbnails/Spanish-Norwegian-Infusion-Tapas.webp" | "/images/trips/norway-2026/thumbnails/Sunset-Bergen-Harbour.webp" | "/images/trips/norway-2026/thumbnails/Vinyl-Draught-Beers.webp" | "/images/trips/norway-2026/thumbnails/Ålesund -Microbrewery-3.webp" | "/images/trips/norway-2026/thumbnails/Ålesund -Microbrewery.webp" | "/images/trips/norway-2026/thumbnails/Ålesund-Microbrewery-2.webp" | "/images/trips/norway-2026/thumbnails/Ålesund-Microbrewery-4.webp" | "/images/trips/norway-2026/Vinyl-Draught-Beers.webp" | "/images/trips/norway-2026/Ålesund -Microbrewery-3.webp" | "/images/trips/norway-2026/Ålesund -Microbrewery.webp" | "/images/trips/norway-2026/Ålesund-Microbrewery-2.webp" | "/images/trips/norway-2026/Ålesund-Microbrewery-4.webp" | "/robots.txt" | string & {};
	}
}