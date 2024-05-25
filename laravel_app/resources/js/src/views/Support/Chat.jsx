import React, { useEffect, useState } from "react";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import axios from "axios";
import { generateUrl } from "../../utils/function";
import { showError } from "../../components/dialogs";
import { clog, tt } from "../../utils";

function Chat({ item }) {
    const [data, setData] = useState(null);
    // const [disabledSend, setDisabledSend] = useState(false);

    const handleFetchData = () => {
        const dataToSend = {
            term: [],
            with: [],
            page: 1,
            limit: 2000,
            filter: {
                object_id: item.id,
                object_type: "supports",
            },
            order_by: "created_at",
            sort: "asc",
        };
        const config = {
            headers: {
                Authorization: `Bearer ${
                    document.getElementById("myToken")?.value
                }`,
            },
        };

        return axios
            .post(
                generateUrl("api/cmsService/v1/user_comments/search"),
                dataToSend,
                config
            )
            .then((res) => res.data)
            .then((data) => {
                if (data.success === false) {
                    return showError(data.error);
                }
                setData(data.data);
            })
            .catch((error) => {
                showError(
                    tt("Không thể thực hiện ngay lúc này, vui lòng thử lại sau")
                );
            });
    };

    useEffect(() => {
        setData([]);
        handleFetchData();
    }, [item]);

    const handleSendMessage = (newMessage) => {
        const dataToSend = {
            object_id: item.id,
            object_type: "supports",
            message: newMessage,
        };
        const config = {
            headers: {
                Authorization: `Bearer ${
                    document.getElementById("myToken")?.value
                }`,
            },
        };

        return axios
            .post(
                generateUrl("api/cmsService/v1/user_comments/sendMessage"),
                dataToSend,
                config
            )
            .then((res) => res.data)
            .then((data) => {
                if (data.success === false) {
                    return showError(data.error);
                }
                handleFetchData();
            })
            .catch((error) => {
                showError(
                    tt("Không thể thực hiện ngay lúc này, vui lòng thử lại sau")
                );
            });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleFetchData();
        }, 10 * 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleOnSend = (newMessage) => {
        clog("sanitizeMessage(newMessage)", sanitizeMessage(newMessage));
        handleSendMessage(sanitizeMessage(newMessage));
    };

    const sanitizeMessage = (message) => {
        return message
            .replace(/&nbsp;/g, "")
            .replace(/<div>/g, "\n")
            .replace(/<br>/g, "\n")
            .replace(/<\/div>/g, "");
    };

    return (
        <div style={{ position: "relative", height: "500px" }}>
            <MainContainer>
                <ChatContainer>
                    <ConversationHeader>
                        <ConversationHeader.Content
                            userName={item.name || item.phone}
                            info={item.title}
                        />
                    </ConversationHeader>

                    <MessageList>
                        {/* <Message
                            model={{
                                message: item.content,
                                // sender: i.actor_name,
                                direction: "incoming",
                                position: "single",
                            }}
                            avatarSpacer
                        /> */}
                        {data &&
                            data.data &&
                            data.data.map((i, index) => {
                                if (i.actor_type !== "bots") {
                                    return (
                                        <Message
                                            model={{
                                                message: i.message,
                                                sender: i.actor_name,
                                                direction:
                                                    i.actor_type ===
                                                        "drivers" ||
                                                    i.actor_type ===
                                                        "passengers"
                                                        ? "incoming"
                                                        : "outgoing",
                                                position: "single",
                                            }}
                                            avatarSpacer
                                        />
                                    );
                                }
                            })}
                    </MessageList>
                    <MessageInput
                        disabled={item.status === 4}
                        attachButton={false}
                        placeholder={tt("Nhập nội dung...")}
                        onSend={handleOnSend}
                        onPaste={(e) => {
                            e.preventDefault();
                            const text = e.clipboardData
                                ? e.clipboardData.getData("text/plain")
                                : "";

                            if (
                                document.queryCommandSupported?.("insertText")
                            ) {
                                return document.execCommand(
                                    "insertText",
                                    false,
                                    text
                                );
                            }

                            const selection = document.getSelection();
                            if (!selection) return;
                            const range = selection.getRangeAt(0);
                            range.deleteContents();
                            range.insertNode(new Text(text));
                            range.collapse(); // select nothing
                            selection.removeAllRanges(); // position caret after inserted text
                            selection.addRange(range); // show caret
                        }}
                    />
                </ChatContainer>
            </MainContainer>
        </div>
    );
}

export default Chat;
