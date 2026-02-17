import test from 'node:test';
import { throws } from 'node:assert/strict';

import { harmonize } from './../../harmony/index.js';

const tests = [
  {
    args: {},
    description: 'Records are required',
    error: 'ExpectedRecordsToConvertToHarmonyFormat',
  },
];

for (const { args, description, error } of tests) {
  test(description, (t, end) => {
    if (error) {
      throws(() => harmonize(args), new Error(error), 'Got error');
    } else {
      harmonize(args);
    }

    return end();
  })
}
