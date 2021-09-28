const { Parser } = require('./parser');
const { CodeWriter } = require('./codewriter');

class Main {
    constructor() {
        this.parser = new Parser();
        this.codeWriter = new CodeWriter();

        this.parser.line$.addListener('line', (line) => {
            console.log('the line is:', line);
        });

        this.parser.close$.addListener('close', () => {
            console.log('closed');
        });
    }

    run(filePath) {
        this.parser.parse(filePath);
    }
}

const main = new Main();
main.run('./a.vm');