import harmony from './harmony.json' with { type: 'json' };

const from = messages => messages.find(n => n.type === '34349339');
const hasKeySend = messages => !!messages.find(n => n.type === '5482373484');
const {isArray} = Array;

/** Invoices as accounting records

  {
    invoices: [{
      confirmed_at: <Invoice Confirmed at ISO 8601 Date String>
      created_at: <Invoice Created at ISO 8601 Date String>
      description: <Invoice Description String>
      id: <Invoice Payment Hash Hex String>
      is_confirmed: <Invoice is Confirmed Settled Bool>
      received: <Tokens Received Count Number>
    }]
  }

  @throws
  <Error>

  @returns
  {
    records: [{
      amount: <Amount of Tokens Received Number>
      category: <Record Category String>
      created_at: <Funds Received at ISO 8601 Date String>
      id: <Payment Preimage Hash Hex String>
      notes: <Record Description String>
      type: <Record Type String>
    }]
  }
*/
export default ({invoices}) => {
  if (!isArray(invoices)) {
    throw new Error('ExpectedArrayOfInvoicesToMapToAccountingRecords');
  }

  // Only consider invoices where funds were received
  const records = invoices
    .filter(n => !!n.confirmed_at && !!n.is_confirmed && !!n.received)
    .map(invoice => {
      const description = invoice.description.replace(/,/gim, ' ');

      const {payments} = invoice;

      const [payment] = payments;

      const fromKey = payment ? from(payment.messages) : null;
      const isKeySend = !payment ? false : !!hasKeySend(payment.messages);

      const fromTag = fromKey ? `Marked from ${fromKey.value}` : '';
      const pushTag = !isKeySend ? '' : '[Push Payment]';

      return {
        amount: invoice.received,
        category: harmony.categories.invoices,
        created_at: invoice.confirmed_at,
        id: invoice.id,
        notes: `${pushTag} ${fromTag} ${description || ''}`.trim(),
        type: harmony.types.income,
      };
    });

  return {records};
};
