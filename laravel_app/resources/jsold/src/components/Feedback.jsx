import React from "react";
// import {tt} from "../utils";
import {avatar1, avatar2, avatar3, avatar4, feedbackBG, feedbackBG2, feedbackStarActive} from "../assets";
import {useTranslation} from "react-i18next";


const Feedback = () => {
    const {t} = useTranslation();
    const tt = t

    const FEEDBACK_CONTENT = [
        {
            title: 'Lorem Ipsum',
            avatar: avatar1,
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
            star: 5
        },
        {
            title: 'Lorem Ipsum',
            avatar: avatar2,
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
            star: 5
        },
        {
            title: 'Lorem Ipsum',
            avatar: avatar3,
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
            star: 5
        },
        {
            title: 'Lorem Ipsum',
            avatar: avatar4,
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
            star: 5
        },
    ]

    const itemFB = (bg = feedbackBG2, item) => {
        return (
            <div className={'relative'}>
                <img src={bg} alt={'feedback bg'} className={'w-full h-auto max-w-[528px]'}/>
                <div className={'absolute top-0 h-full flex flex-row items-center max-w-[528px]'}>
                    <div className={'mb-[30px] flex flex-row px-[18px] items-center'}>
                        <div>
                            <img src={item.avatar}
                                 className={'max-[500px]:w-[48px] max-[500px]:h-[48px] w-[78px] h-[78px]'}/>
                        </div>
                        <div className={'ml-[20px]'}>
                            <div className={'flex flex-row items-center'}>
                                <div>
                                    <span className={'feedback-name'}>{item.title}</span>
                                </div>
                                <div className={'ml-[12px]'}>
                                    <div className={'flex flex-row bg-white rounded-[10px] px-[8px] py-[4px]'}>
                                        <img src={feedbackStarActive} alt={'star'}
                                             className={'max-[500px]:w-[13px] max-[500px]:h-[12px] max-[500px]:px-[1px] w-[23px] h-[22px] px-[3px]'}/>
                                        <img src={feedbackStarActive} alt={'star'}
                                             className={'max-[500px]:w-[13px] max-[500px]:h-[12px] max-[500px]:px-[1px] w-[23px] h-[22px] px-[3px]'}/>
                                        <img src={feedbackStarActive} alt={'star'}
                                             className={'max-[500px]:w-[13px] max-[500px]:h-[12px] max-[500px]:px-[1px] w-[23px] h-[22px] px-[3px]'}/>
                                        <img src={feedbackStarActive} alt={'star'}
                                             className={'max-[500px]:w-[13px] max-[500px]:h-[12px] max-[500px]:px-[1px] w-[23px] h-[22px] px-[3px]'}/>
                                        <img src={feedbackStarActive} alt={'star'}
                                             className={'max-[500px]:w-[13px] max-[500px]:h-[12px] max-[500px]:px-[1px] w-[23px] h-[22px] px-[3px]'}/>
                                    </div>
                                </div>
                            </div>
                            <div className={'mt-[12px]'}>
                                <span className={'feedback-content'}>{item.content}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={"mt-[50px] mb-[50px]"}>

            <div
                className={'flex min-[1160px]:flex-row flex-col md:justify-center min-[1160px]:items-start items-center'}>
                <div className={'flex flex-col items-start '}>
                    <div className={'relative'}>
                        <svg width="139" height="58" viewBox="0 0 139 58" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1H138" stroke="#C86B2E" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1 4.31055H138" stroke="#EF9D37" strokeLinecap="2" strokeLinejoin="round"/>
                            <div></div>
                            <path d="M137.99 57.1953H1" stroke="#C86B2E" strokeLinejoin="round"/>
                            <path d="M137.99 53.8848H1" stroke="#EF9D37" strokeLinecap="2" strokeLinejoin="round"/>
                        </svg>
                        <div className={'absolute top-0 flex items-center justify-center w-[139px] h-[58px]'}>
                            <span className={'font-lato text-[28px] text-[#764324]'}>{tt('Phản hồi')}</span>
                        </div>
                    </div>
                    <div className={'mt-[50px]'}>
                        {itemFB(feedbackBG2, FEEDBACK_CONTENT[1])}
                    </div>
                    <div className={'min-[1160px]:hidden max-[1160px]:mt-[20px] mt-[50px]'}>
                        {itemFB(feedbackBG, FEEDBACK_CONTENT[0])}
                    </div>
                    <div className={'max-[1160px]:mt-[20px] mt-[100px]'}>
                        {itemFB(feedbackBG2, FEEDBACK_CONTENT[3])}
                    </div>
                    <div className={'min-[1160px]:hidden max-[1160px]:mt-[20px] mt-[100px]'}>
                        {itemFB(feedbackBG, FEEDBACK_CONTENT[2])}
                    </div>
                </div>
                <div
                    className={'max-[1160px]:hidden max-[1160px]:mt-[20px] max-[1160px]:items-center flex flex-col items-start'}>
                    <div className={''}>
                        {itemFB(feedbackBG2, FEEDBACK_CONTENT[0])}
                    </div>
                    <div className={'max-[1160px]:mt-[20px] mt-[100px]'}>
                        {itemFB(feedbackBG, FEEDBACK_CONTENT[2])}
                    </div>
                </div>
            </div>


            {/*<div className={'flex min-[1160px]:flex-row flex-col md:justify-center md:items-start items-center'}>*/}
            {/*	<div className={'flex flex-col items-start max-[1160px]:items-center'}>*/}
            {/*		<div className={'relative'}>*/}
            {/*			<svg width="139" height="58" viewBox="0 0 139 58" fill="none"*/}
            {/*				 xmlns="http://www.w3.org/2000/svg">*/}
            {/*				<path d="M1 1H138" stroke="#C86B2E" strokeLinecap="round" strokeLinejoin="round"/>*/}
            {/*				<path d="M1 4.31055H138" stroke="#EF9D37" strokeLinecap="2" strokeLinejoin="round"/>*/}
            {/*				<div></div>*/}
            {/*				<path d="M137.99 57.1953H1" stroke="#C86B2E" strokeLinejoin="round"/>*/}
            {/*				<path d="M137.99 53.8848H1" stroke="#EF9D37" strokeLinecap="2" strokeLinejoin="round"/>*/}
            {/*			</svg>*/}
            {/*			<div className={'absolute top-0 flex items-center justify-center w-[139px] h-[58px]'}>*/}
            {/*				<span className={'font-lato text-[28px] text-[#764324]'}>{tt('Phản hồi')}</span>*/}
            {/*			</div>*/}
            {/*		</div>*/}
            {/*		<img src={feedbackFull} alt={'feedback'} className={'w-full max-w-[528px] h-auto mt-[50px]'}/>*/}
            {/*		<img src={feedbackFull2} alt={'feedback'} className={'min-[1160px]:hidden w-full max-w-[528px] h-auto max-[1160px]:mt-[20px] mt-[50px]'}/>*/}
            {/*		<img src={feedbackFull} alt={'feedback'} className={'w-full max-w-[528px] h-auto max-[1160px]:mt-[20px] mt-[100px]'}/>*/}
            {/*		<img src={feedbackFull2} alt={'feedback'} className={'min-[1160px]:hidden w-full max-w-[528px] h-auto max-[1160px]:mt-[20px] mt-[100px]'}/>*/}
            {/*	</div>*/}
            {/*	<div className={'max-[1160px]:hidden max-[1160px]:mt-[20px] max-[1160px]:items-center flex flex-col items-start'}>*/}
            {/*		<img src={feedbackFull2} alt={'feedback'} className={'w-full max-w-[528px] h-auto'}/>*/}
            {/*		<img src={feedbackFull2} alt={'feedback'} className={'w-full max-w-[528px] h-auto max-[1160px]:mt-[20px] mt-[100px]'}/>*/}
            {/*	</div>*/}
            {/*</div>*/}

        </div>
    )
}

export default Feedback
