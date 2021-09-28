const { Arithmetic, Push, Pop } = require('./parsers');
const fs = require('fs');
class CodeWriter {
    constructor(filePath) {
        this.COMMAND_HANDLERS = {
            C_ARITHMETIC: new Arithmetic(this),
            C_PUSH: new Push(this),
            C_POP: new Pop(this),
            C_LABEL: 'c_label',
            C_GOTO: 'c_goto',
            C_IF: 'c_if',
            C_FUNCTION: 'c_function',
            C_RETURN: 'c_return',
            C_CALL: 'c_call',
        };

        this.COMMAND_TYPES = {
            add: 'C_ARITHMETIC',
            sub: 'C_ARITHMETIC',
            neg: 'C_ARITHMETIC',
            eq: 'C_ARITHMETIC',
            gt: 'C_ARITHMETIC',
            lt: 'C_ARITHMETIC',
            and: 'C_ARITHMETIC',
            or: 'C_ARITHMETIC',
            not: 'C_ARITHMETIC',
            push: 'C_PUSH',
            pop: 'C_POP',
            label: 'C_LABEL',
            goto: 'C_GOTO',
            if: 'C_IF',
            function: 'C_FUNCTION',
            return: 'C_RETURN',
            call: 'C_CALL',
        };

        this.stream = fs.createWriteStream(filePath);
    }

    write(line) {
        this.stream.write(line + '\n');
    }

    close() {
        this.stream.close();
    }

    handle(command, arg1, arg2) {
        if (!this.COMMAND_TYPES[command]) {
            throw new Error('No such command exists', command);
        }

        const handler = this.COMMAND_HANDLERS[this.COMMAND_TYPES[command]];

        if (!handler.handle) {
            throw new Error('Implement handle for handler', handler);
        }

        this.write('// --------- ' + command + ' ' + (arg1 || '') + ' ' + (arg2 || ''));

        return handler.handle(command, arg1, arg2);
    }
}

module.exports = {
    CodeWriter: CodeWriter,
}