import { useState } from 'react';

/*
 * Helpers replicating the design-canvas pseudo-attributes:
 *   style-hover  -> <Hov hv={{...}}>   (swaps in extra styles while hovered)
 *   style-focus  -> <Field focusStyle={{...}}> (swaps in extra styles while focused)
 *
 * NOTE: if `hv`/`focusStyle` sets a longhand (e.g. `borderBottomColor`), the
 * base `style` must declare it as a longhand too — never via the shorthand
 * (`borderBottom`). React's inline-style diff only patches changed keys, so
 * on hover-out it would DELETE the longhand and the border falls back to
 * `currentColor`, leaving a stuck "white" underline/border.
 */
export function Hov({ as: Tag = 'div', hv, style, children, ...rest }) {
  const [hov, setHov] = useState(false);
  // Skip hover state on touch-only devices: a tap would otherwise leave the
  // hover styles stuck on until the visitor taps somewhere else.
  const canHover =
    typeof window === 'undefined' || !window.matchMedia
      ? true
      : window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  return (
    <Tag
      style={hov ? { ...style, ...hv } : style}
      onMouseEnter={canHover ? () => setHov(true) : undefined}
      onMouseLeave={canHover ? () => setHov(false) : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function Field({ as: Tag = 'input', style, focusStyle, ...rest }) {
  const [focused, setFocused] = useState(false);
  return (
    <Tag
      style={focused ? { ...style, ...focusStyle } : style}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...rest}
    />
  );
}
