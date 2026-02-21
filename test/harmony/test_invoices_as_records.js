import test from 'node:test';
import { deepEqual, throws } from 'node:assert/strict';

import { invoicesAsRecords } from '../../harmony/index.js';

const date = new Date().toISOString();

const tests = [
  {
    args: {
      invoices: [{
        confirmed_at: date,
        created_at: date,
        description: 'description',
        id: 'id',
        is_confirmed: true,
        payments: [],
        received: 1,
      }],
    },
    description: 'Invoices as records',
    expected: {
      records: [{
        amount: 1,
        category: 'invoices',
        created_at: date,
        id: 'id',
        notes: 'description',
        type: 'income',
      }],
    },
  },
  {
    args: {
      invoices: [{
        confirmed_at: date,
        created_at: date,
        description: '',
        id: 'id',
        is_confirmed: true,
        payments: [{messages: [{type: '5482373484'}]}],
        received: 1,
      }],
    },
    description: 'Push payment is represented',
    expected: {
      records: [{
        amount: 1,
        category: 'invoices',
        created_at: date,
        id: 'id',
        notes: '[Push Payment]',
        type: 'income',
      }],
    },
  },
  {
    args: {},
    description: 'Expects array of invoices',
    error: 'ExpectedArrayOfInvoicesToMapToAccountingRecords',
  }
];

for (const { args, description, error, expected } of tests) {
  test(description, (t, end) => {
    if (error) {
      throws(() => invoicesAsRecords(args), new Error(error), 'Got error');
    } else {
      const { records } = invoicesAsRecords(args);

      deepEqual(records, expected.records, 'Forwards formatted as records');
    }

    return end();
  })
}
