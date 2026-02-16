import getFiatValues from './get_fiat_values.js';
import constants from './constants.json' with { type: 'json' };

const rateProviders = constants.rateProviders;

export { getFiatValues, rateProviders };
