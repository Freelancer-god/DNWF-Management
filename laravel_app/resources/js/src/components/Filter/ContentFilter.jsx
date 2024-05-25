import React from 'react';
import { makeid } from '../../utils';
import FilterDynamic from './FilterDynamic/FilterDynamic';
import { makeLabel } from './FilterDynamic/function';

function ContentFilter(props) {
  const {
    onDynamicFilterChange, onAvailableFilterChange,
    dfListField, dfListAvailableFilter, dynamicFilter,
  } = props;

  const handleOnChangeSelectDynamic = (data) => {
    const id = makeid(16);
    const dataToSend = {
      id,
      value: id,
      label: makeLabel(data),
      data,
    };
    onDynamicFilterChange(dataToSend);
  };

  const handleOnChangeSelectAvailable = (data) => {
    onAvailableFilterChange(data);
  };

  return (
    <div style={{ minWidth: '180px' }}>
      <FilterDynamic
        listField={dfListField}
        listAvailable={dfListAvailableFilter}
        dynamicFilter={dynamicFilter}
        onSelectDynamic={handleOnChangeSelectDynamic}
        onSelectAvailable={handleOnChangeSelectAvailable}
      />
    </div>
  );
}

export default ContentFilter;
