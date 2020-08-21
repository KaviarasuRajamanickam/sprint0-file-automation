const TestSequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends TestSequencer {
    sort(tests) {
        const orderPath = [
            '__tests__/unit/user-file-validation_spec.js',
            '__tests__/unit/sections-file-validation_spec.js',
            '__tests__/unit/relationship-file-validation_spec.js'
        ];
        return tests.sort((testA, testB) => {
            const indexA = orderPath.indexOf(testA.path);
            const indexB = orderPath.indexOf(testB.path);

            if (indexA === indexB) return 0; // do not swap when tests both not specify in order.

            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA < indexB ? -1 : 1;
        })
    }
}
module.exports = CustomSequencer;