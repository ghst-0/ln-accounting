import asyncAuto from 'async/auto.js';
import { returnResult } from 'asyncjs-util';

import getEsploraVout from './get_esplora_vout.js';

const apiBlockstreamBtc = 'https://blockstream.info/api/';
const apiBlockstreamBtcTestnet = 'https://blockstream.info/testnet/api/';
const apiMempoolSpaceBtc = 'https://mempool.space/api/';
const btcTestnet = 'btctestnet';
const random = arr => arr[Math.floor(Math.random() * arr.length)];

/** Get a vout from an esplora endpoint

  {
    id: <Transaction Id Hex String>
    [network]: <Network Name String>
    request: <Request Function>
    vout: <Transaction Output Index Number>
  }

  @returns via cbk or Promise
  {
    tokens: <Transaction Output Tokens Number>
  }
*/
export default ({id, network, request, vout}, cbk) => {
  return new Promise((resolve, reject) => {
    asyncAuto({
      // Check arguments
      validate: cbk => {
        if (!id) {
          return cbk([400, 'ExpectedPaymentIdToGetProxyVout']);
        }

        if (!request) {
          return cbk([400, 'ExpectedRequestFunctionToGetProxyVout']);
        }

        if (vout === undefined) {
          return cbk([400, 'ExpectedTransactionOutputIndexToGetProxyVout']);
        }

        return cbk();
      },

      // Determine the API to use
      api: ['validate', ({}, cbk) => {
        if (network === btcTestnet) {
          return cbk(null, apiBlockstreamBtcTestnet);
        }

        return cbk(null, random([apiBlockstreamBtc, apiMempoolSpaceBtc]));
      }],

      // Get transaction vout
      getVout: ['api', ({api}, cbk) => {
        return getEsploraVout({api, id, request, vout}, cbk);
      }],
    },
    returnResult({reject, resolve, of: 'getVout'}, cbk));
  });
};
