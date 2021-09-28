class Base {
    constructor(writer) {
        this.segmentToOffset = {
            local: 'LCL',
            argument: 'ARG',
            this: 'THIS',
            that: 'THAT',
        };
        this.writer = writer;
    }

    setAddress(segment, index) {
        const segmentOffset = this.segmentToOffset[segment];
        // addr = segment + i
        this.writer.write(`// addr = ${segmentOffset} + i`);
        this.writer.write(`@${segmentOffset}`);
        this.writer.write(`D=M`);
        this.writer.write(`@${index}`);
        this.writer.write('D=D+A');
        this.writer.write('@addr');
        this.writer.write('M=D');
    }
}

module.exports = {
    Base: Base,
}