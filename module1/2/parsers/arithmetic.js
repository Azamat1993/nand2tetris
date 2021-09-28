class Arithmetic {
    handle(command, arg1, arg2) {
        if (arg1 || arg2) {
            // can we just ignore it?
            throw new Error('command "' + command + '" should not take any params, which were provided: ' + arg1 + ', ' + arg2);
        }

        
    }
}

module.exports = {
    Arithmetic: Arithmetic,
};