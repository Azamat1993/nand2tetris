const { Base } = require('./base');

class Arithmetic extends Base {
    constructor(writer) {
        super(writer);
        this.labelIndex = 0;
    }
    handle(command, arg1, arg2) {
        if (arg1 || arg2) {
            // can we just ignore it?
            throw new Error('command "' + command + '" should not take any params, which were provided: ' + arg1 + ', ' + arg2);
        }
        switch(command) {   
            case 'add':
            case 'sub':
            case 'and':
            case 'or':
            case 'lt':
            case 'gt':
            case 'eq':
                // pop arg2
                this.writer.write('// pop arg2');
                // SP--
                this.writer.write('// SP--');
                this.writer.write('@SP');
                this.writer.write('M=M-1');
                this.writer.write('@SP');
                this.writer.write('A=M');
                this.writer.write('D=M');
                this.writer.write('@arg2');
                this.writer.write('M=D');
                // pop arg1
                this.writer.write('// pop arg1');
                // SP--
                this.writer.write('// SP--');
                this.writer.write('@SP');
                this.writer.write('M=M-1');
                this.writer.write('@SP');
                this.writer.write('A=M');
                this.writer.write('D=M');
                // up to that point: arg2 in @arg2, arg1 in D
                switch(command) {
                    case 'add':
                        this.writer.write('@arg2');
                        this.writer.write('D=D+M');
                        break;
                    case 'sub':
                        this.writer.write('@arg2');
                        this.writer.write('D=D-M');
                        break;
                    case 'and':
                        this.writer.write('@arg2');
                        this.writer.write('D=D&M');
                        break;
                    case 'or':
                        this.writer.write('@arg2');
                        this.writer.write('D=D|M');
                        break;
                    case 'lt':
                    case 'gt':
                    case 'eq':
                        this.writer.write('@arg2');
                        this.writer.write('D=D-M');
                        this.writer.write(`@IF_${this.labelIndex}`);
                        switch(command) {
                            case 'lt':
                                this.writer.write('D;JLT');
                                break;
                            case 'gt':
                                this.writer.write('D;JGT');
                                break;
                            case 'eq':
                                this.writer.write('D;JEQ');
                                break;
                        }
                        this.writer.write('D=0');
                        this.writer.write(`@COMPLETE_${this.labelIndex}`);
                        this.writer.write('0;JMP');
                        this.writer.write(`(IF_${this.labelIndex})`);
                        this.writer.write('D=-1');
                        this.writer.write(`(COMPLETE_${this.labelIndex})`);
                        this.labelIndex++;
                        break;
                    default:
                        throw new Error('no such command: ', command);
                }
                this.writer.write('@SP');
                this.writer.write('A=M');
                this.writer.write('M=D');
                // SP++
                this.writer.write('// SP++');
                this.writer.write('@SP');
                this.writer.write('M=M+1');
                break;
            case 'not':
            case 'neg':
                // pop arg
                this.writer.write('// pop arg');
                // SP--
                this.writer.write('// SP--');
                this.writer.write('@SP');
                this.writer.write('M=M-1');
                this.writer.write('@SP');
                this.writer.write('A=M');
                this.writer.write('D=M');
                // up to that point: arg in D
                switch(command) {
                    case 'not':
                        // !D
                        this.writer.write('// !D');
                        this.writer.write('D=!D');
                        break;
                    case 'neg':
                        // -D
                        this.writer.write('// -D');
                        this.writer.write('D=-D');
                    default:
                        throw new Error('no such command: ', command);
                }
                this.writer.write('@SP');
                this.writer.write('A=M');
                this.writer.write('M=D');
                // SP++
                this.writer.write('// SP++');
                this.writer.write('@SP');
                this.writer.write('M=M+1');
                break;
            default:
                throw new Error('no such command: ', command);
        }
    }
}

module.exports = {
    Arithmetic: Arithmetic,
};