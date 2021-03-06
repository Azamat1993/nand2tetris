const { Base } = require('./base');

class Push extends Base {
    handle(command, segment, index, fileName) {
        // write to file comment with command name?
        switch (segment) {
            case 'local':
            case 'argument':
            case 'this':
            case 'that':
            case 'temp':
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
            case 'static':
                // @fileName.index
                this.writer.write(`@${fileName}.${index}`);
                this.writer.write('D=M');

                this.writer.write('@SP');
                this.writer.write('A=M');
                this.writer.write('M=D');

                // SP++
                this.writer.write('// SP++');
                this.writer.write('@SP');
                this.writer.write('M=M+1');
                break;
            case 'pointer':
                if (index !== '0' || index !== '1') {
                    throw new Error(`argument for ${segment} should be either 0 or 1, provided: ${index}`);
                }
                const s = index === 0 ? 'THIS' : 'THAT';
                // *SP=THIS/THAT
                this.writer.write('// *SP=THIS/THAT');
                this.writer.write(`@${s}`);
                this.writer.write('D=M');
                this.writer.write('@SP');
                this.writer.write('A=M');
                this.writer.write('M=D');
                // SP++
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
    Push: Push,
}