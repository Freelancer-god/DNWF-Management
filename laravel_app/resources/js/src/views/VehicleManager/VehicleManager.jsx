import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import CustomList from './CustomList';
import CustomForm from './CustomForm';
import {
  addDynamicFilterItem,
  changeSelectedRows,
  changeSpinnerSearch,
  dynamicFilter,
  getData,
  order,
  page,
  search,
} from '../../store/VehicleManager';
import { tt } from '../../utils';
import { RELOAD_DATA_TIMEOUT } from '../../constants';

const VehicleManager = () => {
  const [searchParams] = useSearchParams();
  const _search = useSelector(search);
  const _page = useSelector(page);
  const _order = useSelector(order);
  const _dynamicFilter = useSelector(dynamicFilter);
  const dispatch = useDispatch();
  const [isLoadFirstTime, setIsLoadFirstTime] = useState(true);

  useEffect(() => {
    dispatch(getData());
    setIsLoadFirstTime(false);
    document.title = tt('Quản lý phương tiện');

    // // them filter mac dinh
    // dispatch(addDynamicFilterItem(
    //   {
    //     id: '0_1',
    //     value: '0_1',
    //     groupId: '0',
    //     label: tt('Đang diễn ra'),
    //     data: [
    //       {
    //         id: 'status_0',
    //         field: 'trips.status',
    //         cond: 'is',
    //         value: 0,
    //       },
    //       {
    //         id: 'status_1',
    //         field: 'trips.status',
    //         cond: 'is',
    //         value: 1,
    //       },
    //     ],
    //   },
    // ));
    // debugger;
    const myInterval = setInterval(() => {
      dispatch(getData());
    }, RELOAD_DATA_TIMEOUT);
    return () => clearInterval(myInterval);
  }, []);

  const fetchData = () => {
    dispatch(changeSelectedRows([]));
    dispatch(changeSpinnerSearch(true));
    dispatch(getData());
  };

  useEffect(() => {
    if (isLoadFirstTime === false) {
      fetchData();
    }
  }, [_search, _page, _order]);

  const functionChange = () => {
    fetchData();
  };
  const handlerSearch = useCallback(
    debounce((nextValue) => functionChange(nextValue), 500),
    [],
  );
  const handleOnChangeFilter = () => {
    handlerSearch();
  };
  useEffect(() => {
    if (isLoadFirstTime === false) {
      handleOnChangeFilter();
    }
  }, [_dynamicFilter]);

  const handleRenderByViewType = () => {
    switch (searchParams.get('view_type')) {
      case 'list':
        return <CustomList />;
      case 'form':
        return <CustomForm />;
      default:
        return <CustomList />;
    }
  };

  return handleRenderByViewType();
};

export default VehicleManager;
