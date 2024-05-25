const body = document.querySelector('body');
const getComputedStyleValue = (property) => window.getComputedStyle(body).getPropertyValue(property);

const colorPrimary = getComputedStyleValue('--color-primary');
const colorPrimaryText = getComputedStyleValue('--color-main-text');
const colorBgBase = getComputedStyleValue('--color-main-background');
const boxShadow = getComputedStyleValue('--color-box-shadow');
const borderRadius = getComputedStyleValue('--border-radius');
const colorBorder = getComputedStyleValue('--color-border');
const colorBgTextHover = getComputedStyleValue('--color-background-hover');

export const token = {
  colorPrimary,
  // colorPrimaryText,
  // colorBgBase,
  // boxShadowSecondary: `0 0px 0 2px ${colorPrimary}`,
  // boxShadow: `0 0px 0 2px ${colorPrimary}`,
  // colorBorder,
  borderRadius: 3,
};
