[![npm](https://img.shields.io/npm/v/focus-if-need)](https://github.com/JW/focus-if-need) [![GitHub](https://img.shields.io/npm/l/focus-if-need)](https://github.com/JW/focus-if-need) 

Inspired by [focus-lock](https://github.com/theKashey/focus-lock)

## motivation

Recently I create web-ext contain lots of input elements(or other focusable element). I want to automatic focus available element inside opened dialog/popover/modal. And when I close those elements, focus another element inside page.

This package for: 

1. switch **focus** between different elements functionally; 
2. automatic focus element if available;

## install

```console
pnpm i focus-if-need
```

## usage

### `react`

```tsx
import { useFocus } from 'focus-if-need/react'

const { ref } = useFocus<HTMLInputElement>('main')
<input ref={ref} placeholder="placeholder" />
```

functional focus any element:

```tsx
import { useFocus, focusIfNeed } from 'focus-if-need/react'

// focus input element which register by id='main'
focusIfNeed.focus('main')
```

Or focus last focused element

```tsx
import { useFocus, focusIfNeed } from 'focus-if-need/react'

focusIfNeed.go(-1)
```

## development

- **Setup** - `pnpm i`
- **Build** - `pnpm build`

# 
<div align='right'>

*built with ❤️ by 😼*

</div>

