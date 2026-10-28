import { readFileSync } from 'node:fs';
import { registerHooks, stripTypeScriptTypes } from 'node:module';

// Node 22 does not natively strip types inside node_modules. Astro handles the
// published TS-source package in builds; this adapter is only for Node tests.
const analyticsSource = new URL('../node_modules/@codeworkslabs/astro-analytics/src/', import.meta.url).href;
registerHooks({
  load(url, context, nextLoad) {
    if (url.startsWith(analyticsSource) && url.endsWith('.ts')) {
      return {
        format: 'module',
        source: stripTypeScriptTypes(readFileSync(new URL(url), 'utf8'), { mode: 'strip', sourceUrl: url }),
        shortCircuit: true,
      };
    }
    return nextLoad(url, context);
  },
});
