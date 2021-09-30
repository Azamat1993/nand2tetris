const { Base } = require('./base');

class Pop extends Base {
    handle(command, segment, index, fileName) {
        // write to file comment with command name?
        switch (segment) {
            case 'local':
            case 'argument':
            case 'this':
            case 'that':
            case 'temp':
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
            case 'static':
                // SP--
                this.writer.write('// SP--');
                this.writer.write('@SP');
                this.writer.write('M=M-1');
                // D=stack.pop()
                this.writer.write('@SP');
                this.writer.write('A=M');
                this.writer.write('D=M');
                // @fileName.index
                this.writer.write(`@${fileName}.${index}`);
                this.writer.write('M=D');
                break;
            case 'pointer':
                if (index !== '0' || index !== '1') {
                    throw new Error(`argument for ${segment} should be either 0 or 1, provided: ${index}`);
                }
                const s = index === 0 ? 'THIS' : 'THAT';
                // SP--
                this.writer.write('// SP--');
                this.writer.write('@SP');
                this.writer.write('M=M-1');
                // THIS/THAT=*SP
                this.writer.write('// THIS/THAT=*SP');
                this.writer.write('@SP');
                this.writer.write('A=M');
                this.writer.write('D=M');
                this.writer.write(`@${s}`);
                this.writer.write('M=D');
                break;
            default:
                throw new Error('no such segment to push: ', segment);
        }
    }
}

module.exports = {
    Pop: Pop,
}