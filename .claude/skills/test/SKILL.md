---
name: test
description: Run Jest tests
allowed-tools: Bash
---

Parse $ARGUMENTS:
- If the user passes `watch`, run `npm run test:watch`
- Otherwise run `npm test`
