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
                this.setAddress(segment, address);
                // *SP=*addr
                this.writer.write('// *SP=*addr');
                this.writer.write('@addr');
                this.writer.write('A=M');
                this.writer.write('D=M');
                this.writer.write('@SP');
                this.writer.write('A=M');
                this.writer.write('M=D');
                // SP++
                this.writer.write('// SP++');
                this.writer.write('@SP');
                this.writer.write('M=M+1');
                break;
            case 'constant':
                // *SP=i
                // SP++
                this.writer.write('// *SP=i');
                this.writer.write(`@${index}`);
                this.writer.write(`D=A`);
                this.writer.write('@SP');
                this.writer.write('M=D');
                this.writer.write('// SP++');
                this.writer.write('@SP');
                this.writer.write('M=M+1');
                break;
            default:
                throw new Error('no such segment to push: ', segment);
        }
    }
}

module.exports = {
    Pop: Pop,
}