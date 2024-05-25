import React from "react";
// import {tt} from "../utils";
import {useTranslation} from "react-i18next";

const Slogan = ({data}) => {
	const { t } = useTranslation();
	const tt = t
	return (
		<div className={"mt-[50px] mb-[100px] flex flex-col items-center justify-center"}>
			<p className="font-lato font-bold text-[28px] text-[#c86b2e]">{data?.slogan || tt('Slogan TVP')}</p>
			<span className={'mt-[25px] font-lato text-[20px] text-center pl-6 pr-6'}>
				{data?.slogan_detail || 'TVP'}</span>
		</div>
	)
}

export default Slogan
