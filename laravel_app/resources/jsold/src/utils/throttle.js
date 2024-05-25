import _ from 'lodash';

export const throttleOnPressAction = _.throttle(
  (func, data) => {
    func(data);
  },
  1000,
  { trailing: false },
);
