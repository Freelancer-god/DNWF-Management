// import {tt} from "../utils";
import React, {useState} from "react";
import {bannerSendFeedback, iconSendFBComment, iconSendFBMail, iconSendFBUser, iconSendFeedback} from "../assets";
import {message, Spin} from "antd";
import axios from 'axios';
import {useTranslation} from "react-i18next";

const SendFeedback = () => {
	const { t } = useTranslation();
	const tt = t
	const [user_name, set_user_name] = useState('')
	const [email, set_email] = useState('')
	const [content, set_content] = useState('')

	const [spinner, setSpinner] = useState(false)

	const handleChangeUsername = (e) => {
		let value = e.target.value
		set_user_name(value)
	}
	const handleChangeEmail = (e) => {
		let value = e.target.value
		set_email(value)
	}
	const handleChangeContent = (e) => {
		let value = e.target.value
		set_content(value)
	}

	function validateEmail(email) {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	}

	const handleOnSubmit = async () => {
		if (user_name === '') {
			message.error(tt('Vui lòng nhập Họ tên'));
			return
		}
		if (email === '') {
			message.error(tt('Vui lòng nhập Email'));
			return
		} else if (email !== '' && (validateEmail(email) === false)) {
			message.error(tt('Email không hợp lệ'));
			return
		}
		if (content === '') {
			message.error(tt('Vui lòng nhập Phản hồi'));
		}
		let dataToSend = {
			user_name,
			email,
			feedback:content
		}
		setSpinner(true)
		let data = await fetchSendFeedback(dataToSend)
		setSpinner(false)
		if (data) {
			message.success(tt('Cảm ơn bạn đã gửi phản hồi/đóng góp ý kiến cho chúng tôi.'));
		}

		set_user_name('')
		set_email('')
		set_content('')
	}

	const fetchSendFeedback = (dataToSend) => {
		return axios
			.post(`${window.location.protocol}//${window.location.hostname}/api/v1/user_feedbacks/createFeedbackWeb`, {data: dataToSend})
			.then((res) => res.data)
			.then((data) => {
				if (data.success === false) {
					message.error(data.error);
					return null;
				}
				return data.data;
			})
			.catch((error) => {
				message.error(tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'));
				return null;
			});
	};


	return (
		<div className={"mt-[50px] mb-[50px]"}>
			<div className={'flex flex-col w-full items-center'}>
				<div className={'relative'}>
					<svg width="276" height="58" viewBox="0 0 276 58" fill="none"
						 xmlns="http://www.w3.org/2000/svg">
						<path d="M1 1H275" stroke="#C86B2E" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M1 4.31055H275" stroke="#EF9D37" strokeLinecap="2" strokeLinejoin="round"/>
						<div></div>
						<path d="M274.99 57.1953H1" stroke="#C86B2E" strokeLinejoin="round"/>
						<path d="M274.99 53.8848H1" stroke="#EF9D37" strokeLinecap="2" strokeLinejoin="round"/>
					</svg>
					<div className={'absolute top-0 flex items-center justify-center w-[276px] h-[58px]'}>
						<span className={'font-lato text-[28px] text-[#764324]'}>{tt('Gửi phản hồi')}</span>
					</div>
				</div>
			</div>

			<div className={'mt-[83px] flex z-40'}>
				<div className={'flex md:flex-row flex-col md:justify-center flex-1 md:gap-[100px]'}>
					<div className={'md:flex hidden'}>
						<img src={bannerSendFeedback} alt={'send feedback'}/>
					</div>

					<div className={'flex flex-1 flex-col max-w-[470px] w-full self-center'}>
						<Spin spinning={spinner}>
							<div className={'box-input-feedback items-center flex flex-row'}>
								<div>
									<img src={iconSendFBUser} alt={'user'}/>
								</div>
								<input className={'input-feedback'} value={user_name} onChange={handleChangeUsername}
									   placeholder={tt('Họ tên')}/>
							</div>
							<div className={'box-input-feedback items-center flex flex-row mt-[20px]'}>
								<div>
									<img src={iconSendFBMail} alt={'email'}/>
								</div>
								<input className={'input-feedback '} value={email} onChange={handleChangeEmail}
									   placeholder={tt('Email')}/>
							</div>
							<div className={'box-input-feedback items-start flex flex-row mt-[20px]'}>
								<div>
									<img src={iconSendFBComment} alt={'user'}/>
								</div>
								<textarea className={'input-feedback '} value={content} onChange={handleChangeContent} rows={15}
										  placeholder={tt('Phản hồi')}/>
							</div>
							<div className={'flex items-end self-end flex-col mt-[20px]'}>
								<button onClick={handleOnSubmit}
										disabled={spinner}
										className={' button-send-feedback cursor-pointer flex flex-row items-center justify-center hover:bg-[#76432470] transition duration-300 ease-in-out'}>
									<img src={iconSendFeedback} alt={'SEND'} className={'mr-[10px]'}/>
									<span className={'font-lato text-[20px] text-[#fff]'}>{tt('Gửi')}</span>
								</button>
							</div>
						</Spin>
					</div>

				</div>
			</div>
		</div>
	)
}

export default SendFeedback
