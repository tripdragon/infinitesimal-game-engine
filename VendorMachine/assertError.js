const internals = {};

module.exports = class AssertError extends Error {

    name = 'AssertError';

    constructor(message, ctor) {

        super(message || 'Unknown error');

        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, ctor);
        }
    }
};