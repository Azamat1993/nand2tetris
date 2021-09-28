class Push {
    constructor(writer) {
        this.segmentToOffset = {
            local: 'LCL',
            argument: 'ARG',
            this: 'THIS',
            that: 'THAT',
        };
        this.writer = writer;
    }
    handle(command, segment, index) {
        // write to file comment with command name?
        switch (segment) {
            case 'local':
            case 'argument':
            case 'this':
            case 'that':
                const segmentOffset = this.segmentToOffset[segment];
                // addr = segment + i
                this.writer.write(`// addr = ${segmentOffset} + i`);
                this.writer.write(`@${segmentOffset}`);
                this.writer.write(`D=M`);
                this.writer.write(`@${index}`);
                this.writer.write('D=D+A');
                this.writer.write('@addr');
                this.writer.write('M=D');
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
    Push: Push,
}