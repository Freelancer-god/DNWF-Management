import { Select, TimePicker } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { DAY_OF_WEEK } from "../../../constants";
import { clog } from "../../../utils";

function SelectDayOfWeekComp({ onChange, value = null }) {
    const [time, setTime] = useState(
        dayjs(value).isValid() ? dayjs(value) : null
    );
    const [day, setDay] = useState(
        dayjs(value).isValid()
            ? {
                  label: DAY_OF_WEEK[dayjs(value).day()],
                  value: dayjs(value).day(),
              }
            : null
    );

    const mangObject = Array.from({ length: 7 }, (_, index) => ({
        value: index,
        label: DAY_OF_WEEK[index],
    }));

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
                          label: DAY_OF_WEEK[dayjs(value).day],
                          value: dayjs(value).day(),
                      }
                    : null
            );
        }
    }, [value]);

    const formatToSend = (time, day) => {
        // clog(
        //     "dayjs().weekday(0 - (day || day?.value))",
        //     dayjs().weekday(0 - (day || day?.value))
        // );
        const hour = dayjs(time).hour();
        const minute = dayjs(time).minute();
        const second = dayjs(time).second();
        // clog(
        //     `dayjs()
        //     .set("month", 0)
        //     .set("day", 0)
        //     .set("hour", hour)
        //     .set("minute", minute)
        //     .set("second", second)
        //     .weekday(day?.value)`,
        //     dayjs()
        //         .day(day.value)
        //         .set("hour", hour)
        //         .set("minute", minute)
        //         .set("second", second)
        //         .format("DD-MM-YYYY HH:mm:ss")
        // );
        return dayjs()
            .day(day.value)
            .set("hour", hour)
            .set("minute", minute)
            .set("second", second);
    };
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

export default SelectDayOfWeekComp;
