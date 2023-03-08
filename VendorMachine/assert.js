'use strict';

import AssertError from './assertError.js';
import Stringify from './stringify.js';

const internals = {};

const assert = module.exports = function (condition, ...args) {

    if (condition) {
        return;
    }

    if (args.length === 1 &&
        args[0] instanceof Error) {

        throw args[0];
    }

    const msgs = args
        .filter((arg) => arg !== '')
        .map((arg) => {

            return typeof arg === 'string' ? arg : arg instanceof Error ? arg.message : Stringify(arg);
        });

    throw new AssertError(msgs.join(' '), assert);
};
