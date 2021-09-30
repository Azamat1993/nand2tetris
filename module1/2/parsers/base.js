class Base {
    constructor(writer) {
        this.segmentToOffset = {
            local: 'LCL',
            argument: 'ARG',
            this: 'THIS',
            that: 'THAT',
            temp: '5',
        };
        this.writer = writer;
    }

    setAddress(segment, index) {
        const segmentOffset = this.segmentToOffset[segment];
        // addr = segment + i
        this.writer.write(`// addr = ${segmentOffset} + i`);
        this.writer.write(`@${segmentOffset}`);
        if (segment === 'temp') {
            this.writer.write(`D=A`);
        } else {
            this.writer.write(`D=M`);
        }
        this.writer.write(`@${index}`);
        this.writer.write('D=D+A');
        this.writer.write('@addr');
        this.writer.write('M=D');
    }
}

module.exports = {
    Base: Base,
}