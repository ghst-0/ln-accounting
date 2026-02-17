import test from 'node:test';
import { deepEqual, throws } from 'node:assert/strict';

import { forwardsAsRecords } from './../../harmony/index.js';

const date = new Date().toISOString();

const tests = [
  {
    args: {
      forwards: [{
        created_at: date,
        fee: 1,
        incoming_channel: 'incoming',
        outgoing_channel: 'outgoing',
        tokens: 2,
      }]
    },
    description: 'Forwards as records',
    expected: {
      records: [{
        amount: 1,
        category: 'forwards',
        created_at: date,
        from_id: 'incoming',
        notes: '2',
        to_id: 'outgoing',
        type: 'income',
      }],
    },
  },
  {
    args: {},
    description: 'Array of forwards required',
    error: 'ExpectedArrayOfForwardsToFormatAsAccountingRecords',
  },
];

for (const { args, description, error, expected } of tests) {
  test(description, (t, end) => {
    if (error) {
      throws(() => forwardsAsRecords(args), new Error(error), 'Got error');
    } else {
      const { records } = forwardsAsRecords(args);

      deepEqual(records, expected.records, 'Forwards formatted as records');
    }

    return end();
  })
}
