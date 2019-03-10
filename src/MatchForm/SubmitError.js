export default class SubmitError extends Error {
	constructor(...args) {
		super(...args);
		Error.captureStackTrace(this, SubmitError);
		this.name = "SubmitError";
	}
}