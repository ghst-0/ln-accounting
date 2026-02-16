import harmony from './harmony.json' with { type: 'json' };

const {isArray} = Array;

/** Forwards as accounting records

  {
    forwards: [{
      created_at: <Forward Created At ISO 8601 Date String>
      fee: <Forward Fee Tokens Earned Number>
      incoming_channel: <Incoming Standard Format Channel Id String>
      outgoing_channel: <Outgoing Standard Format Channel Id String>
      tokens: <Forwarded Tokens Number>
    }]
  }

  @throws
  <Error>

  @returns
  {
    records: [{
      amount: <Amount Tokens Number>
      category: <Category String>
      created_at: <Record Created At ISO 8601 Date String>
      from_id: <Transfer From Id String>
      notes: <Record Notes String>
      to_id: <Transfer To Id String>
      type: <Record Type String>
    }]
  }
*/
export default ({forwards}) => {
  if (!isArray(forwards)) {
    throw new Error('ExpectedArrayOfForwardsToFormatAsAccountingRecords');
  }

  const records = forwards.map(forward => ({
    amount: forward.fee,
    category: harmony.categories.forwards,
    created_at: forward.created_at,
    from_id: forward.incoming_channel,
    notes: forward.tokens.toString(),
    to_id: forward.outgoing_channel,
    type: harmony.types.income,
  }));

  return {records};
};
