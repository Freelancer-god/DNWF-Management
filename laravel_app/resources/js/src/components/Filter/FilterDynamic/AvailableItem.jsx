import { Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import React from 'react';
import { isChecked } from './function';
import EventEmitter from '../../../hook/EventEmitter';

function AvailableItem(props) {
  const { item, handleOnSelectAvailable, selectedAvailable } = props;

  const handleOnMouseEnter = () => {
    EventEmitter.notify('onDropdownFilterDynamicChange', { open: false });
  };

  return (
    <div key={item.title} className="flex-1" onMouseEnter={handleOnMouseEnter}>
      <Button
        type="text"
        className="flex-1 w-full rounded-none"
        style={{ padding: '0 12px', height: '26px' }}
        onClick={handleOnSelectAvailable(item)}
      >
        <div className="flex flex-1 ">
          {isChecked(selectedAvailable, item.id) === true && (
          <div style={{ marginRight: '5px' }}>
            <CheckOutlined />
          </div>
          )}
          <span>{item.label}</span>
        </div>
      </Button>
    </div>
  );
}

export default React.memo(AvailableItem);
