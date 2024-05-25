import React, { useState } from 'react';
import Spin from 'antd/lib/spin';
import { formatterNumber } from '../../utils';

function Ranking(props) {
	const [randomColors, setRandomColors] = useState([]);

	const {
		data, title, isPrize = false, loading,
	} = props;
	return (
		<Spin tip="Loading..." spinning={loading}>
			<div className="px-[10px] flex h-full text-[14px] min-h-[400px]">
				<div className="min-h-auto bg-white rounded-[5px] shadow-md float-left w-full mb-[15px]">
					<div className="float-left w-full">
						<div className="px-[10px] py-[1px] font-normal h-auto rounded-t-[10px] rounded-b-none bg-cover bg-[#00639a] relative ">
							<h3 className="text-center m-[5px]">
								<span className="text-white">
									<i className="fa fa-sitemap text-dark-500 text-md mr-[10px]" />
									{title}
								</span>
							</h3>
						</div>
						<div className="float-left w-full">
							<ul className="float-left list-none w-full">
								{data.map((item, i) => (
									<li
										className="px-[20px] py-[5px] border-b border-solid border-slate-300 leading-normal text-base border-l-5 float-left w-full flex relative"
										key={i}
									>
										{isPrize ? (
											''
										) : (
											<span className="my-2 mr-3">
												<img
													src={item.store.cover.path}
													className="w-[30px] h-[30px] rounded-full flex items-center border-none"
													alt="#"
												/>
											</span>
										)}
										<span>
											<span className="text-sm font-medium text-gray-700 float-left w-full mb-0 ">
												{isPrize ? item.prize.title : item.store.name}
												<br />
												<span className="text-xs font-light text-gray-400 mr-[20px] whitespace-nowrap ">
													{isPrize
														? `Tổng giải: ${formatterNumber(item.prize.total_prize)}đ`
														: item.store.address.address}
												</span>
												<span className="absolute right-[20px]">{item.total}</span>
											</span>
										</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</Spin>
	);
}

export default Ranking;
