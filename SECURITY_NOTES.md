# Security Notes

## PostCSS advisory through Next.js

`npm audit` currently reports two moderate vulnerabilities from `postcss < 8.5.10` bundled under `next`.

- Advisory: `GHSA-qx2v-qp2m-jg93`
- Package path: `node_modules/next/node_modules/postcss`
- Current Next.js version: `16.2.9`
- Audit suggestion: `npm audit fix --force`

Do not run the force fix as-is. npm currently suggests downgrading Next.js to `9.3.3`, which would be a breaking and unsafe project change.

Follow up later by updating Next.js to a compatible patched version when one is available, then rerun:

```bash
npm audit
npm run lint
npm run build
```
