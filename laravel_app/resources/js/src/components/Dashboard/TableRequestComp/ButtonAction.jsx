import React, { useState } from "react";
import { Button, Modal } from "antd";
import axios from "@nextcloud/axios";
import { generateUrl } from "@nextcloud/router";
import { showError } from "../../components/dialogs";
import { clog, formatterNumber, tt } from "../../../utils";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { throttleOnPressAction } from "../../../hook/throttlePressAcion";
import CustomUpload from "../../Upload/CustomUpload";

const { confirm } = Modal;

function ButtonAction(props) {
	const { value, item } = props;
	const [loadingButton, setLoadingButton] = useState(false);
	const [disableButton, setDisableButton] = useState(false);
	const [isModalOpenUpload, setIsModalOpenUpload] = useState(false);
	const [cover, setCover] = useState(null);

	const handleOnPressConfirm = (item) => () => {
		setIsModalOpenUpload(true)
		// const s1 = formatterNumber(item?.point);
		// const s2 = item?.transfer_user.displayname;

		// confirm({
		// 	title: tt('Xác nhận phiếu chuyển điểm?'),
		// 	icon: <ExclamationCircleFilled />,
		// 	content: `${tt('Đổi')} ${s1} ${tt('cho người dùng')} "${s2}"`,
		// 	zIndex: 1050,
		// 	onOk() {
		// 		throttleOnPressAction(handleAcpt);
		// 	},
		// 	onCancel() { },
		// });
	};
	const handleOkUpLoad = (items) => {
		if (!cover || !cover.length > 0) {
			showError(tt('Vui lòng chọn hình ảnh'));
		} else {
			handleAcpt(items)
			setIsModalOpenUpload(false);
		}
	}

	const handleAcpt = () => {
		setLoadingButton(true);
		axios
			.post(generateUrl("/apps/wallets/api/v1/point_transfers/confirm"), {
				data: {
					id: item.id,
					status: 2,
					transfer_media: cover[0].id,
				},
			})
			.then((res) => res.data)
			.then((data) => {
				if (data.success === false) {
					setLoadingButton(false);
					showError(data.error);
					return null;
				}
				props.onUpdated(data.data);
				setLoadingButton(false);
			})
			.catch((error) => {
				setLoadingButton(false);
				showError(tt("Không thể thực hiện ngay lúc này, vui lòng thử lại sau"));
				return null;
			});
	};

	const handleOnChangeImage = (file, fileInfo) => {
		setCover(fileInfo);
	};

	const handleCancelUpload = () => {
		setIsModalOpenUpload(false);
	};

	return (
		<div>
			<Button
				key={item.id}
				type="primary"
				size="default"
				loading={loadingButton}
				onClick={handleOnPressConfirm(item)}
				disabled={disableButton}
			>
				{tt("Xác nhận")}
			</Button>
			<Modal
				title="Hình ảnh"
				open={isModalOpenUpload}
				onOk={()=>handleOkUpLoad(item)}
				onCancel={handleCancelUpload}
				zIndex={9999}

			>
				<CustomUpload onChangeImage={handleOnChangeImage} images={''} />
			</Modal>
		</div>
	);
}

export default ButtonAction;
