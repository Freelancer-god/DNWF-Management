import {useEffect, useState} from "react";

const getIs500 = () => window.innerWidth <= 500;

export default function useIs500() {
	const [is500, setIs500] = useState(getIs500());

	useEffect(() => {
		const onResize = () => {
			setIs500(getIs500());
		}

		window.addEventListener("resize", onResize);

		return () => {
			window.removeEventListener("resize", onResize);
		}
	}, []);

	return is500;
}
