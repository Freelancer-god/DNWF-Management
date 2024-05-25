import { clog } from '.';

export const getTableWidth = (columns, baseWidth = 1700) => {
  let _width = 0;
  if (columns) {
    columns.forEach((item) => {
      if (item.show) {
        _width += isNaN(item.width) ? 0 : item.width;
      }
    });
    clog('getTableWidth', _width);
  }
  return _width + baseWidth;
};
