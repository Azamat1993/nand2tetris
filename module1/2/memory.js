class Memory {
    constructor() {
        this.SP = 0;
        this.LOCAL = 0;
        this.TEMP = 0;

        this.S_O = 256;
        this.TEMP_O = 5;
    }
}

module.exports = {
    Memory: new Memory(),
}