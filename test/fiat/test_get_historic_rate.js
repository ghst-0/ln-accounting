import test from 'node:test';
import { equal, rejects } from 'node:assert/strict';

import getHistoricRate from './../../fiat/get_historic_rate.js';

const api = ({}, cbk) => {
  return cbk(null, null, {market_data: {current_price: {usd: 12.34}}});
};

const makeArgs = overrides => {
  const args = {
    date: new Date().toISOString(),
    currency: 'BTC',
    fiat: 'USD',
    rates: {},
    request: ({qs}, cbk) => api({qs}, cbk),
  };

  for (const k of Object.keys(overrides)) {
    args[k] = overrides[k]
  }

  return args;
};

const tests = [
  {
    args: makeArgs({currency: undefined}),
    description: 'A currency code is required',
    error: [400, 'ExpectedCurrencyToGetHistoricRate'],
  },
  {
    args: makeArgs({date: undefined}),
    description: 'A date is required',
    error: [400, 'ExpectedDateToGetHistoricRate'],
  },
  {
    args: makeArgs({fiat: undefined}),
    description: 'A fiat type is required to get historic rate',
    error: [400, 'ExpectedFiatToGetHistoricRate'],
  },
  {
    args: makeArgs({rates: undefined}),
    description: 'Past rates are required to get historic rate',
    error: [400, 'ExpectedRatesToGetHistoricRate'],
  },
  {
    args: makeArgs({request: undefined}),
    description: 'A request function is required to get historic rate',
    error: [400, 'ExpectedRequestFunctionToGetHistoricRate'],
  },
  {
    args: makeArgs({provider: 'provider'}),
    description: 'A known rate provider is required to get historic rate',
    error: [400, 'ExpectedKnownRateProviderToGetHistoricRate'],
  },
  {
    args: makeArgs({}),
    description: 'Get historic fiat rates',
    expected: {cents: 1234},
  },
];

for (const { args, description, error, expected } of tests) {
  test(description, async () => {
    if (error) {
      await rejects(getHistoricRate(args), error, 'Gote expected error');
    } else {
      const { cents } = await getHistoricRate(args);

      equal(cents, expected.cents, 'Rate returned');
    }
  })
}
