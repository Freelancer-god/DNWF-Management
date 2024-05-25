import { Upload } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

import axios from "axios";

import { tt } from "../../utils";
import { showError } from "../dialogs";
import { generateUrl } from "../../utils/function";

function CustomUpload(props) {
	const { onChangeImage, images } = props;
	const [listFile, setListFile] = useState([]);
	const [infoUploadListFile, setInfoUploadListFile] = useState([]);

	const handleInitMedias = () => {
		if (!images) return [];
		const array = [];
		let uid = -1;
		for (const i of images) {
			array.push({
				uid,
				name: "cover",
				status: "done",
				url: i.mimeType
					? generateUrl(`/apps/media/getImage/${i.path}`)
					: generateUrl(i.path),
			});
			uid -= 1;
		}
		return array;
	};
	useEffect(() => {
		if (images) {
			setListFile(handleInitMedias());
			setInfoUploadListFile(images);
		} else {
			setListFile([]);
			setInfoUploadListFile([]);
		}
	}, [images]);

	useEffect(() => {
		onChangeImage(listFile, infoUploadListFile);
	}, [infoUploadListFile]);

	// upload
	const uploadImage = async (options) => {
		const { onSuccess, onError, file, onProgress } = options;

		const fmData = new FormData();
		const config = {
			headers: { "content-type": "multipart/form-data" },
			onUploadProgress: (event) => {
				const percent = Math.floor((event.loaded / event.total) * 100);
				onProgress({ percent });
			},
		};
		fmData.append("file", file);
		fmData.append("type", "1");
		if (props.mediaType) {
			fmData.append("media_type", props.mediaType);
		} else {
			fmData.append("media_type", "prizes");
		}

		try {
			const res = await axios.post(
				generateUrl("/apps/media/api/v1/media/postMedia"),
				fmData,
				config
			);
			onSuccess("Ok");
			if (res.data && res.data.success === true && res.data.data) {
				setInfoUploadListFile([res.data.data]);
				// if (infoUploadListFile.length < maxCount) {
				//   setInfoUploadListFile((prevState) => [...prevState, res.data.data]);
				// } else {
				//   setInfoUploadListFile((prevState) => {
				//     const copy = prevState.slice();
				//     copy[maxCount - 1] = res.data.data;
				//     return copy;
				//   });
				// }
			} else {
				showError(tt("Không thể thực hiện ngay lúc này, vui lòng thử lại sau"));
			}
		} catch (err) {
			onError({ err });
		}
	};

	// const handleFetchRemoveFile = async (index) => {
	//   const dataToSend = {
	//     id: infoUploadListFile[index].id,
	//   };
	//   const response = await axios.delete(
	//     generateUrl(`apps/media/api/v1/media/delete/${dataToSend.id}`),
	//   );
	//   if (response && response.success === true && response.data) {
	//     const newInfoUploadListFile = infoUploadListFile.slice();
	//     newInfoUploadListFile.splice(index, 1);
	//     setInfoUploadListFile(newInfoUploadListFile);
	//   } else if (response && response.success === false) {
	//     const { error } = response;
	//   } else {
	//
	//   }
	// };

	const handleOnRemove = (file) => {
		const index = listFile.indexOf(file);
		const newFileList = listFile.slice();
		newFileList.splice(index, 1);
		setListFile(newFileList);

		// Remove
		const newInfoUploadListFile = infoUploadListFile.slice();
		newInfoUploadListFile.splice(index, 1);
		setInfoUploadListFile(newInfoUploadListFile);
		// Delete
		// handleFetchRemoveFile(index);
	};

	const handleOnChange = (info) => {
		if (info.file.status === "uploading") {
			setListFile([info.file]);
		}

		if (info.file.status === "done") {
			setListFile([info.file]);
		}
	};

	// const beforeUpload = (file) => {
	//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	//   if (!isJpgOrPng) {
	//     showError(tt('You can only upload JPG/PNG file!'));
	//   }
	//   const isLt2M = file.size / 1024 / 1024 < 2;
	//   if (!isLt2M) {
	//     showError(tt('Image must smaller than 2MB!'));
	//   }
	//   return isJpgOrPng && isLt2M;
	// };
	// const getBase64 = (img, callback) => {
	//   const reader = new FileReader();
	//   reader.addEventListener('load', () => callback(reader.result));
	//   reader.readAsDataURL(img);
	// };

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>{tt("Chọn")}</div>
		</div>
	);

	return (
		<Upload
			name="avatar"
			listType="picture-card"
			className="avatar-uploader"
			accept={"image/*"}
			customRequest={uploadImage}
			fileList={listFile}
			onChange={handleOnChange}
			onRemove={handleOnRemove}
			maxCount={1}
		>
			{uploadButton}
		</Upload>
	);
}

export default CustomUpload;
