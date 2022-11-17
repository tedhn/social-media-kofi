/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/social-media-kofi/",
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "src"),
		},
	},
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
	},
});
