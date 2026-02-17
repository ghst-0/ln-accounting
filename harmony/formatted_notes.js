/** Notes as formatted for records

  {
    [notes]: <Notes String>
  }

  @returns
  {
    notes: <Formatted Notes String>
  }
*/
export default ({notes}) => {
  if (typeof notes === 'string') {
    return {notes: notes.replaceAll(/[\r\n]/gim, ' ') || ''};
  }

  return {notes: notes || ''};
};
