import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { generateUrl } from '../../../utils/function';

import Stats from './Stats';
import TableRequest from './TableRequest';
import { clog, tt } from '../../utils';

function Counter() {
	const [loadingTotalPrize, setLoadingTotalPrize] = useState(true);
	const [loadingTotalRequest, setLoadingTotalRequest] = useState(true);
	const [loadingTotalStore, setLoadingTotalStore] = useState(true);
	const [loadingPointDabi, setLoadingPointDabi] = useState(true);

	const [totalPrize, setTotalPrize] = useState(0);
	const [totalRequest, setTotalRequest] = useState(0);
	const [totalStore, setTotalStore] = useState(0);
	const [totalPoint, setTotalPoint] = useState(0);
	const [tableRequest, setTableRequest] = useState([]);

	const fetchStatsRequest = () => axios
		.post(generateUrl('/apps/wallets/api/v1/point_transfers/search'), {
			data: {
				term: [],
				filter: {
					type: 3,
					status: 1,
				},
				page: 1,
				limit: 999999,
				order: 'created_at',
				sort: 'desc',
			},
		})
		.then((res) => res.data)
		.then((data) => {
			if (data.success === false) {
				setLoadingTotalRequest(false);
				showError(data.error);
			}
			setLoadingTotalRequest(false);
			setTableRequest(data.data.data);
			setTotalRequest(data.data.total);
		})
		.catch((error) => {
			setLoadingTotalRequest(false);
			showError(tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'));
		});

	const fetchStatsChamp = () => axios
		.get(
			generateUrl('/apps/championships/api/v1/championships/statisticInfo'),
		)
		.then((res) => res.data)
		.then((data) => {
			if (data.success === false) {
				setLoadingTotalPrize(false);
				showError(data.error);
			}
			setLoadingTotalPrize(false);

			setTotalPrize(data.data.total);
		})
		.catch((error) => {
			setLoadingTotalPrize(false);
			showError(
				tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'),
			);
		});

	const fetchStatsStore = () => axios
		.get(generateUrl('/apps/dabi/api/v1/store/statisticInfo'))
		.then((res) => res.data)
		.then((data) => {
			if (data.success === false) {
				setLoadingTotalStore(false);
				showError(data.error);
				return null;
			}
			setLoadingTotalStore(false);

			setTotalStore(data.data.total);
			return data.data;
		})
		.catch((error) => {
			setLoadingTotalStore(false);
			showError(
				tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'),
			);
			return null;
		});

	const fetchStatsPointDabi = () => {
		const dataToSend = {
			data: {
				id: "dabiadmin",
				type: 99
			}
		}
		axios
			.post(generateUrl("/apps/wallets/api/v1/wallets/findPointByType"), dataToSend)
			.then((res) => res.data)
			.then((data) => {
				if (data.success === false) {
					setLoadingPointDabi(false);
					showError(data.error);
					return null;
				}
				setLoadingPointDabi(false);

				setTotalPoint(data.data.point);
				return data.data;
			})
			.catch((error) => {
				setLoadingPointDabi(false);
				showError(
					tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'),
				);
				return null;
			});
	}

	useEffect(() => {

		fetchStatsPointDabi();
		fetchStatsStore();
		fetchStatsRequest();
		fetchStatsChamp();

		const interval = setInterval(() => {
			setLoadingTotalPrize(true);
			setLoadingTotalRequest(true);
			setLoadingTotalStore(true);
			setLoadingPointDabi(true);
			fetchStatsPointDabi();
			fetchStatsStore();
			fetchStatsRequest();
			fetchStatsChamp();
		}, 5 * 60 * 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const handleOnUpdatedTable = (data) => {
		clog(data);
		setLoadingTotalRequest(true);
		fetchStatsRequest();
	};

	return (
		<>
			<div className="flex flex-col ss:flex-row ss:flex-wrap">
				<Stats
					element={
						<i className="fa fa-award text-green-500 text-5xl leading-normal w-full float-left text-center" />
					}
					quantity={totalPrize}
					title="Số giải thưởng đã phát"
					loading={loadingTotalPrize}
				/>
				<Stats
					element={
						<i className="fa fa-bell text-red-500 text-5xl leading-normal w-full float-left text-center" />
					}
					quantity={totalRequest}
					title="Yêu cầu đổi điểm"
					loading={loadingTotalRequest}
				/>
				<Stats
					element={
						<i className="fa fa-store text-5xl text-blue-500 leading-normal w-full float-left text-center" />
					}
					quantity={totalStore}
					title="Cửa hàng của DABI"
					loading={loadingTotalStore}
				/>

				<Stats
					element={
						<i className="fa fa-coins text-yellow-500 text-5xl leading-normal w-full float-left text-center" />
					}
					quantity={totalPoint}
					title="Ví DABI"
					loading={loadingPointDabi}
					isPoint
				/>
			</div>
			<div className="shadow-lg border-0 border-solid border-gray-200 bg-white overflow-x-auto w-full">
				<TableRequest
					data={tableRequest}
					loading={loadingPointDabi}
					onUpdated={handleOnUpdatedTable}
				/>
			</div>
		</>
	);
}

export default Counter;
