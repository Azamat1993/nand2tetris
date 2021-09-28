const { Parser } = require('./parser');
const { CodeWriter } = require('./codewriter');

class Main {
    constructor(filePath) {
        this.parser = new Parser();
        this.codeWriter = new CodeWriter(filePath.split('.').slice(0, -1).join('.') + '.asm');
        this.index = 0;
        this.parser.line$.addListener('line', (line) => {
            console.log('transpiling line ', this.index++ , line);
            this.codeWriter.handle(...line);
        });

        this.parser.close$.addListener('close', () => {
            console.log('finished transpiling file: ', filePath);
            this.codeWriter.close();
        });

        this.run(filePath);
    }

    run(filePath) {
        this.parser.parse(filePath);
    }
}

const main = new Main('./a.vm');