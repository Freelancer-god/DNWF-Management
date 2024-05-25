import React, { useEffect, useState } from "react";
import axios from "@nextcloud/axios";
import { generateUrl } from "@nextcloud/router";
import { showError } from "../../components/dialogs";
import Ranking from "./Ranking";

function Topten() {
  const [loadingDataStore, setLoadingDataStore] = useState(true);
  const [loadingDataPrize, setLoadingDataPrize] = useState(true);

  const [dataStore, setDataStore] = useState([]);
  const [dataPrize, setDataPrize] = useState([]);

  useEffect(() => {
    const fetchTopStore = () =>
      axios
        .get(
          generateUrl(
            "apps/championships/api/v1/championships/statisticStoreInfo"
          )
        )
        .then((res) => res.data)
        .then((data) => {
          if (data.success === false) {
            setLoadingDataStore(false);
            showError(data.error);
            return null;
          }
          setLoadingDataStore(false);
          setDataStore(data.data);
          return data.data;
        })
        .catch((error) => {
          setLoadingDataStore(false);
          showError(
            tt("Không thể thực hiện ngay lúc này, vui lòng thử lại sau")
          );
          return null;
        });

    const fetchTopPrize = () =>
      axios
        .get(
          generateUrl(
            "/apps/championships/api/v1/championships/statisticPrizeInfo"
          )
        )
        .then((res) => res.data)
        .then((data) => {
          if (data.success === false) {
            setLoadingDataPrize(false);
            showError(data.error);
            return null;
          }
          setLoadingDataPrize(false);
          setDataPrize(data.data);
          return data.data;
        })
        .catch((error) => {
          setLoadingDataPrize(false);
          showError(
            tt("Không thể thực hiện ngay lúc này, vui lòng thử lại sau")
          );
          return null;
        });

    fetchTopStore();
    fetchTopPrize();
  }, []);
  return (
    <div className="flex flex-col mt-[10px]">
      <Ranking
        data={dataStore}
        title="Top 10 cửa hàng phát giải nhiều nhất"
        loading={loadingDataStore}
      />
      <Ranking
        data={dataPrize}
        title="Top 10 giải phát nhiều nhất"
        isPrize
        loading={loadingDataPrize}
      />
    </div>
  );
}

export default Topten;
