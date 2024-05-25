import React from "react";
import styles from "../style";

function Stats() {
	//   const dataUsers = JSON.parse(loadState(APP_NAME, "statistic_user"));
	//   const dataClub = JSON.parse(loadState(APP_NAME, "statistic_store"));
	//   const dataPrize = JSON.parse(loadState(APP_NAME, "statistic_store"));

	//   const [totalUsers, setTotalUsers] = useState(dataUsers);
	//   const [totalClubs, setTotalClubs] = useState(dataClub);
	//   const [totalPrize, setTotalPrize] = useState(dataPrize);

	const stats = [
		{
			id: "stats-1",
			title: "Cơ thủ",
			value: `3800+`,
		},
		{
			id: "stats-2",
			title: "Câu lạc bộ",
			value: `105+`,
		},
		{
			id: "stats-3",
			title: "Giải thưởng",
			value: `2Tỷ+ VND`,
		},
	];

	return (
		<section
			className={`${styles.flexCenter} flex-col sm:flex-row sm:flex-wrap sm:mb-20 mb-6 relative z-10`}
		>
			{stats.map((stat) => (
				<div
					key={stat.id}
					className="flex-1 flex justify-start items-center flex-row m-3 "
				>
					<h4 className="font-inter font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-white">
						{stat.value}
					</h4>
					<p className="font-inter font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] text-gradient uppercase ml-3">
						{stat.title}
					</p>
				</div>
			))}
		</section>
	);
}

export default Stats;
