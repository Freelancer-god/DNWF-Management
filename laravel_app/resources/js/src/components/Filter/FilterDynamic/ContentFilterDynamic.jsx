import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { DeleteFilled, PlusCircleOutlined } from "@ant-design/icons";

import FilterDynamicItem from "./FilterDynamicItem";
import { makeid, tt } from "../../../utils";
import EventEmitter from "../../../hook/EventEmitter";
import { showError } from "../../dialogs";

function ContentFilterDynamic(props) {
    const { listField, onSubmit } = props;
    const [listFilter, setListFilter] = useState([
        {
            id: makeid("10"),
            field: "",
            cond: "",
            value: "",
        },
    ]);

    const handleOnClickDelete = (item) => () => {
        setListFilter((prevState) => {
            const copy = prevState.slice();
            const index = copy.findIndex((obj) => obj.id === item.id);
            if (index !== -1) {
                copy.splice(index, 1);
            }
            return copy;
        });
    };

    const handleOnClickAddFilter = () => {
        const item = {
            id: makeid("10"),
            field: "",
            cond: "",
            value: "",
        };
        setListFilter((prevState) => [...prevState, item]);
    };

    const handleOnContentFilterDynamic = (value) => {
        EventEmitter.notify("onChangeSelectContentFilterDynamicOpen", {
            value,
        });
    };

    useEffect(() => {
        let flag = false;
        for (const i of listFilter) {
            if (i.show === true) {
                flag = true;
                break;
            }
        }
        handleOnContentFilterDynamic(flag);
    }, [listFilter]);

    const onChangeUpdateDynamicItem = (data) => {
        const { id, field, cond, value, label } = data.data;
        setListFilter((prevState) => {
            const copy = prevState.slice();
            const index = copy.findIndex((obj) => obj.id === id);
            if (index !== -1) {
                copy[index] = {
                    ...copy[index],
                    field,
                    cond,
                    value,
                    label,
                };
            }
            return copy;
        });
    };

    useEffect(() => {
        EventEmitter.addListener(
            "onChangeUpdateDynamicItem",
            onChangeUpdateDynamicItem
        );
        return () => {
            EventEmitter.removeListener(
                "onChangeUpdateDynamicItem",
                onChangeUpdateDynamicItem
            );
        };
    }, []);

    const onChangeSelectItemFilterDynamicOpen = (data) => {
        const { id, value } = data;
        setListFilter((prevState) => {
            const copy = prevState.slice();
            const index = copy.findIndex((obj) => obj.id === id);
            if (index !== -1) {
                copy[index] = {
                    ...copy[index],
                    show: value,
                };
            }
            return copy;
        });
    };

    useEffect(() => {
        EventEmitter.addListener(
            "onChangeSelectItemFilterDynamicOpen",
            onChangeSelectItemFilterDynamicOpen
        );
        return () => {
            EventEmitter.removeListener(
                "onChangeSelectItemFilterDynamicOpen",
                onChangeSelectItemFilterDynamicOpen
            );
        };
    }, []);

    const handleValidator = () => {
        for (const i of listFilter) {
            if (i.value === undefined || i.value === "" || i.value === null) {
                showError(tt("Nhập giá trị"));
                return false;
            }
        }
        return true;
    };

    const handleOnReset = () => {
        setListFilter([
            {
                id: makeid("10"),
                field: "",
                cond: "",
                value: "",
            },
        ]);
    };

    const handleOnPressSubmit = () => {
        if (handleValidator()) {
            onSubmit({ filter: listFilter });
            handleOnReset();
        }
    };

    const controlItem = (item) => (
        <div className="flex flex-1 justify-between mt-1.5">
            <span style={{ fontStyle: "italic", color: "slategray" }}>
                {tt("hoặc")}
            </span>
            <div>
                <DeleteFilled
                    className="cursor-pointer"
                    onClick={handleOnClickDelete(item)}
                />
            </div>
        </div>
    );

    const renderList = () =>
        listFilter.map((item, index) => (
            <div key={`dynamic_item_${item.id}`}>
                {index !== 0 && controlItem(item, index)}
                <FilterDynamicItem listField={listField} item={item} />
            </div>
        ));

    return (
        <div
            style={{ width: "210px", maxHeight: "40vh" }}
            className="no-scroll-bar"
        >
            {renderList()}
            <div style={{ marginTop: "10px" }}>
                <Button
                    type="primary"
                    style={{ marginRight: "10px" }}
                    className="ant-button-custom-height"
                    onClick={handleOnPressSubmit}
                >
                    {tt("Áp dụng")}
                </Button>
                <Button
                    className="ant-button-custom-height"
                    icon={<PlusCircleOutlined />}
                    onClick={handleOnClickAddFilter}
                >
                    {tt("Thêm điều kiện")}
                </Button>
            </div>
        </div>
    );
}

export default ContentFilterDynamic;
