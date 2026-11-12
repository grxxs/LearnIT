import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// Build produces a single self-contained dist/index.html (questions included),
// so it can be shared and opened with a double-click — no server needed.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: "/LearnIT",
});
