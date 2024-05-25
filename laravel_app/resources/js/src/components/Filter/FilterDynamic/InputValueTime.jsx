import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { tt } from '../../../utils';
import { getEndTimeOfDate, getStartTimeOfDate } from './function';

function InputValueTime({ conditionType, onChangeDateTime, ...props }) {
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);

  const onChangeStart = (date, dateString) => {
    setDateStart(date);
  };
  const onChangeEnd = (date, dateString) => {
    setDateEnd(date);
  };

  const isRenderBetween = () => {
    if (conditionType) {
      switch (conditionType.value) {
        case 'between':
          return true;
        default:
          return false;
      }
    }
    return true;
  };

  const initDate = () => {
    if (conditionType) {
      switch (conditionType.value) {
        case 'between':
          setDateStart(dayjs(getStartTimeOfDate()));
          setDateEnd(dayjs(getEndTimeOfDate()));
          break;
        default:
          setDateStart(dayjs(getStartTimeOfDate()));
          setDateEnd(null);
      }
    } else {
      setDateStart(dayjs(getStartTimeOfDate()));
      setDateEnd(dayjs(getEndTimeOfDate()));
    }
  };

  const formatDataToSend = () => {
    if (dateStart && dateEnd) {
      return [dayjs(dateStart).format('DD/MM/YYYY HH:mm'), dayjs(dateEnd).format('DD/MM/YYYY HH:mm')];
    } if (dateStart) {
      return dayjs(dateStart).format('DD/MM/YYYY HH:mm');
    } if (dateEnd) {
      return dayjs(dateEnd).format('DD/MM/YYYY HH:mm');
    }
    return [];
  };

  useEffect(() => {
    onChangeDateTime(formatDataToSend());
  }, [dateStart, dateEnd]);

  useEffect(() => {
    initDate();
  }, [conditionType]);

  return (
    <div>
      <DatePicker
        showTime
        value={dateStart}
        onChange={onChangeStart}
        format="DD/MM/YYYY HH:mm"
        placeholder={isRenderBetween() ? tt('Thời gian bắt đầu') : tt('Thời gian')}
        style={{ width: '100%', padding: '1px 11px', marginBottom: '2px' }}
        {...props}
      />
      {isRenderBetween() && (
      <DatePicker
        showTime
        value={dateEnd}
        onChange={onChangeEnd}
        format="DD/MM/YYYY HH:mm"
        placeholder={tt('Thời gian kết thúc')}
        style={{ width: '100%', padding: '1px 11px', marginBottom: '2px' }}
        {...props}
      />
      )}
    </div>
  );
}
InputValueTime.propTypes = {
  conditionType: PropTypes.oneOfType([PropTypes.object]),
  onChangeDateTime: PropTypes.func,
};
InputValueTime.defaultProps = {
  conditionType: null,
  onChangeDateTime: () => {},
};
export default React.memo(InputValueTime);
