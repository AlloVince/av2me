"use strict";
import crc from 'crc-32';

export class StandardException extends Error{

    static generateCode() {
        return crc.str(__dirname);
    }

    constructor(...args) {
        let [msg, id, code, statusCode] = args;
        super(msg, id);
        this._code = StandardException.generateCode() || -1;
        this._statusCode = statusCode || 500;
    }

    code() {
        return this._code;
    }


    statusCode() {
        return this._statusCode;
    }
}

export class LogicException extends StandardException {
    constructor(...args) {
        super(...args);
        this._statusCode = 400;
    }
}

export class RuntimeException extends StandardException {
}
