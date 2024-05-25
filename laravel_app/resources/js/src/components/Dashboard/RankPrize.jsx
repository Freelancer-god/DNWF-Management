import React from 'react';

function RankPrize() {
  return (
    <div className="px-[15px] sm:max-w-[50%] ">
      <div className="min-h-auto bg-white rounded-[5px] shadow-md float-left w-full mb-[15px]">
        <div className="float-left w-full">
          <div className="px-[30px] py-[30px] pb-[25px] font-normal h-auto rounded-t-[10px] rounded-b-none bg-cover bg-[#00639a] relative ">
            <h3>
              <span className="text-white">
                <i className="fa fa-sitemap text-dark-500 text-4xl mr-[10px]" />
                {' '}
                Top 10 Giải phát
                thưởng nhiều nhất
              </span>
            </h3>
          </div>
          <div className="float-left w-full">
            <ul className="float-left list-none w-full">
              <li className="py-[22px] px-[40px] border-b border-solid border-gray-200 leading-normal text-base border-l-5 border-gray-600 float-left w-full flex relative">
                <span>
                  <span className="text-base font-medium text-gray-700 float-left w-full mb-0 mt-[5px]">
                    Giải 1
                  </span>
                  <span className="text-sm font-light text-gray-400">
                    Giải ao lang cho các cơ thủ Bida trên toàn VN
                  </span>
                  <span className="absolute right-[30px]">12</span>
                </span>
              </li>
              <li className="py-[22px] px-[40px] border-b border-solid border-gray-200 leading-normal text-base border-l-5 border-gray-600 float-left w-full flex relative">
                <span>
                  <span className="text-base font-medium text-gray-700 float-left w-full mb-0 mt-[5px]">
                    Giải 2
                  </span>
                  <span className="text-sm font-light text-gray-400">
                    Giải ao lang cho các cơ thủ Bida trên toàn VN
                  </span>
                  <span className="absolute right-[30px]">12</span>
                </span>
              </li>
              <li className="py-[22px] px-[40px] border-b border-solid border-gray-200 leading-normal text-base border-l-5 border-gray-600 float-left w-full flex relative">
                <span>
                  <span className="text-base font-medium text-gray-700 float-left w-full mb-0 mt-[5px]">
                    Giải 2
                  </span>
                  <span className="text-sm font-light text-gray-400">
                    Giải ao lang cho các cơ thủ Bida trên toàn VN
                  </span>
                  <span className="absolute right-[30px]">12</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RankPrize;
