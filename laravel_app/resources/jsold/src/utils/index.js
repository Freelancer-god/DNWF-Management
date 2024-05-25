import dayjs from "dayjs";

export const APP_NAME = 'landingpagetvp';

export const clog = (...args) => {
	if (process.env.NODE_ENV === 'development') {
		console.log(...args);
	}
};

export const lastUpdated = (updatedAt) => {
	if (updatedAt > 0) {
		return dayjs(updatedAt * 1000).fromNow();
	}
	return window.t(APP_NAME, 'Chưa bao giờ');
};

export const displayFullDate = (timestamp) => {
	if (timestamp > 0) {
		return dayjs(timestamp * 1000).format( 'dddd, DD/MM/YYYY HH:mm (ZZ)');
	}
	return '';
};

export const removeHtmlTags = (text) => {
	const div = document.createElement('div');
	div.innerHTML = text;
	return div.textContent || div.innerText || '';
};

export const tt = (text) => window.t(APP_NAME, text);
// export const tt = (text) => text;

export const removeAnchorTags = (html) => {
	var div = document.createElement('div');
	div.innerHTML = html;

	var anchorTags = div.getElementsByTagName('a');
	var i = anchorTags.length;

	while (i--) {
		var anchor = anchorTags[i];
		var href = anchor.getAttribute('href');
		if (href && href.indexOf('dabi-link/news/') === 0) {
			anchor.removeAttribute('href');
			anchor.href = href.replace('dabi-link', '');
			anchor.style.color = 'blue';
			anchor.style.textDecoration = 'underline';
		} else {
			anchor.parentNode.removeChild(anchor);
		}
	}

	return div.innerHTML;
}

export const loadStateFromHiddenField = (APP_NAME, key, fallback) => {
    try {
        const value = document.getElementById(`initial-state-${key}`).value;
        return atob(value)
    } catch (e) {
        return fallback
    }
}
