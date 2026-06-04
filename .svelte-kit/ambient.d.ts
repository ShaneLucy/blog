
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/private';
 * 
 * console.log(ENVIRONMENT); // => "production"
 * console.log(PUBLIC_BASE_URL); // => throws error during build
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/private' {
	export const EFC_8676_1592913036: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const EFC_8676_1262719628: string;
	export const EFC_8676_2283032206: string;
	export const npm_package_json: string;
	export const LANG: string;
	export const HOMEPATH: string;
	export const OLDPWD: string;
	export const npm_package_name: string;
	export const OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: string;
	export const PROCESSOR_REVISION: string;
	export const PLINK_PROTOCOL: string;
	export const HOME: string;
	export const PROGRAMFILES: string;
	export const PROCESSOR_LEVEL: string;
	export const NODE: string;
	export const LOCALAPPDATA: string;
	export const CHROME_CRASHPAD_PIPE_NAME: string;
	export const COMSPEC: string;
	export const VSCODE_NONCE: string;
	export const npm_package_version: string;
	export const NODE_ENV: string;
	export const npm_config_user_agent: string;
	export const ProgramData: string;
	export const SYSTEMROOT: string;
	export const COLORTERM: string;
	export const npm_node_execpath: string;
	export const USERPROFILE: string;
	export const PWD: string;
	export const USERDOMAIN_ROAMINGPROFILE: string;
	export const VS140COMNTOOLS: string;
	export const VSCODE_A11Y_MODE: string;
	export const USERDOMAIN: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const USERNAME: string;
	export const _: string;
	export const npm_execpath: string;
	export const TEMP: string;
	export const ProgramW6432: string;
	export const SHELL: string;
	export const TERM: string;
	export const PROCESSOR_ARCHITECTURE: string;
	export const npm_lifecycle_event: string;
	export const PATHEXT: string;
	export const TERM_PROGRAM_VERSION: string;
	export const OneDrive: string;
	export const npm_lifecycle_script: string;
	export const FPS_BROWSER_APP_PROFILE_STRING: string;
	export const EFC_8676_2775293581: string;
	export const DriverData: string;
	export const NUMBER_OF_PROCESSORS: string;
	export const CommonProgramW6432: string;
	export const PATH: string;
	export const PROCESSOR_IDENTIFIER: string;
	export const WINDIR: string;
	export const VSCODE_INJECTION: string;
	export const FPS_BROWSER_USER_PROFILE_STRING: string;
	export const NoDefaultCurrentDirectoryInExePath: string;
	export const npm_command: string;
	export const AMDRMSDKPATH: string;
	export const EFC_8676_3789132940: string;
	export const VSCODE_STABLE: string;
	export const SYSTEMDRIVE: string;
	export const TERM_PROGRAM: string;
	export const npm_config_local_prefix: string;
	export const COMMONPROGRAMFILES: string;
	export const CLAUDECODE: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const COREPACK_ENABLE_AUTO_PIN: string;
	export const HOMEDRIVE: string;
	export const SVELTEKIT_FORK: string;
	export const EXEPATH: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const CLAUDE_CODE_ENTRYPOINT: string;
	export const LOGONSERVER: string;
	export const TMP: string;
	export const SESSIONNAME: string;
	export const APPDATA: string;
	export const ALLUSERSPROFILE: string;
	export const OS: string;
	export const SHLVL: string;
	export const PUBLIC: string;
	export const PSModulePath: string;
	export const GIT_EDITOR: string;
	export const COMPUTERNAME: string;
	export const MSYSTEM: string;
	export const GIT_ASKPASS: string;
}

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/public';
 * 
 * console.log(ENVIRONMENT); // => throws error during build
 * console.log(PUBLIC_BASE_URL); // => "http://site.com"
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * 
 * console.log(env.ENVIRONMENT); // => "production"
 * console.log(env.PUBLIC_BASE_URL); // => undefined
 * ```
 */
declare module '$env/dynamic/private' {
	export const env: {
		EFC_8676_1592913036: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		EFC_8676_1262719628: string;
		EFC_8676_2283032206: string;
		npm_package_json: string;
		LANG: string;
		HOMEPATH: string;
		OLDPWD: string;
		npm_package_name: string;
		OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: string;
		PROCESSOR_REVISION: string;
		PLINK_PROTOCOL: string;
		HOME: string;
		PROGRAMFILES: string;
		PROCESSOR_LEVEL: string;
		NODE: string;
		LOCALAPPDATA: string;
		CHROME_CRASHPAD_PIPE_NAME: string;
		COMSPEC: string;
		VSCODE_NONCE: string;
		npm_package_version: string;
		NODE_ENV: string;
		npm_config_user_agent: string;
		ProgramData: string;
		SYSTEMROOT: string;
		COLORTERM: string;
		npm_node_execpath: string;
		USERPROFILE: string;
		PWD: string;
		USERDOMAIN_ROAMINGPROFILE: string;
		VS140COMNTOOLS: string;
		VSCODE_A11Y_MODE: string;
		USERDOMAIN: string;
		VSCODE_GIT_IPC_HANDLE: string;
		USERNAME: string;
		_: string;
		npm_execpath: string;
		TEMP: string;
		ProgramW6432: string;
		SHELL: string;
		TERM: string;
		PROCESSOR_ARCHITECTURE: string;
		npm_lifecycle_event: string;
		PATHEXT: string;
		TERM_PROGRAM_VERSION: string;
		OneDrive: string;
		npm_lifecycle_script: string;
		FPS_BROWSER_APP_PROFILE_STRING: string;
		EFC_8676_2775293581: string;
		DriverData: string;
		NUMBER_OF_PROCESSORS: string;
		CommonProgramW6432: string;
		PATH: string;
		PROCESSOR_IDENTIFIER: string;
		WINDIR: string;
		VSCODE_INJECTION: string;
		FPS_BROWSER_USER_PROFILE_STRING: string;
		NoDefaultCurrentDirectoryInExePath: string;
		npm_command: string;
		AMDRMSDKPATH: string;
		EFC_8676_3789132940: string;
		VSCODE_STABLE: string;
		SYSTEMDRIVE: string;
		TERM_PROGRAM: string;
		npm_config_local_prefix: string;
		COMMONPROGRAMFILES: string;
		CLAUDECODE: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		COREPACK_ENABLE_AUTO_PIN: string;
		HOMEDRIVE: string;
		SVELTEKIT_FORK: string;
		EXEPATH: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		CLAUDE_CODE_ENTRYPOINT: string;
		LOGONSERVER: string;
		TMP: string;
		SESSIONNAME: string;
		APPDATA: string;
		ALLUSERSPROFILE: string;
		OS: string;
		SHLVL: string;
		PUBLIC: string;
		PSModulePath: string;
		GIT_EDITOR: string;
		COMPUTERNAME: string;
		MSYSTEM: string;
		GIT_ASKPASS: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://example.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.ENVIRONMENT); // => undefined, not public
 * console.log(env.PUBLIC_BASE_URL); // => "http://example.com"
 * ```
 * 
 * ```
 * 
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
