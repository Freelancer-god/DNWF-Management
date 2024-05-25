import axios from "axios";
import * as React from "react";
import AvatarEditor from "react-avatar-editor";
import * as ReactDOM from "react-dom";
import { PanViewer } from "react-image-pan-zoom-rotate";
import _debounce from "lodash/debounce";
import { placeholder } from "../assets";
import { generateUrl } from "../utils/function";
import { showError, showSuccess } from "./dialogs";
import { clog, tt } from "../utils";
import { Tooltip } from "antd";
const disableColor = "#ccc";
export function ImageEditor({
    image,
    isPublic,
    alt,
    ref,
    width = 240,
    height = 240,
    border = 5,
    color = [255, 255, 255, 0.6],
}) {
    const [dx, setDx] = React.useState(0);
    const [dy, setDy] = React.useState(0);
    const [zoom, setZoom] = React.useState(0.5);
    const [rotation, setRotation] = React.useState(0);
    const [counterRotation, setCounterRotation] = React.useState(0);
    const [flip, setFlip] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const editor = React.useRef(null);
    const [img, setImg] = React.useState(placeholder);
    const [imageUrl, setImageUrl] = React.useState(null);
    const [firstTimeLoad, setFirstTimeLoad] = React.useState(true);

    const rotationRef = React.useRef();

    // su dung debouce cua lodash de upload hinh
    // const handleDebounceFn = async () => {
    //     if (editor.current) {
    //         const dataUrl = editor.current.getImage().toDataURL();
    //         const res = await fetch(dataUrl);
    //         const blob = await res.blob();

    //         const fmData = new FormData();
    //         const config = {
    //             headers: {
    //                 "content-type": "multipart/form-data",
    //                 Authorization: `Bearer ${
    //                     document.getElementById("myToken")?.value
    //                 }`,
    //             },
    //         };
    //         fmData.append("file", blob);
    //         fmData.append("id", image?.id);

    //         try {
    //             const res = await axios.post(
    //                 generateUrl("api/cmsService/v1/media/replaceMedia"),
    //                 fmData,
    //                 config
    //             );

    //             if (res.data && res.data.success === true && res.data.data) {
    //                 showSuccess(tt("Đã cập nhật xoay ảnh thành công"));
    //             } else {
    //                 // showError(tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'));
    //             }
    //         } catch (err) {
    //             // showError(tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'));
    //             console.log(err);
    //         }

    //         // axios.post('/endpoint', {
    //         //   value: inputValue,
    //         // }).then((res) => {
    //         //   console.log(res.data);
    //         // });
    //     }
    // };
    const handleDebounceRotate = () => {
        setIsLoading(true);
        const dataToSend = {
            id: image?.id,
            rotate: rotation - counterRotation,
        };
        const config = {
            headers: {
                Authorization: `Bearer ${
                    document.getElementById("myToken")?.value
                }`,
            },
        };
        axios
            .post(
                generateUrl("api/cmsService/v1/media/rotateMedia"),
                dataToSend,
                config
            )
            .then((res) => res.data)
            .then((data) => {
                setIsLoading(false);
                if (data.success === true) {
                    showSuccess(tt("Đã cập nhật xoay ảnh thành công"));
                    setCounterRotation(rotation);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
            });
    };

    const debounceFn = React.useCallback(_debounce(handleDebounceRotate, 200), [
        rotation,
    ]);

    React.useEffect(() => {
        setFirstTimeLoad(false);
        if (firstTimeLoad) {
            axios
                .get(
                    image.path +
                        `${image.path.search("v=") >= 0 ? Math.random() : ""}`,
                    {
                        responseType: "arraybuffer",
                        headers: {
                            Authorization: `Bearer ${
                                document.getElementById("myToken")?.value
                            }`,
                        },
                    }
                )
                .then((response) => {
                    //   const u8 = new Uint8Array(response.data);
                    const b64encoded = btoa(
                        [].reduce.call(
                            new Uint8Array(response.data),
                            (p, c) => p + String.fromCharCode(c),
                            ""
                        )
                    );
                    const mimetype = "image/jpeg";
                    setImg(`data:${mimetype};base64,${b64encoded}`);
                    setRotation(0);
                });
        }
    }, [counterRotation]);

    const resetAll = () => {
        if (!isLoading) {
            setDx(0);
            setDy(0);
            setZoom(1);
            // setRotation(0);
            setFlip(false);
        }
    };
    const zoomIn = () => {
        if (!isLoading) {
            setZoom(zoom + 0.08);
        }
    };

    const zoomOut = () => {
        if (!isLoading) {
            if (zoom >= 0.3) {
                setZoom(zoom - 0.08);
            }
        }
    };

    const rotateLeft = () => {
        if (!isLoading) {
            let rotate = rotation - 90;
            if (rotate < -360) {
                setRotation(0);
            } else {
                setRotation(rotate);
            }
        }
    };
    const rotateRight = () => {
        if (!isLoading) {
            let rotate = rotation + 90;
            if (rotate > 360) {
                setRotation(0);
            } else {
                setRotation(rotate);
            }
        }
    };

    const flipImage = () => {
        setFlip(!flip);
    };

    const onPan = (dx, dy) => {
        setDx(dx);
        setDy(dy);
    };

    const getImageUrl = async () => {
        const dataUrl = editor.current.getImage().toDataURL();
        const res = await fetch(dataUrl);
        const blob = await res.blob();

        return window.URL.createObjectURL(blob);
    };

    const handleSaveRotate = () => {
        if (!isLoading) {
            if (editor.current && !firstTimeLoad) {
                debounceFn(imageUrl);
                // getImageUrl().then((url) => {
                //     setImageUrl(url);
                // });
            }
        }
    };

    React.useEffect(() => {}, []);

    return (
        <>
            <div
                style={{
                    position: "absolute",
                    right: "-5px",
                    zIndex: 2,
                    top: 10,
                    userSelect: "none",
                    borderRadius: 5,
                    background: "#fff",
                    boxShadow: "0px 2px 6px rgba(53, 67, 93, 0.32)",
                }}
            >
                <Tooltip title={tt("Phóng to")}>
                    <div
                        onClick={zoomIn}
                        style={{
                            textAlign: "center",
                            cursor: "pointer",
                            height: 40,
                            width: 40,
                            borderBottom: " 1px solid #ccc",
                        }}
                    >
                        <svg
                            style={{
                                height: "100%",
                                width: "100%",
                                padding: 10,
                                boxSizing: "border-box",
                            }}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4 12H20"
                                stroke={isLoading ? disableColor : "#4C68C1"}
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                d="M12 4L12 20"
                                stroke={isLoading ? disableColor : "#4C68C1"}
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                </Tooltip>
                <Tooltip title={tt("Thu nhỏ")}>
                    <div
                        onClick={zoomOut}
                        style={{
                            textAlign: "center",
                            cursor: "pointer",
                            height: 40,
                            width: 40,
                            borderBottom: " 1px solid #ccc",
                        }}
                    >
                        <svg
                            style={{
                                height: "100%",
                                width: "100%",
                                padding: 10,
                                boxSizing: "border-box",
                            }}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4 12H20"
                                stroke={isLoading ? disableColor : "#4C68C1"}
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                </Tooltip>
                <Tooltip title={tt("Xoay trái")}>
                    <div
                        onClick={rotateLeft}
                        style={{
                            textAlign: "center",
                            cursor: "pointer",
                            height: 40,
                            width: 40,
                            borderBottom: " 1px solid #ccc",
                        }}
                    >
                        <svg
                            style={{
                                height: "100%",
                                width: "100%",
                                padding: 10,
                                boxSizing: "border-box",
                            }}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14 15L9 20L4 15"
                                stroke={isLoading ? disableColor : "#4C68C1"}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20 4H13C10.7909 4 9 5.79086 9 8V20"
                                stroke={isLoading ? disableColor : "#4C68C1"}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </Tooltip>
                <Tooltip title={tt("Xoay phải")}>
                    <div
                        onClick={rotateRight}
                        style={{
                            textAlign: "center",
                            cursor: "pointer",
                            height: 40,
                            width: 40,
                            borderBottom: " 1px solid #ccc",
                        }}
                    >
                        <svg
                            style={{
                                transform: "scale(-1, 1)",
                                height: "100%",
                                width: "100%",
                                padding: 10,
                                boxSizing: "border-box",
                            }}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14 15L9 20L4 15"
                                stroke={isLoading ? disableColor : "#4C68C1"}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20 4H13C10.7909 4 9 5.79086 9 8V20"
                                stroke={isLoading ? disableColor : "#4C68C1"}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </Tooltip>
                <Tooltip title={tt("Cập nhật xoay hình ảnh")}>
                    <div
                        onClick={handleSaveRotate}
                        style={{
                            textAlign: "center",
                            cursor: "pointer",
                            height: 40,
                            width: 40,
                            borderBottom: " 1px solid #ccc",
                        }}
                    >
                        <svg
                            fill={isLoading ? disableColor : "#4C68C1"}
                            height="40"
                            width="40"
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="-256 -256 1024.00 1024.00"
                            xml:space="preserve"
                            stroke={isLoading ? disableColor : "#4C68C1"}
                            stroke-width="0.00512"
                        >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke="#CCCCCC"
                                stroke-width="3.072"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                {" "}
                                <g>
                                    {" "}
                                    <g>
                                        {" "}
                                        <path d="M440.125,0H0v512h512V71.875L440.125,0z M281.6,31.347h31.347v94.041H281.6V31.347z M136.359,31.347h113.894v125.388 h94.041V31.347h32.392v156.735H136.359V31.347z M417.959,480.653H94.041V344.816h323.918V480.653z M417.959,313.469H94.041 v-31.347h323.918V313.469z M480.653,480.653h-31.347V250.775H62.694v229.878H31.347V31.347h73.665v188.082h303.02V31.347h19.108 l53.512,53.512V480.653z"></path>{" "}
                                    </g>{" "}
                                </g>{" "}
                            </g>
                        </svg>
                    </div>
                </Tooltip>
                {/* <div
                    onClick={flipImage}
                    style={{
                        textAlign: "center",
                        cursor: "pointer",
                        height: 40,
                        width: 40,
                        borderBottom: " 1px solid #ccc",
                    }}
                >
                    <svg
                        style={{
                            height: "100%",
                            width: "100%",
                            padding: 10,
                            boxSizing: "border-box",
                        }}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                           stroke={isLoading ? disableColor : "#4C68C1"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.178,18.799V1.763L0,18.799H9.178z M8.517,18.136h-7.41l7.41-13.752V18.136z"
                        />
                        <polygon
                           stroke={isLoading ? disableColor : "#4C68C1"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            points="11.385,1.763 11.385,18.799 20.562,18.799 "
                        />
                    </svg>
                </div> */}
                <Tooltip title={tt("Reset")}>
                    <div
                        onClick={resetAll}
                        style={{
                            textAlign: "center",
                            cursor: "pointer",
                            height: 40,
                            width: 40,
                        }}
                    >
                        <svg
                            style={{
                                height: "100%",
                                width: "100%",
                                padding: 10,
                                boxSizing: "border-box",
                            }}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke={isLoading ? disableColor : "#4C68C1"}
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                    </div>
                </Tooltip>
            </div>

            <AvatarEditor
                ref={editor}
                image={img}
                width={width}
                height={height}
                border={border}
                color={color} // RGBA
                scale={zoom}
                rotate={rotation}

                // disableHiDPIScaling
                // disableBoundaryChecks
                // disableCanvasRotation
            />
            {/* <img src={imageUrl} /> */}
        </>
    );
}
