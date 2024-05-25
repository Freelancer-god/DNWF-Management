/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-shadow */
/* eslint-disable max-len */

import { Form, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { tt } from "../../../utils";
import { optionTypes, spinnerCreate } from "../../../store/ConfigAnswer";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import SelectWithSearch from "../../../components/SelectWithSearch/SelectWithSearch";
import { SurveyFormClipboard } from "./PlainClipboard";
import Delta from "quill-delta";

// Quill.register("modules/clipboard", SurveyFormClipboard, true);
//Text direction
Quill.register(Quill.import("attributors/style/direction"), true);
//Alignment
Quill.register(Quill.import("attributors/style/align"), true);

// Don't forget corresponding css
const Size = Quill.import("attributors/style/size");
Size.whitelist = ["0.75em", "1em", "1.5em", "2.5em"];
Quill.register(Size, true);
const Parchment = Quill.import("parchment");
class IndentAttributor extends Parchment.Attributor.Style {
    add(node, value) {
        if (value === 0) {
            this.remove(node);
            return true;
        } else {
            return super.add(node, `${value}em`);
        }
    }
}

let IndentStyle = new IndentAttributor("indent", "text-indent", {
    scope: Parchment.Scope.BLOCK,
    whitelist: ["1em", "2em", "3em", "4em", "5em", "6em", "7em", "8em", "9em"],
});
Quill.register(IndentStyle, true);

const modules = {
    // https://github.com/quilljs/quill/issues/2905#issuecomment-683128521
    clipboard: {
        matchVisual: false,
    },
    toolbar: [
        [
            { size: ["0.75em", "1em", "1.5em", "2.5em"] },
            "bold",
            "italic",
            "underline",
            { color: [] },
            { background: [] },
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
            "link",
        ],
    ],
};

function Create(props) {
    const { data, onChangeData, form } = props;
    const _spinner = useSelector(spinnerCreate);
    const _optionTypes = useSelector(optionTypes);
    const [options, setOptions] = useState(_optionTypes);
    const [_id, setId] = useState(data._id);
    const [_content, setContent] = useState(data._content);
    const [_questionId, setQuestionId] = useState(data._questionId);

    const handleOnChangeContent = (value) => {
        setContent(value);
    };
    useEffect(() => {
        if (data) {
            const { _id, _content, _questionId } = data;
            setId(_id);
            setContent(_content);
            setQuestionId(_questionId);
        }
    }, [data]);

    const dataToSend = {
        _content,
        _questionId,
    };

    useEffect(() => {
        // for control
        handleOnChangeData(dataToSend);
    }, [_id, _questionId, _content]);

    const handleOnChangeData = (dataToSend) => {
        onChangeData(dataToSend);
    };

    const validateMessages = {
        required: `${tt("Nhập")} ${"${label}"}`,
    };

    const config = {
        headers: {
            Authorization: `Bearer ${
                document.getElementById("myToken")?.value
            }`,
        },
    };

    const handleOnChangeSelectQuestion = (value, item) => {
        setQuestionId(value?.id);
    };

    const mapType = {
        1: {
            color: "blue",
            text: "APP KHÁCH HÀNG",
        },
        2: {
            color: "red",
            text: "APP TÀI XẾ",
        },
    };

    const handleFormatQuestionSearchData = (data) => {
        const array = [];
        for (const i of data) {
            array.push({
                id: i.id,
                value: i.id,
                label: `${i.title} (${mapType[i.type].text})`,
            });
        }
        return array;
    };

    useEffect(() => {
        // for form
        form.setFieldValue("_content", _content);
        form.setFieldValue("_questionId", _questionId);
        // for control
        handleOnChangeData(dataToSend);
    }, [_content, _questionId]);

    return (
        <div>
            <Spin tip={"Đang tải..."} size={"large"} spinning={_spinner}>
                <Form
                    labelCol={{ span: 8 }}
                    layout="horizontal"
                    form={form}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        className="mb-2"
                        label={tt("Câu hỏi")}
                        name="_questionId"
                        rules={[{ required: true }]}
                    >
                        <SelectWithSearch
                            // mode="multiple"
                            placeholder={tt("Chọn")}
                            // selected={_driverId}
                            onChangSelect={handleOnChangeSelectQuestion}
                            formatFunction={handleFormatQuestionSearchData}
                            API="api/cmsService/v1/questions/search"
                            filter={{ status: 1 }}
                            headers={config}
                        />
                    </Form.Item>
                    <Form.Item
                        // className="mb-2"
                        label={tt("Nội dung")}
                        name="_content"
                        rules={[{ required: true }]}
                    >
                        <ReactQuill
                            // modules={{
                            //     clipboard: {
                            //         matchers: [
                            //             [
                            //                 "B",
                            //                 function (node, delta) {
                            //                     debugger;
                            //                     return delta.compose(
                            //                         new Delta().retain(
                            //                             delta.length(),
                            //                             { bold: true }
                            //                         )
                            //                     );
                            //                 },
                            //             ],
                            //         ],
                            //     },
                            // }}
                            modules={modules}
                            theme={"snow"} // pass false to use minimal theme
                            className="h-[300px]"
                            value={_content}
                            onChange={handleOnChangeContent}
                        />
                    </Form.Item>
                </Form>
            </Spin>
        </div>
    );
}

export default Create;
