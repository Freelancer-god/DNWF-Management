import React, {useState} from "react";
import styles from "../style";
import {FB, IG, logo, mail, phone, submitEmail, Tw} from "../assets";
import {footerLinks, tvpEmail, tvpPhone} from "../constants";
// import {tt} from "../utils";
import {useNavigate} from "react-router-dom";
import axios from "@nextcloud/axios";
import {message, Spin} from "antd";
import {throttleOnPressAction} from "../utils/throttle";
import {useTranslation} from "react-i18next";

function Footer() {
    const {t} = useTranslation();
    const tt = t

    const navigate = useNavigate();
    const hiddenNews = []
    const [email, setEmail] = useState('')
    const [spinner, setSpinner] = useState(false)

    const handleChangeEmail = (e) => {
        let value = e.target.value
        setEmail(value)
    }

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    const handleOnKeyDown = (event) => {
        if (event.key === 'Enter') {
            throttleOnPressAction(handleOnSubmit)
        }
    }

    const handleOnSubmit = async () => {
        if (email === '') {
            message.error(tt('Vui lòng nhập Email'));
            return
        } else if (email !== '' && (validateEmail(email) === false)) {
            message.error(tt('Email không hợp lệ'));
            return
        }

        let dataToSend = {
            email,
        }
        setSpinner(true)
        let data = await fetchSendFeedback(dataToSend)
        setSpinner(false)
        if (data) {
            message.success(tt('Cảm ơn bạn đã gửi yêu cầu nhận thông báo.'));
            setEmail('')
        }
    }

    const fetchSendFeedback = (dataToSend) => {
        return axios
            .post(`${window.location.protocol}//${window.location.hostname}/api/v1/email_notification/createWeb`, {data: dataToSend})
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
        <section className={`sm:px-10 px-6 ${styles.flexCenter} sm:py-8 py-6 flex-col bg-[#EF9D37]`}>
            <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full `}>
                {/* CHINH FOOTER CO HAI PHAN HO TRO NHIEU SCREEN SIZE NEU CO EDIT THI EDIT CA HAI */}
                <div
                    className="hidden ss:flex w-full flex-row justify-between flex-wrap md:mt-0 mt-10 ss:gap-[50px]  md:gap-[30px] z-10">
                    <div className=" flex flex-col justify-center items-center ">
                        <img
                            src={logo}
                            alt="DABI"
                            className="w-[100px] h-[80px] object-contain"
                        />
                        <div className="flex flex-row items-center mt-[32px]">
                            <img
                                src={phone}
                                alt="phone"
                                className="w-[13px] h-[20px] object-contain"
                            />
                            <a href="tel:0867897676">
								<span className="font-lato text-white font-normal text-[16px] leading-[19px] pl-[6px]">
									{tvpPhone}
								</span>
                            </a>
                        </div>
                        <div className="flex flex-row items-center mt-[5px]">
                            <img
                                src={mail}
                                alt="email"
                                className="w-[20px] h-[14px] object-contain"
                            />
                            <span className="font-lato text-white font-normal text-[16px] leading-[19px] pl-[6px]">
								{tvpEmail}
							</span>
                        </div>
                        <div className="flex flex-row gap-2 mt-[5px]">
                            <img
                                src={IG}
                                alt="instagram"
                                className="w-[27px] h-[27px] object-contain"
                            />
                            <img
                                src={FB}
                                alt="instagram"
                                className="w-[27px] h-[27px] object-contain"
                            />
                            <img
                                src={Tw}
                                alt="instagram"
                                className="w-[27px] h-[27px] object-contain"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col ss:my-0 sm:my-4 min-w-[150px]">
						<span
                            className={'mt-4 font-lato font-normal text-[16px] leading-[24px] text-dimWhite hover:text-white'}>{tt('Nhận thông báo')}</span>
                        <div className={'mt-[28px]'}>
                            <Spin spinning={spinner}>
                                <div className={'flex flex-row rounded-[8px] bg-white items-center pr-2'}>
                                    <input className={'input-footer'} value={email} onChange={handleChangeEmail}
                                           onKeyDown={handleOnKeyDown} placeholder={'Mail...'}/>
                                    <div
                                        className={'px-2 cursor-pointer hover:opacity-50 transition duration-300 ease-in-out'}
                                        onClick={handleOnSubmit}>
                                        <img src={submitEmail} alt={'send'} className={'w-[15px] h-[20px]'}/>
                                    </div>
                                </div>
                            </Spin>
                        </div>
                    </div>
                    {footerLinks.map((footerlink, index) => (
                        <div
                            key={footerlink.id + 'asdaaa' + index}
                            className="flex flex-col ss:my-0 sm:my-4 min-w-[150px]"
                        >
                            <ul className="list-none mt-4">
                                {footerlink?.links?.map((link, index) => (
                                    <li
                                        key={link.name + 'asd' + index}
                                        className={`font-lato font-normal text-[16px] leading-[24px] text-dimWhite hover:text-white cursor-pointer ${index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                                        }`}
                                    >
                                        {link.idBlog
                                            ? <a
                                                onClick={() => {
                                                    const news = hiddenNews.find((item) => {
                                                        return item.id === link.idBlog
                                                    })
                                                    navigate(`/news/${news.slug}`, {
                                                        state: {data: news},
                                                    });
                                                    window.scrollTo({top: 0, left: 0, behavior: "instant"})
                                                }}>{link.name}</a>
                                            : <a href={link.link}>{link.name}</a>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* MAN HINH DIEN THOAI */}
                <div
                    className="flex ss:hidden justify-between w-full flex-row md:mt-0 mt-10  z-10 max-[450px]:flex-col">
                    <div className="flex flex-col justify-start items-center ">
                        <img
                            src={logo}
                            alt="DABI"
                            className="w-[100px] h-[80px] object-contain"
                        />
                        <div className="flex flex-row items-center mt-[32px]">
                            <img
                                src={phone}
                                alt="phone"
                                className="w-[13px] h-[20px] object-contain"
                            />
                            <a href="tel:0867897676">
								<span className="font-lato text-white font-normal text-[16px] leading-[19px] pl-[6px]">
									{tvpPhone}
								</span>
                            </a>
                        </div>
                        <div className="flex flex-row items-center mt-[5px]">
                            <img
                                src={mail}
                                alt="email"
                                className="w-[20px] h-[14px] object-contain"
                            />
                            <span className="font-lato text-white font-normal text-[16px] leading-[19px] pl-[6px]">
								{tvpEmail}
							</span>
                        </div>
                        <div className="flex flex-row gap-2 mt-[5px]">
                            <img
                                src={IG}
                                alt="instagram"
                                className="w-[27px] h-[27px] object-contain"
                            />
                            <img
                                src={FB}
                                alt="instagram"
                                className="w-[27px] h-[27px] object-contain"
                            />
                            <img
                                src={Tw}
                                alt="instagram"
                                className="w-[27px] h-[27px] object-contain"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="flex flex-col ss:my-0 sm:my-4 items-center min-w-[150px] mb-[35px]">
							<span
                                className={'mt-4 font-lato font-normal text-[16px] leading-[24px] text-dimWhite hover:text-white'}>{tt('Nhận thông báo')}</span>
                            <div className={'mt-[28px]'}>
                                <Spin spinning={spinner}>
                                    <div className={'flex flex-row rounded-[8px] bg-white items-center pr-2'}>
                                        <input className={'input-footer'} onChange={handleChangeEmail}
                                               onKeyDown={handleOnKeyDown} placeholder={'Mail...'}/>
                                        <div className={'px-2 cursor-pointer'}>
                                            <img src={submitEmail} alt={'send'} onClick={handleOnSubmit}
                                                 className={'w-[15px] h-[20px]'}/>
                                        </div>
                                    </div>
                                </Spin>
                            </div>
                        </div>


                        {footerLinks.map((footerlink, myindex) => (
                            <div
                                key={footerlink.id + 'sadf4asd' + myindex}
                                className="flex flex-col ss:my-0 sm:my-4 items-center min-w-[150px]"
                            >
                                <ul className={`list-none ${myindex > 0 ? "mt-10" : ""}`}>
                                    {footerlink?.links?.map((link, index) => (
                                        <li
                                            key={link.name + 'asds212__' + index}
                                            className={`font-lato font-normal text-center text-[16px] leading-[24px] text-dimWhite hover:text-white cursor-pointer ${index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                                            }`}
                                        >
                                            {link.idBlog
                                                ? <a
                                                    onClick={() => {
                                                        const news = hiddenNews.find((item) => {
                                                            return item.id === link.idBlog
                                                        })
                                                        navigate(`/news/${news.slug}`, {
                                                            state: {data: news},
                                                        });
                                                        window.scrollTo({top: 0, left: 0, behavior: "instant"})
                                                    }}>{link.name}</a>
                                                : <a href={link.link}>{link.name}</a>}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div
                className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
                <p className="font-lato font-normal text-center text-[17px] leading-[27px] text-white w-full">
                    {`Copyright Ⓒ ${new Date().getFullYear()} TVP. All Rights Reserved.`}
                </p>
            </div>
        </section>
    );
}

export default Footer;
