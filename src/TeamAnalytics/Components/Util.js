export function isEqual(a, b) {
	const aObj = typeof a === 'object';
	const bObj = typeof b === 'object';
	const aArr = Array.isArray(a);
	const bArr = Array.isArray(b);
	if (aObj !== bObj || aArr !== bArr) {
		return false;
	} else if (!aObj && !bObj) {
		return a === b;
	} else if (!aArr && !bArr) {
		let aKeys = Object.keys(a);
		for (let aKey of aKeys) {
			if (b[aKey] === undefined || !isEqual(a[aKey], b[aKey])) {
				return false;
			}
			return true;
		}
	} else {
		let aLen = a.length;
		if (b.length !== aLen) {
			return false;
		} else {
			for (let i = 0; i < aLen; i++) {
				if (!isEqual(a[i], b[i])) {
					return false;
				}
			}
			return true;
		}
	}
}

export function validInt(int) {
	let a = int;
	if (Number.isNaN(int) || !int) a = 0;
	return parseInt(a);
}

export function validFlt(num) {
	let a = num;
	if(Number.isNaN(num)||!num) a=0;
	return parseFloat(Math.round(a * 1000) / 1000).toFixed(3);
}
