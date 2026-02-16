import harmony from './harmony.json' with { type: 'json' };
import categorizeRecords from './categorize_records.js';
import chainFeesAsRecords from './chain_fees_as_records.js';
import chainReceivesAsRecords from './chain_receives_as_records.js';
import chainSendsAsRecords from './chain_sends_as_records.js';
import forwardsAsRecords from './forwards_as_records.js';
import harmonize from './harmonize.js';
import invoicesAsRecords from './invoices_as_records.js';
import paymentsAsRecords from './payments_as_records.js';
import recordsWithFiat from './records_with_fiat.js';

const categories = harmony.categories;
const types = harmony.types;

export {
  categories,
  categorizeRecords,
  chainFeesAsRecords,
  chainReceivesAsRecords,
  chainSendsAsRecords,
  forwardsAsRecords,
  harmonize,
  invoicesAsRecords,
  paymentsAsRecords,
  recordsWithFiat,
  types
};
