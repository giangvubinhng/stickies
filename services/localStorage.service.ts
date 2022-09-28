function ParseJsonSafe(jsonStr: any) {
	if ('string' === typeof jsonStr) {
		return JSON.parse(jsonStr);
	}
	return jsonStr;
}

const getItem = (key: string) => {
	const itemStr = window.localStorage.getItem(key);
	return ParseJsonSafe(itemStr);
};

const setItem = (key: string, value: any) => {
	const valueStr = JSON.stringify(value);
	window.localStorage.setItem(key, valueStr);
};

const removeItem = (key: string) => {
	window.localStorage.removeItem(key);
};
const localStorageService = {removeItem, getItem, setItem};

export default localStorageService;

