import { TimePicker } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

function SelectTimeComp({ onChange, value = null }) {
    const [time, setTime] = useState(
        dayjs(value).isValid() ? dayjs(value) : null
    );
    const onChangeTime = (time, timeString) => {
        setTime(time);
        const date = formatToSend(time);
        onChange(date);
    };

    useEffect(() => {
        if (dayjs(value).isValid()) {
            setTime(value ? dayjs(value) : null);
        }
    }, [value]);

    const formatToSend = (time) => {
        // const day = dayjs(time).day();
        const hour = dayjs(time).hour();
        const minute = dayjs(time).minute();
        const second = dayjs(time).second();
        const ngayGio = dayjs()
            .set("hour", hour)
            .set("minute", minute)
            .set("second", second);
        return ngayGio;
    };

    return <TimePicker className="ml-1" onChange={onChangeTime} value={time} />;
}

export default SelectTimeComp;
