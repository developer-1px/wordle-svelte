import adapter from "@sveltejs/adapter-static"
import preprocess from 'svelte-preprocess';
import {adorableCSS} from "adorable-css/vite-plugin-adorable-css"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			plugins: [
				adorableCSS()
			]
		}
	}
};

if (process.env.NODE_ENV === "production") {
  config.kit.paths = {base: "/wordle-svelte"}
}

export default config;
