// Run after `pnpm build`: node inline-build.js
// Inlines all JS and CSS from build/ into a single index.html

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

const buildDir = resolve('./build');

function collectFiles(dir, base = dir) {
	const result = {};
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) {
			Object.assign(result, collectFiles(full, base));
		} else {
			const rel = '/' + full.slice(base.length + 1).replaceAll('\\', '/');
			result[rel] = full;
		}
	}
	return result;
}

const files = collectFiles(buildDir);
let html = readFileSync(join(buildDir, 'index.html'), 'utf-8');

// Inline <link rel="stylesheet" href="...">
html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (match, href) => {
	const p = files[href];
	if (!p) return match;
	return `<style>${readFileSync(p, 'utf-8')}</style>`;
});

// Inline <script src="..." type="module"> — non-dynamic only
html = html.replace(/<script([^>]*?)src="([^"]+)"([^>]*?)><\/script>/g, (match, a, src, b) => {
	const p = files[src];
	if (!p) return match;
	const attrs = (a + b).replace(/\s*type="module"/, '').trim();
	return `<script type="module"${attrs ? ' ' + attrs : ''}>${readFileSync(p, 'utf-8')}</script>`;
});

// SvelteKit bootstrap: replace Promise.all([import(a), import(b)]).then(...)
// with inlined script that executes the modules
html = html.replace(
	/Promise\.all\(\[([\s\S]*?)\]\)\.then\(([\s\S]*?)\);/g,
	(match, imports, handler) => {
		const paths = [...imports.matchAll(/import\("([^"]+)"\)/g)].map(m => m[1]);

		// Gather all transitive JS files referenced via import()
		const visited = new Set();
		const ordered = [];

		function visit(href) {
			if (visited.has(href)) return;
			visited.add(href);
			const p = files[href];
			if (!p) return;
			const code = readFileSync(p, 'utf-8');
			// Visit static imports first
			for (const [, dep] of code.matchAll(/\bimport\b[^(][^"']*["']([^"']+)["']/g)) {
				if (dep.startsWith('/_app/')) visit(dep);
			}
			// Visit dynamic imports
			for (const [, dep] of code.matchAll(/import\(["']([^"']+)["']\)/g)) {
				if (dep.startsWith('/_app/')) visit(dep);
			}
			ordered.push({ href, code });
		}

		for (const p of paths) visit(p);

		// Wrap each module as IIFE-compatible (strip ES module syntax for inline)
		// Instead: just concatenate all module code — browser will handle type="module" scope
		const bundle = ordered.map(({ href, code }) => `\n/* ${href} */\n${code}`).join('\n');
		return bundle + '\n';
	}
);

const out = join(buildDir, 'index.html');
writeFileSync(out, html, 'utf-8');
console.log('✓ Single-file HTML saved to', out);
