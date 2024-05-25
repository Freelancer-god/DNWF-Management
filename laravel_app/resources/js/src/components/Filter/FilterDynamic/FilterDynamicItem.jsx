import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import dayjs from "dayjs";
import EventEmitter from "../../../hook/EventEmitter";
import { clog, formatterNumber, trueTypeOf, tt } from "../../../utils";
import { getItemFromArrayByValue } from "./function";
import InputValueTime from "./InputValueTime";
import SelectWithSearch from "../../SelectWithSearch/SelectWithSearch";
import InputValueNumber from "./InputValueNumber";
import { formatNgayThang, stringToDateDMYHM } from "../../../utils/dateTime";
import InputValueDate from "./InputValueDate";

function FilterDynamicItem(props) {
    const { listField, item } = props;

    const [selectedField, setSelectedField] = useState(null);
    const [selectedCondition, setSelectedCondition] = useState(null);
    const [value, setValue] = useState(null);

    const [onDropdownVisible1, setOnDropdownVisible1] = useState(false);
    const [onDropdownVisible2, setOnDropdownVisible2] = useState(false);
    const [onDropdownVisible3, setOnDropdownVisible3] = useState(false);
    clog("selectedField", selectedField);
    const handleOnDropdownVisibleChange = (value) => {
        EventEmitter.notify("onChangeSelectItemFilterDynamicOpen", {
            value,
            id: item.id,
        });
    };
    const handleOnDropdownVisibleChange1 = (value) => {
        setOnDropdownVisible1(value);
    };
    const handleOnDropdownVisibleChange2 = (value) => {
        setOnDropdownVisible2(value);
    };
    const handleOnDropdownVisibleChange3 = (value) => {
        setOnDropdownVisible3(value);
    };
    useEffect(() => {
        if (onDropdownVisible1 === true) {
            handleOnDropdownVisibleChange(true);
        } else if (onDropdownVisible2 === true) {
            handleOnDropdownVisibleChange(true);
        } else if (onDropdownVisible3 === true) {
            handleOnDropdownVisibleChange(true);
        } else {
            handleOnDropdownVisibleChange(false);
        }
    }, [onDropdownVisible1, onDropdownVisible2, onDropdownVisible3]);

    const handleUpdateChange = (data) => {
        EventEmitter.notify("onChangeUpdateDynamicItem", { data });
    };

    const handleValueTime = (value) => {
        if (value) {
            if (stringToDateDMYHM(value) !== null) {
                // return dayjs(stringToDateDMYHM(value)).format(
                //     "YYYY-MM-DD HH:mm:ss"
                // );
                return stringToDateDMYHM(value).toISOString();
            }
        }
        return "";
    };

    const handleValue = () => {
        if (value && value?.value !== undefined && value?.value !== null) {
            return value?.value;
        }
        if (trueTypeOf(value) === "array") {
            if (value.length > 0) {
                if (selectedField?.type === "time") {
                    return [
                        handleValueTime(value[0]),
                        handleValueTime(value[1]),
                    ];
                }
                return value;
            }
            return "";
        }
        if (selectedField?.type === "time") {
            return handleValueTime(value);
        }
        return value;
    };
    const handleLabel = () => {
        const s1 = `${selectedField ? selectedField.label : ""}`;
        const s2 = `${selectedCondition ? selectedCondition.label : ""}`;
        let s3 = "";
        clog("value", value);
        if (value && value.label) {
            s3 = value.label;
        } else if (trueTypeOf(value) === "array") {
            if (value.length > 0) {
                if (selectedField?.type === "number") {
                    s3 = `${formatterNumber(value[0])} ${tt(
                        "và"
                    )} ${formatterNumber(value[1])}`;
                } else {
                    if (selectedField?.type === "date") {
                        s3 =
                            formatNgayThang(value[0]) +
                            " và " +
                            formatNgayThang(value[1]);
                    } else {
                        s3 = value.join(` ${tt("và")} `).toString();
                    }
                }
            } else if (value.length === 0) {
                s3 = "";
            }
        } else if (selectedField?.type === "number") {
            s3 = formatterNumber(value);
        } else {
            s3 = value;
        }
        return `${s1} ${s2} ${s3} `;
    };
    useEffect(() => {
        const dataToSend = {
            id: item.id,
            field: selectedField ? selectedField.value : "",
            cond: selectedCondition ? selectedCondition.value : "",
            label: handleLabel(),
            value: handleValue(),
        };
        handleUpdateChange(dataToSend);
    }, [selectedField, selectedCondition, value]);

    const conditionalByFieldType = (type) => {
        const input = [
            { label: tt("Chứa"), value: "include" },
            { label: tt("Không chứa"), value: "not_include" },
            { label: tt("Bằng"), value: "is" },
            { label: tt("Không bằng"), value: "not" },
        ];
        const select = [
            { label: tt("Là"), value: "is" },
            { label: tt("Không là"), value: "not" },
        ];
        const time = [
            { label: tt("trong khoảng"), value: "between" },
            { label: tt("bằng"), value: "is" },
            { label: tt("không bằng"), value: "not" },
            { label: tt("sau"), value: "gt" },
            { label: tt("trước"), value: "lt" },
            { label: tt("sau hoặc bằng"), value: "gte" },
            { label: tt("trước hoặc bằng"), value: "lte" },
        ];
        const date = [
            { label: tt("trong khoảng"), value: "between" },
            { label: tt("bằng"), value: "is" },
            { label: tt("không bằng"), value: "not" },
            { label: tt("sau"), value: "gt" },
            { label: tt("trước"), value: "lt" },
            { label: tt("sau hoặc bằng"), value: "gte" },
            { label: tt("trước hoặc bằng"), value: "lte" },
        ];
        const number = [
            { label: tt("trong khoảng"), value: "between" },
            { label: tt("bằng"), value: "is" },
            { label: tt("không bằng"), value: "not" },
            { label: tt("lớn hơn"), value: "gt" },
            { label: tt("bé hơn"), value: "lt" },
            { label: tt("lớn hơn hoặc bằng"), value: "gte" },
            { label: tt("bé hơn hoặc bằng"), value: "lte" },
        ];
        switch (type) {
            case "input":
                return input;
            case "select":
                return select;
            case "selectAndSearch":
                return select;
            case "time":
                return time;
            case "number":
                return number;
            case "date":
                return date;
            default:
                return input;
        }
    };
    const handleOnChangeInputValue = (e) => {
        const valueParam = e.target.value;
        setValue(valueParam);
    };
    const handleOnChangeSelectValue = (value, option) => {
        clog("value, option", value, option);
        setValue(option);
    };
    const handleOnChangeSelectWithSearchValue = (value) => {
        setValue(value);
    };
    const handleOnChangedPickerDate = (date) => {
        setValue(date);
    };
    const handleOnChangedNumber = (date) => {
        setValue(date);
    };
    useEffect(() => {
        clog("value", value);
    }, [value]);
    const inputValueByFieldType = (type) => {
        const input = (
            <Input
                className="ant-input-custom-height"
                placeholder={tt("Nhập")}
                value={value}
                onChange={handleOnChangeInputValue}
            />
        );
        const select = (
            <Select
                style={{ width: "100%" }}
                className="ant-select-custom-height"
                options={
                    selectedField &&
                    selectedField.type === "select" &&
                    selectedField.selectOption
                        ? selectedField.selectOption
                        : []
                }
                // value={value}
                onChange={handleOnChangeSelectValue}
                placeholder={tt("Chọn")}
                onDropdownVisibleChange={handleOnDropdownVisibleChange3}
            />
        );
        const selectAndSearch = (
            <SelectWithSearch
                style={{ width: "100%", fontsize: "5px" }}
                className="ant-select-search-custom-height"
                placeholder={tt("Chọn")}
                selected={value}
                onChangSelect={handleOnChangeSelectWithSearchValue}
                API={
                    selectedField &&
                    selectedField.type === "selectAndSearch" &&
                    selectedField.api
                        ? selectedField.api
                        : []
                }
                apiMethod={
                    selectedField &&
                    selectedField.type === "selectAndSearch" &&
                    selectedField.method
                        ? selectedField.method
                        : []
                }
                formatFunction={
                    selectedField &&
                    selectedField.type === "selectAndSearch" &&
                    selectedField.formatData &&
                    selectedField.formatData
                }
                onDropdownVisibleChange={handleOnDropdownVisibleChange3}
                filter={
                    selectedField &&
                    selectedField.type === "selectAndSearch" &&
                    selectedField.filter
                        ? selectedField.filter
                        : {}
                }
                headers={{
                    headers: {
                        Authorization: `Bearer ${
                            document.getElementById("myToken")?.value
                        }`,
                    },
                }}
            />
        );
        switch (type) {
            case "input":
                return input;
            case "select":
                return select;
            case "selectAndSearch":
                return selectAndSearch;
            case "time":
                return (
                    <InputValueTime
                        conditionType={selectedCondition}
                        onChangeDateTime={handleOnChangedPickerDate}
                        onOpenChange={handleOnDropdownVisibleChange3}
                    />
                );
            case "date":
                return (
                    <InputValueDate
                        conditionType={selectedCondition}
                        onChangeDateTime={handleOnChangedPickerDate}
                        onOpenChange={handleOnDropdownVisibleChange3}
                    />
                );
            case "number":
                return (
                    <InputValueNumber
                        conditionType={selectedCondition}
                        onChangeNum={handleOnChangedNumber}
                        onOpenChange={handleOnDropdownVisibleChange3}
                    />
                );
            default:
                return input;
        }
    };

    useEffect(() => {
        const data = getItemFromArrayByValue(listField, item.field);
        if (data) {
            setSelectedField(data);
        } else {
            setSelectedField(listField[0]);
        }
    }, []);
    useEffect(() => {
        const array = conditionalByFieldType(
            selectedField ? selectedField.type : ""
        );
        const data = getItemFromArrayByValue(array, item.cond);
        if (data) {
            setSelectedCondition(data);
        } else {
            setSelectedCondition(array[0]);
        }
    }, [selectedField]);
    useEffect(() => {
        if (
            selectedField &&
            selectedField.type &&
            selectedField.type === "select"
        ) {
            if (selectedField.selectOption) {
                setValue(selectedField.selectOption[0]);
                return;
            }
        }
        setValue("");
    }, [selectedCondition]);

    const handleOnChangeSelectField = (value, option) => {
        setSelectedField(option);
    };
    const handleOnChangeSelectCondition = (value, option) => {
        setSelectedCondition(option);
    };

    return (
        <div>
            <div style={{ marginBottom: "2px" }}>
                <Select
                    style={{ width: "100%" }}
                    className="ant-select-custom-height"
                    options={listField || []}
                    defaultActiveFirstOption
                    value={selectedField ? selectedField.value : ""}
                    onChange={handleOnChangeSelectField}
                    onDropdownVisibleChange={handleOnDropdownVisibleChange1}
                />
            </div>
            <div style={{ marginBottom: "2px" }}>
                <Select
                    style={{ width: "100%" }}
                    className="ant-select-custom-height"
                    options={conditionalByFieldType(
                        selectedField ? selectedField.type : ""
                    )}
                    defaultActiveFirstOption
                    value={selectedCondition ? selectedCondition.value : ""}
                    onChange={handleOnChangeSelectCondition}
                    onDropdownVisibleChange={handleOnDropdownVisibleChange2}
                />
            </div>
            <div style={{ marginTop: "2px" }}>
                {inputValueByFieldType(selectedField ? selectedField.type : "")}
            </div>
        </div>
    );
}

export default FilterDynamicItem;
