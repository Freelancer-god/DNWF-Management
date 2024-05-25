import { Select, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import { clog } from "../../../utils";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
function SelectDateComp({ onChange, value = null }) {
    const [time, setTime] = useState(
        dayjs(value).isValid() ? dayjs(value) : null
    );
    const [day, setDay] = useState(
        value
            ? {
                  label: dayjs(value).date(),
                  value: dayjs(value).date(),
              }
            : null
    );

    const handleChange = (value, item) => {
        setDay(item);
        const date = formatToSend(time, item);
        onChange(date);
    };

    const onChangeTime = (time, timeString) => {
        setTime(time);
        const date = formatToSend(time, day);
        onChange(date);
    };

    useEffect(() => {
        if (dayjs(value).isValid()) {
            setTime(value ? dayjs(value) : null);
            setDay(
                value
                    ? {
                          label: dayjs(value).date(),
                          value: dayjs(value).date(),
                      }
                    : null
            );
        }
    }, [value]);

    // useEffect(() => {
    //     const date = formatToSend(time, day);
    //     // onChange(date);
    // }, [time, day]);

    const formatToSend = (time, day) => {
        const hour = dayjs(time).hour();
        const minute = dayjs(time).minute();
        const second = dayjs(time).second();
        const currentYear = dayjs().year();
        const ngayGio = dayjs()
            .set("date", day?.value)
            .set("month", 0)
            .set("year", currentYear)
            .set("hour", hour)
            .set("minute", minute)
            .set("second", second);
        return ngayGio;
    };

    const mangObject = Array.from({ length: 31 }, (_, index) => ({
        value: index + 1,
        label: index + 1,
    }));

    return (
        <>
            <Select
                defaultValue={day}
                value={day}
                style={{ width: 120 }}
                onChange={handleChange}
                options={mangObject}
            />
            <TimePicker className="ml-1" onChange={onChangeTime} value={time} />
        </>
    );
}

export default SelectDateComp;
