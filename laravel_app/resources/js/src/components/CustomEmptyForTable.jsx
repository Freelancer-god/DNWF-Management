import { Empty } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

function CustomEmptyForTable(props) {
  const { description } = props;
  return (
    <Empty description={description} image={Empty.PRESENTED_IMAGE_SIMPLE} className="custom-empty-center" />
  );
}
CustomEmptyForTable.propTypes = {
  description: PropTypes.string.isRequired,
};
export default CustomEmptyForTable;
