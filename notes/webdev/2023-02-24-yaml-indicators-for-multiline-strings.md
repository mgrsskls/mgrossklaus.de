---
title: YAML indicators for multiline strings
tags:
  - yaml
til: true
source: https://yaml-multiline.info
---

There are different indicators to define how multiline strings in YAML files behave.

_Block style indicators_ describe how line breaks behave: With a `|` (_literal_ style) they are kept as a line break.
With a `>` (_folded_ style) they are converted to a space.

_Block chomping indicators_ describe how line breaks at the end of the string behave: `+` keeps all of them, `-` removes them.
Without an indicator, one line break will be added to end of the string.
