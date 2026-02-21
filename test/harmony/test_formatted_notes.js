import test from 'node:test';
import { equal, throws } from 'node:assert/strict';

import formattedNotes from '../../harmony/formatted_notes.js';

const tests = [
  {
    args: {notes: 'notes'},
    description: 'Notes formatted',
    expected: {notes: 'notes'},
  },
  {
    args: {notes: ''},
    description: 'Empty notes formatted',
    expected: {notes: ''},
  },
];

for (const { args, description, error, expected } of tests) {
  test(description, (t, end) => {
    if (error) {
      throws(() => formattedNotes(args), new Error(error), 'Got error');
    } else {
      const { notes } = formattedNotes(args);

      equal(notes, expected.notes, 'Got formatted notes');
    }

    return end();
  })
}
