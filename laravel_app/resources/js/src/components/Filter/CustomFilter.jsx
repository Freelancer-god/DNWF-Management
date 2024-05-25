/* eslint-disable max-len */

import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Dropdown, theme } from 'antd';
import { debounce } from 'lodash';
import { useMediaQuery } from 'react-responsive';
import ContentFilter from './ContentFilter';
import EventEmitter from '../../hook/EventEmitter';

function CustomFilter(props) {
  const {
    children, className, dfListField, dfListAvailableFilter, dynamicFilter,
    onDynamicFilterChange, onAvailableFilterChange,
  } = props;
  const [open, setOpen] = useState(false);
  const openChildRef = useRef(false);

  const functionChange = (value) => {
    openChildRef.current = value;
  };
  const handlerFilterOpenChange = useCallback(debounce((nextValue) => functionChange(nextValue), 300), []);
  const onChangeSelectContentFilterDynamicOpen = (data) => {
    const { value } = data;
    handlerFilterOpenChange(value);
  };

  useEffect(() => {
    EventEmitter.addListener('onChangeSelectContentFilterDynamicOpen', onChangeSelectContentFilterDynamicOpen);
    return () => {
      EventEmitter.removeListener('onChangeSelectContentFilterDynamicOpen', onChangeSelectContentFilterDynamicOpen);
    };
  }, []);

  const handleOnDropdownFilterChange = (openDropdown) => {
    if (openDropdown === false) {
      EventEmitter.notify('onDropdownFilterDynamicChange', { open: false });
      if (openChildRef.current === false) {
        setOpen(false);
      }
    } else {
      setOpen(true);
    }
  };

  const { useToken } = theme;
  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: 'none',
  };

  const isResponsiveDropdown = useMediaQuery({ query: '(min-width: 950px)' });

  return (
    <div className={className}>
      <Dropdown
        overlayInnerStyle={{ padding: '10px' }}
        trigger="click"
        placement={isResponsiveDropdown ? 'bottom' : 'bottomRight'}
        menu={{
				  items: [],
        }}
        dropdownRender={(menu) => (
          <div style={contentStyle}>
            {/* {React.cloneElement(menu, { */}
            {/*  style: menuStyle, */}
            {/* })} */}
            <ContentFilter
              onAvailableFilterChange={onAvailableFilterChange}
              onDynamicFilterChange={onDynamicFilterChange}
              dfListField={dfListField}
              dfListAvailableFilter={dfListAvailableFilter}
              dynamicFilter={dynamicFilter}
            />
          </div>
        )}
        onOpenChange={handleOnDropdownFilterChange}
        open={open}
      >
        {children}
      </Dropdown>
    </div>
  );
}

export default CustomFilter;
