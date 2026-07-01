---
name: feedback-no-absolute-paths
description: Never use absolute paths in responses or memory — always use repo-relative paths
metadata:
  type: feedback
---

Always use repo-relative paths (e.g. `tests/unit/a11y/helpers.ts`) in responses and memory files. Never use absolute paths like `C:\Users\shane\...`.

**Why:** User explicitly requires this.

**How to apply:** Any time you reference a file in a response or memory entry, strip the absolute prefix and show from the repo root.
