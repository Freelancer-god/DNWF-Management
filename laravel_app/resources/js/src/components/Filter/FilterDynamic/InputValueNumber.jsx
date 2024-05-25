import React, { useEffect, useState } from "react";
import { InputNumber } from "antd";
import { formatterNumber, parserNumber } from "../../../utils";

function InputValueNumber({ conditionType, onChangeNum, ...props }) {
    const [numStart, setNumStart] = useState("");
    const [numEnd, setNumEnd] = useState("");

    const handleOnChangeStart = (value) => {
        setNumStart(value);
    };

    const handleOnChangeEnd = (value) => {
        setNumEnd(value);
    };

    const isRenderBetween = () => {
        if (conditionType) {
            switch (conditionType.value) {
                case "between":
                    return true;
                default:
                    return false;
            }
        }
        return true;
    };

    const formatDataToSend = () => {
        if (
            numStart !== undefined &&
            numStart !== null &&
            numStart !== "" &&
            numEnd !== undefined &&
            numEnd !== null &&
            numEnd !== ""
        ) {
            return [numStart, numEnd];
        }
        if (numStart) {
            return numStart;
        }
        if (numEnd) {
            return numEnd;
        }
        return [];
    };

    useEffect(() => {
        onChangeNum(formatDataToSend);
    }, [numStart, numEnd]);

    return (
        <div>
            <InputNumber
                value={numStart}
                onChange={handleOnChangeStart}
                formatter={(value) => formatterNumber(value)}
                parser={(value) => parserNumber(value)}
                style={{ width: "100%", height: "24px", marginBottom: "2px" }}
                className="custom-ant-input-number-height"
                {...props}
            />
            {isRenderBetween() && (
                <InputNumber
                    value={numEnd}
                    onChange={handleOnChangeEnd}
                    formatter={(value) => formatterNumber(value)}
                    parser={(value) => parserNumber(value)}
                    style={{
                        width: "100%",
                        height: "24px",
                        marginBottom: "2px",
                    }}
                    className="custom-ant-input-number-height"
                    {...props}
                />
            )}
        </div>
    );
}

export default InputValueNumber;
