import { Spin, Tooltip } from "antd";
import { formatPoint, formatterNumber } from "../../utils";

function Stats({ element, quantity, title, loading, isPoint = false }) {
	return (
		<div className="flex px-[8px] w-full ss:w-[50%] md:w-[25%]">
			<div className="flex flex-1 flex-col shadow-lg border-0 border-solid border-gray-200 px-[25px] py-[8px] bg-white rounded-lg min-h-[125px] mb-[20px]">
				{/* <div className="w-full float-left min-h-auto block shadow-lg border-0 border-solid border-gray-200 p-[8px] bg-white rounded-lg min-h-[125px] flex mb-[20px]"> */}
				<div className="flex">
					<div className="flex p-0 float-left my-2 ">
						<div>{element}</div>
					</div>
					<div className="p-0 w-full my-auto mx-[5px]">
						<p className={`m-0 ${isPoint ? 'text-[18px]' : 'text-[45px]'} float-left w-full leading-normal font-semibold text-gray-700 text-right text-24 font-normal`}>
							{
								isPoint ?
									(loading ? <Spin spinning /> : <Tooltip title={formatterNumber(quantity)}>{formatPoint(quantity)}</Tooltip>)
									:
									(loading ? <Spin spinning /> : quantity)}
						</p>
					</div>
				</div>
				<div>
					<p className="text-[16px] float-left w-full text-gray-500 font-light mt-0 text-right text-base">
						{title}
					</p>
				</div>
			</div>
		</div>
	);
}

export default Stats;
