import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Button, Divider, Select, Space,
} from 'antd';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { tt } from '../utils';
import CustomEmpty from './CustomEmpty';
import { token } from '../utils/antdtheme';

function CustomSelectWithActionBottom(props) {
  const {
    formatData, value, style, placeholder, searchAPI, onSelect,
    onPressCreate, onPressCreateAndUpdate, isCanCreate, isCanCreateAndUpdate,
  } = props;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [term, setTerm] = useState('');
  const [data, setData] = useState([]);
  const [spinnerSearch, setSpinnerSearch] = useState(false);

  const handleDropdownVisibleChange = (isOpen) => {
    setOpen(isOpen);
  };

  const mergeValueToOptions = (value, option) => {
    if (value) {
      let dataCopy = option.slice();
      const index = dataCopy.findIndex((obj) => obj.id === value.id);
      if (index !== -1) {
        dataCopy[index] = { ...dataCopy[index], ...value };
      } else {
        dataCopy = [value, ...dataCopy];
      }
      return dataCopy;
    }
    return option;
  };

  const getData = async () => {
    const dataToSend = {
      term,
      page: 1,
      limit: 10,
    };
    setSpinnerSearch(true);
    const response = await searchAPI(dataToSend);
    setSpinnerSearch(false);
    if (response) {
      setData(response.data);
    }
  };
  const functionChange = (text) => {
    setTerm(text);
  };
  const handlerSearch = useCallback(debounce((nextValue) => functionChange(nextValue), 500), []);
  useEffect(() => {
    getData();
  }, [term]);

  const handleOnChangeSearch = (text) => {
    setSearch(text);
    handlerSearch(text);
  };

  const handleOnPressCreate = () => {
    onSelect('', { id: 'quickAdd', value: 'quickAdd', label: term });
    setOpen(false);
    setTimeout(() => {
      onPressCreate(search);
    }, 300);
  };

  const handleOnPressCreateAndUpdate = () => {
    setOpen(false);
    setTimeout(() => {
      onPressCreateAndUpdate(search);
    }, 300);
  };

  const buttonStyle = {
    padding: '5px 12px', color: token.colorPrimary, width: '100%', textAlign: 'left',
  };
  const actionBottom = () => (
    <>
      <Divider
        style={{
          margin: '8px 0',
        }}
      />
      <Space
        style={{
          padding: '0 8px 4px',
        }}
      />
      {isCanCreate && (
      <div style={{ fontSize: '14px' }}>
        <Button
          type="text"
          onClick={handleOnPressCreate}
          style={buttonStyle}
        >
          {`${tt('Tạo')} `}
          <strong
            style={{ fontSize: '13px', color: token.colorPrimary, fontWeight: 'bolder' }}
          >
            {` "${term}"`}
          </strong>
        </Button>
      </div>
      )}
      {isCanCreateAndUpdate && (
      <div style={{ fontSize: '14px' }}>
        <Button
          type="text"
          onClick={handleOnPressCreateAndUpdate}
          style={buttonStyle}
        >
          {`${tt('Tạo và sửa...')}`}
        </Button>
      </div>
      )}
    </>
  );
  const formatDataBase = (dataParam) => {
    const array = [];
    for (const i of dataParam) {
      array.push({
        id: i.id,
        value: i.id,
        label: i.name || i.title || i.label,
      });
    }
    return array;
  };
  const options = useMemo(() => (formatData ? formatData(data) : formatDataBase(data)), [data]);
  const isSearchMathWithOptions = () => {
    for (const i of options) {
      if (i.label === term) {
        return true;
      }
    }
    return false;
  };
  return (
    <Select
      style={style}
      options={mergeValueToOptions(value, options)}
      placeholder={placeholder}
      value={value}
      filterOption={false}
      onSelect={onSelect}
      showSearch
      searchValue={search}
      onSearch={handleOnChangeSearch}
      loading={spinnerSearch || (value && value.id === 'quickAdd')}
      notFoundContent={<CustomEmpty />}
      open={open}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      dropdownRender={(menu) => (
        <>
          {menu}
          {(term && !isSearchMathWithOptions()) && actionBottom()}
        </>
      )}
    />
  );
}
CustomSelectWithActionBottom.propTypes = {
  onPressCreate: PropTypes.func,
  onPressCreateAndUpdate: PropTypes.func,
  formatData: PropTypes.func,
  searchAPI: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object]),
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  onSelect: PropTypes.func,
  isCanCreate: PropTypes.bool,
  isCanCreateAndUpdate: PropTypes.bool,
  addToOptions: PropTypes.oneOfType([PropTypes.array]),
  setAddedOption: PropTypes.func,
};
CustomSelectWithActionBottom.defaultProps = {
  onPressCreate: () => {},
  onPressCreateAndUpdate: () => {},
  formatData: () => {},
  searchAPI: () => {},
  style: {},
  value: null,
  placeholder: '',
  onSelect: () => {},
  isCanCreate: true,
  isCanCreateAndUpdate: true,
  addToOptions: [],
  setAddedOption: () => {},
};
export default CustomSelectWithActionBottom;
