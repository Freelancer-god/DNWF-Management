import React, { useEffect, useMemo, useRef, useState } from "react";
import { Select } from "antd";
import debounce from "lodash/debounce";

import axios from "axios";
import _ from "lodash";
import CustomEmpty from "../CustomEmpty";
import { clog, trueTypeOf } from "../../utils";
import { generateUrl } from "../../utils/function";

function DebounceSelect({
    onChangeValue,
    fetchOptions,
    debounceTimeout = 800,
    ...props
}) {
    const [fetching, setFetching] = useState(true);
    const [search, setSearch] = useState("");
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0);

    const handleChangeSearch = (value) => {
        setSearch(value);
    };

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setFetching(true);
            fetchOptions(value).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return;
                }
                setOptions(newOptions);
                setFetching(false);
            });
        };
        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);
    useEffect(() => {
        debounceFetcher(search);
    }, [search, props.api]);
    useEffect(() => {
        setOptions([]);
    }, [props.api]);

    const filterRef = useRef(null);
    useEffect(() => {
        if (
            props.filter &&
            filterRef.current &&
            _.isEqual(props.filter, filterRef.current) === true
        ) {
        } else {
            filterRef.current = props.filter;
        }
    }, [props.filter]);
    useEffect(() => {
        setOptions([]);
        if (search === "") {
            debounceFetcher("");
        } else {
            setSearch("");
        }
    }, [filterRef.current]);
    clog("filterRef.current", options);
    return (
        <Select
            showSearch
            filterOption={false}
            autoClearSearchValue={false}
            searchValue={search}
            onSearch={handleChangeSearch}
            loading={fetching}
            notFoundContent={<CustomEmpty />}
            {...props}
            options={options}
        />
    );
}

function SelectWithSearch({
    selected,
    onChangSelect,
    formatFunction,
    API,
    apiMethod = "POST",
    ...props
}) {
    const parseValue = () => {
        if (selected) {
            if (props.mode === "multiple") {
                if (trueTypeOf(selected) === "array") {
                    return selected;
                }
                return [];
            }
            if (trueTypeOf(selected) === "object") {
                return selected;
            }
            return null;
        }
        return props.mode === "multiple" ? [] : null;
    };

    const [value, setValue] = useState(parseValue());
    const [firstTime, setFirstTime] = useState(true);
    const [firstTimeEffect_API, setFirstTimeEffect_API] = useState(true);

    useEffect(() => {
        onChangSelect(value);
    }, [value]);

    const handleFormatData = (data) => {
        const array = [];
        for (const i of data) {
            array.push({
                id: i.id,
                value: i.id,
                label: i.name || i.title || i.label,
            });
        }
        return array;
    };
    const fetchListPOST = (search) =>
        axios
            .post(
                generateUrl(API),
                {
                    term: search,
                    filter: props.filter ? props.filter : {},
                    page: 1,
                    limit: 15,
                    with: [],
                },
                props.headers ? props.headers : null
            )
            .then((res) => res.data)
            .then((data) => {
                if (data.success === false) {
                    return null;
                }
                return formatFunction
                    ? formatFunction(data.data.data)
                    : handleFormatData(data.data.data);
            })
            .catch((error) => null);
    const fetchListGET = () =>
        axios
            .get(generateUrl(API))
            .then((res) => res.data)
            .then((data) => {
                if (data.success === false) {
                    return null;
                }
                return formatFunction
                    ? formatFunction(data.data.data)
                    : handleFormatData(data.data.data);
            })
            .catch((error) => null);
    const fetchList = (search) =>
        apiMethod === "GET" ? fetchListGET() : fetchListPOST(search);
    const handleOnSelect = (value, option) => {
        if (props.mode === ("multiple" || "tags")) {
            let copy = parseValue().slice();
            const index = copy.findIndex((obj) => obj.value === value);
            if (index === -1) {
                copy = [...copy, option];
            }
            setValue(copy);
        } else {
            setValue(option);
        }
    };
    const handleOnDeselect = (value, option) => {
        if (props.mode === ("multiple" || "tags")) {
            const copy = parseValue().slice();
            const index = copy.findIndex((obj) => obj.value === value);
            if (index !== -1) {
                copy.splice(index, 1);
            }
            setValue(copy);
        } else {
            setValue(null);
        }
    };
    const handleOnClear = () => {
        if (props.mode === ("multiple" || "tags")) {
            setValue([]);
        } else {
            setValue(null);
        }
    };

    const filterRef = useRef(null);
    useEffect(() => {
        if (
            props.filter &&
            filterRef.current &&
            _.isEqual(props.filter, filterRef.current) === true
        ) {
        } else {
            filterRef.current = props.filter;
        }
    }, [props.filter]);

    useEffect(() => {
        if (firstTime === false) {
            clog("filter", filterRef.current);
            if (props.mode === "multiple") {
                if (value.length > 0) {
                    setValue([]);
                }
            } else if (value !== null) {
                setValue(null);
            }
        }
        if (firstTime === true) {
            setTimeout(() => {
                setFirstTime(false);
            }, 100);
        }
    }, [filterRef.current]);

    useEffect(() => {
        if (firstTimeEffect_API === false) {
            setValue(null);
        }
        setFirstTimeEffect_API(false);
    }, [API]);

    return (
        <DebounceSelect
            value={value}
            fetchOptions={fetchList}
            onSelect={handleOnSelect}
            onDeselect={handleOnDeselect}
            allowClear={props.mode !== ("multiple" || "tags")}
            onClear={handleOnClear}
            api={API}
            style={{
                width: "100%",
            }}
            {...props}
        />
    );
}

export default SelectWithSearch;
