/** Notes as formatted for records

  {
    [notes]: <Notes String>
  }

  @returns
  {
    notes: <Formatted Notes String>
  }
*/
const formattedNotes = ({notes}) => {
  if (typeof notes === 'string') {
    return {notes: notes.replaceAll(/[\r\n]/gim, ' ') || ''};
  }

  return {notes: notes || ''};
};

export { formattedNotes }
