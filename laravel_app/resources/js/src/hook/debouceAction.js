import _ from 'lodash';

export const debouceAction = (func, data, time = 300, options = { leading: false, trailing: true }) => {
    _.debounce(
        func(data),
        time,
        options,
    );
};
