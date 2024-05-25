import React from "react";
// import {tt} from "../utils";
import {logoNAKHARAT, logoNEO, logoTREX} from "../assets";
import useIs500 from "../hook/useIs500";
import {useTranslation} from "react-i18next";

const DevelopmentProcess = () => {
	const { t } = useTranslation();
	const tt = t

	const is500 = useIs500()

	return (
		<div className={"mt-[50px] mb-[50px]"}>
			<div className={'flex flex-col w-full sm:items-center items-start'}>
				<div className={'relative'}>
					<svg width="269" height="58" viewBox="0 0 269 58" fill="none"
						 xmlns="http://www.w3.org/2000/svg">
						<path d="M1 1H268" stroke="#C86B2E" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M1 4.31055H268" stroke="#EF9D37" strokeLinecap="2" strokeLinejoin="round"/>
						<div></div>
						<path d="M267.99 57.1953H1" stroke="#C86B2E" strokeLinejoin="round"/>
						<path d="M267.99 53.8848H1" stroke="#EF9D37" strokeLinecap="2" strokeLinejoin="round"/>
					</svg>
					<div className={'absolute top-0 flex items-center justify-center w-[269px] h-[58px]'}>
						<span className={'font-lato text-[28px] text-[#764324]'}>{tt('Quá trình phát triển')}</span>
					</div>
				</div>
			</div>

			<div className={'mt-[80px] flex flex-col items-center'}>
				<div className={'flex flex-row'}>

					<div className={'mr-[15px] max-[992px]:hidden'}>
						<div className={'mt-[80px] dev-year-box ml-[31px] mr-[51px]'}>
							<div className={'dev-year-box-inner bg-[#764324]'}/>
							<div className={'pl-[39px] pr-[39px] pt-[8px] pb-[8px] relative'}>
								<span
									className={'dev-year-box-label'}>{'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod'}</span>

								<div className={'absolute top-0 h-full left-[-39px]'}>
									<div className={'flex flex-col justify-center h-full'}>
										<img src={logoNAKHARAT} alt={'logo'} className={'dev-year-box-logo'}/>
									</div>
								</div>

								<div className={'absolute top-0 h-full right-[-49px]'}>
									<div className={' h-full flex flex-col justify-center'}>
										<div className={'relative flex flex-col justify-center'}>
											<svg width="90" height="30" viewBox="0 0 90 30" fill="none"
												 xmlns="http://www.w3.org/2000/svg">
												<path
													d="M88.2846 17.0397C89.539 15.8558 89.5391 13.8604 88.2848 12.6763L79.3561 4.24813C76.8531 1.89066 73.5445 0.577921 70.1061 0.578125L13.8061 0.578125C10.213 0.588677 6.7701 2.0207 4.22939 4.56141C1.68868 7.10212 0.256654 10.545 0.246101 14.1381L0.246101 15.5781C0.254016 19.173 1.68488 22.6184 4.22587 25.1613C6.76687 27.7042 10.2113 29.1376 13.8061 29.1481H70.1061C71.9013 29.1469 73.6784 28.7881 75.3335 28.0928C76.9886 27.3974 78.4886 26.3794 79.7461 25.0981L88.2846 17.0397Z"
													fill="#764324"/>
											</svg>
											<div
												className={'absolute w-full h-full flex flex-col justify-center right-[-101px]'}>
												<svg width="16" height="10" viewBox="0 0 16 10" fill="none"
													 xmlns="http://www.w3.org/2000/svg">
													<path
														d="M14.4935 2.70791C15.5835 1.41791 15.0935 0.35791 13.4035 0.35791H1.67347C0.003474 0.35791 -0.506526 1.41791 0.583474 2.70791L5.58347 8.61791C5.81876 8.92485 6.12154 9.17352 6.46835 9.34466C6.81517 9.5158 7.19673 9.60481 7.58347 9.60481C7.97022 9.60481 8.35178 9.5158 8.69859 9.34466C9.04541 9.17352 9.34819 8.92485 9.58347 8.61791L14.4935 2.70791Z"
														fill="#764324"/>
												</svg>
											</div>
											<div
												className={'absolute w-full h-full flex flex-col justify-center items-center'}>
												<span className={'dev-year-box-label-year'}>{'2019'}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className={'mt-[80px] dev-year-box ml-[31px] mr-[51px]'}>
							<div className={'dev-year-box-inner bg-[#EF9D37]'}/>
							<div className={'pl-[39px] pr-[39px] pt-[8px] pb-[8px] relative'}>
								<span
									className={'dev-year-box-label'}>{'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod'}</span>

								<div className={'absolute top-0 h-full left-[-39px]'}>
									<div className={'flex flex-col justify-center h-full'}>
										<img src={logoNEO} alt={'logo'} className={'dev-year-box-logo'}/>
									</div>
								</div>

								<div className={'absolute top-0 h-full right-[-49px]'}>
									<div className={' h-full flex flex-col justify-center'}>
										<div className={'relative flex flex-col justify-center'}>
											<svg width="90" height="30" viewBox="0 0 90 30" fill="none"
												 xmlns="http://www.w3.org/2000/svg">
												<path
													d="M88.2846 17.0397C89.539 15.8558 89.5391 13.8604 88.2848 12.6763L79.3561 4.24813C76.8531 1.89066 73.5445 0.577921 70.1061 0.578125L13.8061 0.578125C10.213 0.588677 6.7701 2.0207 4.22939 4.56141C1.68868 7.10212 0.256654 10.545 0.246101 14.1381L0.246101 15.5781C0.254016 19.173 1.68488 22.6184 4.22587 25.1613C6.76687 27.7042 10.2113 29.1376 13.8061 29.1481H70.1061C71.9013 29.1469 73.6784 28.7881 75.3335 28.0928C76.9886 27.3974 78.4886 26.3794 79.7461 25.0981L88.2846 17.0397Z"
													fill="#EF9D37"/>
											</svg>
											<div
												className={'absolute w-full h-full flex flex-col justify-center right-[-101px]'}>
												<svg width="16" height="10" viewBox="0 0 16 10" fill="none"
													 xmlns="http://www.w3.org/2000/svg">
													<path
														d="M14.4935 2.70791C15.5835 1.41791 15.0935 0.35791 13.4035 0.35791H1.67347C0.003474 0.35791 -0.506526 1.41791 0.583474 2.70791L5.58347 8.61791C5.81876 8.92485 6.12154 9.17352 6.46835 9.34466C6.81517 9.5158 7.19673 9.60481 7.58347 9.60481C7.97022 9.60481 8.35178 9.5158 8.69859 9.34466C9.04541 9.17352 9.34819 8.92485 9.58347 8.61791L14.4935 2.70791Z"
														fill="#EF9D37"/>
												</svg>
											</div>
											<div
												className={'absolute w-full h-full flex flex-col justify-center items-center'}>
												<span className={'dev-year-box-label-year'}>{'2021'}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className={'dev-line-center min-[992px]:h-[430px] h-full'}/>

					<div className={'ml-[15px]'}>
						<div className={'dev-year-box max-[500px]:ml-[42px] ml-[61px] mr-[19px]'}>
							<div className={'dev-year-box-inner bg-[#EF9D37]'}/>
							<div className={'pl-[39px] pr-[39px] pt-[8px] pb-[8px] relative'}>
								<span
									className={'dev-year-box-label'}>{'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod'}</span>

								<div className={'absolute top-0 h-full right-[-39px] max-[992px]:right-[-25px]'}>
									<div className={'flex flex-col justify-center h-full'}>
										<img src={logoNEO} alt={'logo'} className={'dev-year-box-logo'}/>
									</div>
								</div>

								<div className={'absolute top-0 h-full max-[500px]:left-[-40px] left-[-59px]'}>
									<div className={' h-full flex flex-col justify-center'}>
										<div className={'relative flex flex-col justify-center'}>
											{!is500 ?
												<svg width="90" height="30" viewBox="0 0 90 30" fill="none"
													 xmlns="http://www.w3.org/2000/svg" className={'rotate-180'}>
													<path
														d="M88.2846 17.0397C89.539 15.8558 89.5391 13.8604 88.2848 12.6763L79.3561 4.24813C76.8531 1.89066 73.5445 0.577921 70.1061 0.578125L13.8061 0.578125C10.213 0.588677 6.7701 2.0207 4.22939 4.56141C1.68868 7.10212 0.256654 10.545 0.246101 14.1381L0.246101 15.5781C0.254016 19.173 1.68488 22.6184 4.22587 25.1613C6.76687 27.7042 10.2113 29.1376 13.8061 29.1481H70.1061C71.9013 29.1469 73.6784 28.7881 75.3335 28.0928C76.9886 27.3974 78.4886 26.3794 79.7461 25.0981L88.2846 17.0397Z"
														fill="#EF9D37"/>
												</svg>
												:
												<svg width="70" height="30" viewBox="0 0 70 30" fill="none"
													 xmlns="http://www.w3.org/2000/svg" className={'rotate-180'}>
													<path
														d="M68.6836 16.7615C69.5919 15.6551 69.5919 14.0611 68.6838 12.9546L61.5377 4.24813C59.5985 1.89066 57.0351 0.577921 54.3712 0.578125L10.7519 0.578125C7.96811 0.588677 5.30066 2.0207 3.33221 4.56141C1.36375 7.10212 0.254269 10.545 0.246094 14.1381L0.246094 15.5781C0.252225 19.1729 1.36081 22.6184 3.32948 25.1613C5.29815 27.7042 7.96677 29.1376 10.7519 29.1481H54.3712C55.7621 29.1469 57.1388 28.7881 58.4212 28.0928C59.7035 27.3974 60.8657 26.3794 61.8399 25.0981L68.6836 16.7615Z"
														fill="#EF9D37"/>
												</svg>
											}
											<div
												className={'absolute w-full h-full flex flex-col justify-center left-[-26px]'}>
												<svg width="16" height="10" viewBox="0 0 16 10" fill="none"
													 xmlns="http://www.w3.org/2000/svg">
													<path
														d="M14.4935 2.70791C15.5835 1.41791 15.0935 0.35791 13.4035 0.35791H1.67347C0.003474 0.35791 -0.506526 1.41791 0.583474 2.70791L5.58347 8.61791C5.81876 8.92485 6.12154 9.17352 6.46835 9.34466C6.81517 9.5158 7.19673 9.60481 7.58347 9.60481C7.97022 9.60481 8.35178 9.5158 8.69859 9.34466C9.04541 9.17352 9.34819 8.92485 9.58347 8.61791L14.4935 2.70791Z"
														fill="#EF9D37"/>
												</svg>
											</div>
											<div
												className={'absolute w-full h-full flex flex-col justify-center items-center'}>
												<span className={'dev-year-box-label-year'}>{'2018'}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className={'min-[992px]:hidden max-[992px]:mt-[30px] dev-year-box max-[500px]:ml-[42px] ml-[61px] mr-[19px]'}>
							<div className={'dev-year-box-inner bg-[#764324]'}/>
							<div className={'pl-[39px] pr-[39px] pt-[8px] pb-[8px] relative'}>
								<span
									className={'dev-year-box-label'}>{'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod'}</span>

								<div className={'absolute top-0 h-full right-[-39px] max-[992px]:right-[-25px]'}>
									<div className={'flex flex-col justify-center h-full'}>
										<img src={logoNAKHARAT} alt={'logo'} className={'dev-year-box-logo'}/>
									</div>
								</div>

								<div className={'absolute top-0 h-full max-[500px]:left-[-40px] left-[-59px]'}>
									<div className={' h-full flex flex-col justify-center'}>
										<div className={'relative flex flex-col justify-center'}>
											{!is500 ?
												<svg width="90" height="30" viewBox="0 0 90 30" fill="none"
													 xmlns="http://www.w3.org/2000/svg" className={'rotate-180'}>
													<path
														d="M88.2846 17.0397C89.539 15.8558 89.5391 13.8604 88.2848 12.6763L79.3561 4.24813C76.8531 1.89066 73.5445 0.577921 70.1061 0.578125L13.8061 0.578125C10.213 0.588677 6.7701 2.0207 4.22939 4.56141C1.68868 7.10212 0.256654 10.545 0.246101 14.1381L0.246101 15.5781C0.254016 19.173 1.68488 22.6184 4.22587 25.1613C6.76687 27.7042 10.2113 29.1376 13.8061 29.1481H70.1061C71.9013 29.1469 73.6784 28.7881 75.3335 28.0928C76.9886 27.3974 78.4886 26.3794 79.7461 25.0981L88.2846 17.0397Z"
														fill="#764324"/>
												</svg>
												:
												<svg width="70" height="30" viewBox="0 0 70 30" fill="none"
													 xmlns="http://www.w3.org/2000/svg" className={'rotate-180'}>
													<path
														d="M68.6836 16.7615C69.5919 15.6551 69.5919 14.0611 68.6838 12.9546L61.5377 4.24813C59.5985 1.89066 57.0351 0.577921 54.3712 0.578125L10.7519 0.578125C7.96811 0.588677 5.30066 2.0207 3.33221 4.56141C1.36375 7.10212 0.254269 10.545 0.246094 14.1381L0.246094 15.5781C0.252225 19.1729 1.36081 22.6184 3.32948 25.1613C5.29815 27.7042 7.96677 29.1376 10.7519 29.1481H54.3712C55.7621 29.1469 57.1388 28.7881 58.4212 28.0928C59.7035 27.3974 60.8657 26.3794 61.8399 25.0981L68.6836 16.7615Z"
														fill="#764324"/>
												</svg>
											}
											<div
												className={'absolute w-full h-full flex flex-col justify-center left-[-26px]'}>
												<svg width="16" height="10" viewBox="0 0 16 10" fill="none"
													 xmlns="http://www.w3.org/2000/svg">
													<path
														d="M14.4935 2.70791C15.5835 1.41791 15.0935 0.35791 13.4035 0.35791H1.67347C0.003474 0.35791 -0.506526 1.41791 0.583474 2.70791L5.58347 8.61791C5.81876 8.92485 6.12154 9.17352 6.46835 9.34466C6.81517 9.5158 7.19673 9.60481 7.58347 9.60481C7.97022 9.60481 8.35178 9.5158 8.69859 9.34466C9.04541 9.17352 9.34819 8.92485 9.58347 8.61791L14.4935 2.70791Z"
														fill="#764324"/>
												</svg>
											</div>
											<div
												className={'absolute w-full h-full flex flex-col justify-center items-center'}>
												<span className={'dev-year-box-label-year'}>{'2019'}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className={'max-[992px]:mt-[30px] mt-[80px] dev-year-box max-[500px]:ml-[42px] ml-[61px] mr-[19px]'}>
							<div className={'dev-year-box-inner bg-[#C86B2E]'}/>
							<div className={'pl-[39px] pr-[39px] pt-[8px] pb-[8px] relative'}>
								<span
									className={'dev-year-box-label'}>{'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod'}</span>

								<div className={'absolute top-0 h-full right-[-39px] max-[992px]:right-[-25px]'}>
									<div className={'flex flex-col justify-center h-full'}>
										<img src={logoTREX} alt={'logo'} className={'dev-year-box-logo'}/>
									</div>
								</div>

								<div className={'absolute top-0 h-full max-[500px]:left-[-40px] left-[-59px]'}>
									<div className={' h-full flex flex-col justify-center'}>
										<div className={'relative flex flex-col justify-center'}>
											{!is500 ?
												<svg width="90" height="30" viewBox="0 0 90 30" fill="none"
													 xmlns="http://www.w3.org/2000/svg" className={'rotate-180'}>
													<path
														d="M88.2846 17.0397C89.539 15.8558 89.5391 13.8604 88.2848 12.6763L79.3561 4.24813C76.8531 1.89066 73.5445 0.577921 70.1061 0.578125L13.8061 0.578125C10.213 0.588677 6.7701 2.0207 4.22939 4.56141C1.68868 7.10212 0.256654 10.545 0.246101 14.1381L0.246101 15.5781C0.254016 19.173 1.68488 22.6184 4.22587 25.1613C6.76687 27.7042 10.2113 29.1376 13.8061 29.1481H70.1061C71.9013 29.1469 73.6784 28.7881 75.3335 28.0928C76.9886 27.3974 78.4886 26.3794 79.7461 25.0981L88.2846 17.0397Z"
														fill="#C86B2E"/>
												</svg>
												:
												<svg width="70" height="30" viewBox="0 0 70 30" fill="none"
													 xmlns="http://www.w3.org/2000/svg" className={'rotate-180'}>
													<path
														d="M68.6836 16.7615C69.5919 15.6551 69.5919 14.0611 68.6838 12.9546L61.5377 4.24813C59.5985 1.89066 57.0351 0.577921 54.3712 0.578125L10.7519 0.578125C7.96811 0.588677 5.30066 2.0207 3.33221 4.56141C1.36375 7.10212 0.254269 10.545 0.246094 14.1381L0.246094 15.5781C0.252225 19.1729 1.36081 22.6184 3.32948 25.1613C5.29815 27.7042 7.96677 29.1376 10.7519 29.1481H54.3712C55.7621 29.1469 57.1388 28.7881 58.4212 28.0928C59.7035 27.3974 60.8657 26.3794 61.8399 25.0981L68.6836 16.7615Z"
														fill="#C86B2E"/>
												</svg>
											}
											<div
												className={'absolute w-full h-full flex flex-col justify-center left-[-26px]'}>
												<svg width="16" height="10" viewBox="0 0 16 10" fill="none"
													 xmlns="http://www.w3.org/2000/svg">
													<path
														d="M14.4935 2.70791C15.5835 1.41791 15.0935 0.35791 13.4035 0.35791H1.67347C0.003474 0.35791 -0.506526 1.41791 0.583474 2.70791L5.58347 8.61791C5.81876 8.92485 6.12154 9.17352 6.46835 9.34466C6.81517 9.5158 7.19673 9.60481 7.58347 9.60481C7.97022 9.60481 8.35178 9.5158 8.69859 9.34466C9.04541 9.17352 9.34819 8.92485 9.58347 8.61791L14.4935 2.70791Z"
														fill="#C86B2E"/>
												</svg>
											</div>
											<div
												className={'absolute w-full h-full flex flex-col justify-center items-center'}>
												<span className={'dev-year-box-label-year'}>{'2020'}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className={'min-[992px]:hidden max-[992px]:mt-[30px] dev-year-box max-[500px]:ml-[42px] ml-[61px] mr-[19px]'}>
							<div className={'dev-year-box-inner bg-[#EF9D37]'}/>
							<div className={'pl-[39px] pr-[39px] pt-[8px] pb-[8px] relative'}>
								<span
									className={'dev-year-box-label'}>{'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod'}</span>

								<div className={'absolute top-0 h-full right-[-39px] max-[992px]:right-[-25px]'}>
									<div className={'flex flex-col justify-center h-full'}>
										<img src={logoNEO} alt={'logo'} className={'dev-year-box-logo'}/>
									</div>
								</div>

								<div className={'absolute top-0 h-full max-[500px]:left-[-40px] left-[-59px]'}>
									<div className={' h-full flex flex-col justify-center'}>
										<div className={'relative flex flex-col justify-center'}>
											{!is500 ?
												<svg width="90" height="30" viewBox="0 0 90 30" fill="none"
													 xmlns="http://www.w3.org/2000/svg" className={'rotate-180'}>
													<path
														d="M88.2846 17.0397C89.539 15.8558 89.5391 13.8604 88.2848 12.6763L79.3561 4.24813C76.8531 1.89066 73.5445 0.577921 70.1061 0.578125L13.8061 0.578125C10.213 0.588677 6.7701 2.0207 4.22939 4.56141C1.68868 7.10212 0.256654 10.545 0.246101 14.1381L0.246101 15.5781C0.254016 19.173 1.68488 22.6184 4.22587 25.1613C6.76687 27.7042 10.2113 29.1376 13.8061 29.1481H70.1061C71.9013 29.1469 73.6784 28.7881 75.3335 28.0928C76.9886 27.3974 78.4886 26.3794 79.7461 25.0981L88.2846 17.0397Z"
														fill="#EF9D37"/>
												</svg>
												:
												<svg width="70" height="30" viewBox="0 0 70 30" fill="none"
													 xmlns="http://www.w3.org/2000/svg" className={'rotate-180'}>
													<path
														d="M68.6836 16.7615C69.5919 15.6551 69.5919 14.0611 68.6838 12.9546L61.5377 4.24813C59.5985 1.89066 57.0351 0.577921 54.3712 0.578125L10.7519 0.578125C7.96811 0.588677 5.30066 2.0207 3.33221 4.56141C1.36375 7.10212 0.254269 10.545 0.246094 14.1381L0.246094 15.5781C0.252225 19.1729 1.36081 22.6184 3.32948 25.1613C5.29815 27.7042 7.96677 29.1376 10.7519 29.1481H54.3712C55.7621 29.1469 57.1388 28.7881 58.4212 28.0928C59.7035 27.3974 60.8657 26.3794 61.8399 25.0981L68.6836 16.7615Z"
														fill="#EF9D37"/>
												</svg>
											}
											<div
												className={'absolute w-full h-full flex flex-col justify-center left-[-26px]'}>
												<svg width="16" height="10" viewBox="0 0 16 10" fill="none"
													 xmlns="http://www.w3.org/2000/svg">
													<path
														d="M14.4935 2.70791C15.5835 1.41791 15.0935 0.35791 13.4035 0.35791H1.67347C0.003474 0.35791 -0.506526 1.41791 0.583474 2.70791L5.58347 8.61791C5.81876 8.92485 6.12154 9.17352 6.46835 9.34466C6.81517 9.5158 7.19673 9.60481 7.58347 9.60481C7.97022 9.60481 8.35178 9.5158 8.69859 9.34466C9.04541 9.17352 9.34819 8.92485 9.58347 8.61791L14.4935 2.70791Z"
														fill="#EF9D37"/>
												</svg>
											</div>
											<div
												className={'absolute w-full h-full flex flex-col justify-center items-center'}>
												<span className={'dev-year-box-label-year'}>{'2021'}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className={'max-[992px]:mt-[30px] mt-[80px] dev-year-box max-[500px]:ml-[42px] ml-[61px] mr-[19px]'}>
							<div className={'dev-year-box-inner bg-[#764324]'}/>
							<div className={'pl-[39px] pr-[39px] pt-[8px] pb-[8px] relative'}>
								<span
									className={'dev-year-box-label'}>{'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod'}</span>

								<div className={'absolute top-0 h-full right-[-39px] max-[992px]:right-[-25px]'}>
									<div className={'flex flex-col justify-center h-full'}>
										<img src={logoNAKHARAT} alt={'logo'} className={'dev-year-box-logo'}/>
									</div>
								</div>

								<div className={'absolute top-0 h-full left-[-59px] max-[500px]:left-[-40px]'}>
									<div className={' h-full flex flex-col justify-center'}>
										<div className={'relative flex flex-col justify-center'}>
											{!is500 ?
												<svg width="90" height="30" viewBox="0 0 90 30" fill="none"
													 xmlns="http://www.w3.org/2000/svg" className={'rotate-180'}>
													<path
														d="M88.2846 17.0397C89.539 15.8558 89.5391 13.8604 88.2848 12.6763L79.3561 4.24813C76.8531 1.89066 73.5445 0.577921 70.1061 0.578125L13.8061 0.578125C10.213 0.588677 6.7701 2.0207 4.22939 4.56141C1.68868 7.10212 0.256654 10.545 0.246101 14.1381L0.246101 15.5781C0.254016 19.173 1.68488 22.6184 4.22587 25.1613C6.76687 27.7042 10.2113 29.1376 13.8061 29.1481H70.1061C71.9013 29.1469 73.6784 28.7881 75.3335 28.0928C76.9886 27.3974 78.4886 26.3794 79.7461 25.0981L88.2846 17.0397Z"
														fill="#764324"/>
												</svg>
												:
												<svg width="70" height="30" viewBox="0 0 70 30" fill="none"
													 xmlns="http://www.w3.org/2000/svg" className={'rotate-180'}>
													<path
														d="M68.6836 16.7615C69.5919 15.6551 69.5919 14.0611 68.6838 12.9546L61.5377 4.24813C59.5985 1.89066 57.0351 0.577921 54.3712 0.578125L10.7519 0.578125C7.96811 0.588677 5.30066 2.0207 3.33221 4.56141C1.36375 7.10212 0.254269 10.545 0.246094 14.1381L0.246094 15.5781C0.252225 19.1729 1.36081 22.6184 3.32948 25.1613C5.29815 27.7042 7.96677 29.1376 10.7519 29.1481H54.3712C55.7621 29.1469 57.1388 28.7881 58.4212 28.0928C59.7035 27.3974 60.8657 26.3794 61.8399 25.0981L68.6836 16.7615Z"
														fill="#764324"/>
												</svg>
											}
											<div
												className={'absolute w-full h-full flex flex-col justify-center left-[-26px]'}>
												<svg width="16" height="10" viewBox="0 0 16 10" fill="none"
													 xmlns="http://www.w3.org/2000/svg">
													<path
														d="M14.4935 2.70791C15.5835 1.41791 15.0935 0.35791 13.4035 0.35791H1.67347C0.003474 0.35791 -0.506526 1.41791 0.583474 2.70791L5.58347 8.61791C5.81876 8.92485 6.12154 9.17352 6.46835 9.34466C6.81517 9.5158 7.19673 9.60481 7.58347 9.60481C7.97022 9.60481 8.35178 9.5158 8.69859 9.34466C9.04541 9.17352 9.34819 8.92485 9.58347 8.61791L14.4935 2.70791Z"
														fill="#764324"/>
												</svg>
											</div>
											<div
												className={'absolute w-full h-full flex flex-col justify-center items-center'}>
												<span className={'dev-year-box-label-year'}>{'2022'}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	)
}


export default DevelopmentProcess
