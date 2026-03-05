# Cornerstone Customization Demo (Local Linking)

This repository now includes a simple, visible customization point in:

`cornerstone3d/packages/tools/src/tools/annotation/LengthTool.ts`

Look for:

`const LENGTH_TEXT_DEMO_SUFFIX = '[CS3D LOCAL DEMO]';`

Every Length annotation label now includes that suffix.

## Demo flow

1. Start viewer once:
   `yarn dev:proposal`
2. Open a study and draw a Length measurement.
3. Change `LENGTH_TEXT_DEMO_SUFFIX` in `LengthTool.ts` (for example to `[LIVE EDIT]`).
4. Rebuild and relink Cornerstone packages from the viewer root:
   `yarn refresh:cornerstone`
5. Refresh the browser tab and draw another Length measurement.

You should immediately see the updated label suffix, demonstrating the local Cornerstone edit loop.
