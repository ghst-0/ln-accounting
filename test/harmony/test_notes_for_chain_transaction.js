import test from 'node:test';
import { equal } from 'node:assert/strict';

import { notesForChainTransaction } from '../../harmony/notes_for_chain_transaction.js';

const tests = [
  {
    args: {output_addresses: ['a', 'b']},
    description: 'Notes are returned',
    expected: {notes: 'Outputs to a b'},
  },
  {
    args: {description: 'description', output_addresses: ['a', 'b']},
    description: 'Notes with description are returned',
    expected: {notes: 'description - Outputs to a b'},
  },
];

for (const { args, description, expected } of tests) {
  test(description, (t, end) => {
    const { notes } = notesForChainTransaction(args);

    equal(notes, expected.notes, 'Notes for chain transaction');

    return end();
  })
}
