import pxToViewPort from 'postcss-px-to-viewport';

export default pxToViewPort({
  viewportWidth: 750,
  viewportHeight: 1334,
  unitPrecision: 5,
  viewportUnit: 'vw',
  selectorBlackList: [],
  minPixelValue: 1,
  mediaQuery: false,
})
