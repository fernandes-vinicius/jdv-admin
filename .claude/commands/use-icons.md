# Use Icons

All icons in this project must go through `src/components/icons.tsx`. Never import from `lucide-react` (or any icon library) directly in feature or page files.

## Rules

1. **Always import icons from `@/components/icons`** — never from `lucide-react` or any other icon lib directly.
2. **Before using an icon**, check whether it is already exported from `src/components/icons.tsx`.
3. **If the icon does not exist yet**, add it following the existing pattern in that file:
   - Add the lucide import to the top-level import block.
   - Export a wrapper component named `<IconName>Icon` (e.g. `HomeIcon`, `ArrowRightIcon`).
4. **Use the wrapper, not the raw lucide component**, even inside `icons.tsx` itself.

## Pattern in `src/components/icons.tsx`

```tsx
// 1. Add to the lucide import block at the top
import {
  // ...existing icons...
  Home,          // ← new addition
} from "lucide-react";

// 2. Export a wrapper at the bottom
export const HomeIcon = (props: IconProps) => <Home {...props} />;
```

## Usage in any other file

```tsx
// ✅ correct
import { HomeIcon, ArrowRightIcon } from "@/components/icons";

// ❌ wrong — never do this
import { Home } from "lucide-react";
```

## When invoked

If `$ARGUMENTS` names one or more icons:
1. Read `src/components/icons.tsx`.
2. For each icon not yet present, add the lucide import and the wrapper export.
3. Return the correct import line to use in the calling file.

If invoked without arguments, audit the file that is currently open (or the files mentioned in the conversation) and fix any direct icon-library imports by routing them through `icons.tsx`.
