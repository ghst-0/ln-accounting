/** Derive notes from a chain transaction

  {
    [description]: <Description Text String>
    output_addresses: [<Output Address String>]
    [transaction]: <Raw Transaction Hex String>
  }

  @returns
  {
    notes: <Harmony Record Notes String>
  }
*/
export default args => {
  const addresses = args.output_addresses.join(' ');

  if (!args.description) {
    return {notes: `Outputs to ${addresses}`};
  }

  return {notes: `${args.description} - Outputs to ${addresses}`};
};
