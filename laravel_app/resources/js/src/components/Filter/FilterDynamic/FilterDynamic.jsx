import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Button, Divider, Popover } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import { useMediaQuery } from 'react-responsive';
import { tt } from '../../../utils';
import ContentFilterDynamic from './ContentFilterDynamic';
import EventEmitter from '../../../hook/EventEmitter';
import AvailableItem from './AvailableItem';

function FilterDynamic(props) {
  const {
    listField, listAvailable, dynamicFilter, onSelectDynamic, onSelectAvailable,
  } = props;
  const openChildRef = useRef(false);
  const [openPopover, setOpenPopover] = useState(false);

  const handleOnSelectAvailable = (item) => () => {
    const copy = dynamicFilter.slice();
    // lay thong tin trong group ra neu co va remove no ra khoi copy
    const groups = {};
    copy.forEach((obj) => {
      if (obj.groupId) {
        groups[obj.groupId] = obj;
      }
    });
    if (groups[item.groupId] !== undefined) {
      copy.splice(copy.indexOf(groups[item.groupId]), 1);
    }

    // tim co item nay trong ds khong neu co thi remove ra khong co thi add vao
    const index = copy.findIndex((obj) => obj.id === item.id);

    if (index !== -1) {
      copy.splice(index, 1);
    } else {
      copy.push({ ...item, value: item.id });
    }
    onSelectAvailable(copy);
  };

  const handleOnPressSubmit = (data) => {
    const { filter } = data;
    onSelectDynamic(filter);
  };

  const handleOnOpenChange = (open) => {
    if (open === true) {
      setOpenPopover(true);
    }
  };

  const onDropdownFilterDynamicChange = (data) => {
    const { open } = data;
    if (open === false) {
      if (openChildRef.current === false) {
        setOpenPopover(false);
      }
    }
  };
  useEffect(() => {
    EventEmitter.addListener('onDropdownFilterDynamicChange', onDropdownFilterDynamicChange);
    return () => {
      EventEmitter.removeListener('onDropdownFilterDynamicChange', onDropdownFilterDynamicChange);
    };
  }, []);

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

  const isResponsivePopover = useMediaQuery({ query: '(min-width: 450px)' });

  return (
    <div>
      <div style={{ paddingTop: '6px' }}>
        {listAvailable.map((item) => (
          <div key={item.title}>
            {item.type === 'divider'
              ? <Divider key={item.title} style={{ marginTop: '2px', marginBottom: '2px' }} />
              : item.type === 'group' ? (
                <div style={{ marginTop: '2px', marginBottom: '2px' }}>
                  <div className="mr-1.5 ml-1.5" style={{ color: 'rgba(0,0,0,.45)' }}>{item.title}</div>
                  <div>
                    {item.children.map((itemChild, indexChild) => (
                      <AvailableItem
                        item={itemChild}
                        key={itemChild.title}
                        handleOnSelectAvailable={handleOnSelectAvailable}
                        selectedAvailable={dynamicFilter}
                      />
                    ))}
                  </div>
                </div>
              )
                : (
                  <AvailableItem
                    item={item}
                    key={item.title}
                    handleOnSelectAvailable={handleOnSelectAvailable}
                    selectedAvailable={dynamicFilter}
                  />
                )}
          </div>
        ))}
      </div>
      <Divider style={{ margin: 0 }} />
      <Popover
        style={{ paddingBottom: '4px' }}
        placement={isResponsivePopover ? 'rightTop' : 'bottom'}
        overlayInnerStyle={{ padding: '10px' }}
        content={<ContentFilterDynamic listField={listField} onSubmit={handleOnPressSubmit} />}
        open={openPopover}
        onOpenChange={handleOnOpenChange}
      >
        <div className="flex">
          <Button type="text" className="flex-1 rounded-none" style={{ padding: '4px 10px' }}>
            <div className="flex flex-1 justify-between ">
              <span>{tt('Bộ lọc tuỳ chỉnh')}</span>
              <div>
                <RightOutlined />
              </div>
            </div>
          </Button>
        </div>
      </Popover>
    </div>
  );
}

export default FilterDynamic;
