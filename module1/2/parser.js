const fs = require('fs');
const readline = require('readline');
const { EventEmitter } = require('events');

class Parser {
    constructor() {
        this.line$ = new EventEmitter();
        this.close$ = new EventEmitter();
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
                this.line$.emit('line', this.parseLine(line));
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
        return line.split(' ');
    }
}

module.exports = {
    Parser: Parser,
}