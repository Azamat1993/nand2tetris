const fs = require('fs');
const readline = require('readline');
const { EventEmitter } = require('events');
const { Arithmetic, Push, Pop } = require('./parsers');

class Parser {
    constructor() {
        this.line$ = new EventEmitter();
        this.close$ = new EventEmitter();

        this.COMMAND_HANDLERS = {
            C_ARITHMETIC: new Arithmetic(),
            C_PUSH: new Push(),
            C_POP: new Pop(),
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
    }

    /**
     * indicates, whether file has more commands
     * @returns boolean
     */
    hasMoreCommands() {
        return true;
    }
    
    /**
     * 
     */
    parse(filePath) {
        const rd = readline.createInterface({
            input: fs.createReadStream(filePath),
            console: false
        });
        
        rd.on('line', (line) => {
            try {
                const parsedLine = this.parseLine(line);
                this.line$.emit('line', parsedLine);
            } catch(e) {
                console.error('failed to parse line: ', line);
                console.error('the actual error is: ', e);
                throw e;
            }
        });

        rd.on('close', () => {
            this.close$.emit('close');
        });
    }

    parseLine(line) {
        const [command, arg1, arg2] = line.split(' ');
        
        if (!this.COMMAND_TYPES[command]) {
            throw new Error('No such command exists', command);
        }

        const handler = this.COMMAND_HANDLERS[this.COMMAND_TYPES[command]];

        if (!handler.parse) {
            throw new Error('Implement parse for handler', handler);
        }

        return handler.parse(command, arg1, arg2);
    }
}

module.exports = {
    Parser: Parser,
}