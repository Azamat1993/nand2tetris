const { Base } = require('./base');

class Pop extends Base {
    constructor(writer) {
        super(writer);
    }
    handle(command, segment, index) {
        // write to file comment with command name?
        switch (segment) {
            case 'local':
            case 'argument':
            case 'this':
            case 'that':
                this.setAddress(segment, index);
                // SP--
                this.writer.write('// SP--');
                this.writer.write('@SP');
                this.writer.write('M=M-1');
                // *addr = *SP
                this.writer.write('@SP');
                this.writer.write('A=M');
                this.writer.write('D=M');
                this.writer.write('@addr');
                this.writer.write('A=M');
                this.writer.write('M=D');
                break;
            case 'constant':
                // do nothing, such case cannot exist
                break;
            default:
                throw new Error('no such segment to push: ', segment);
        }
    }
}

module.exports = {
    Pop: Pop,
}