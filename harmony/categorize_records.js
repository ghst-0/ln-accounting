import harmony from './harmony.json' with { type: 'json' };
import harmonize from './harmonize.js';

const {isArray} = Array;
const {keys} = Object;

/** Categorize records

  {
    records: [{
      [amount]: <Amount Number>
      [asset]: <Asset Type String>
      category: <Category String>
      created_at: <ISO 8601 Date String>
      [external_id]: <External Reference Id String>
      [from_id]: <Source Id String>
      [id]: <Record Id String>
      [notes]: <Notes String>
      [to_id]: <Destination Id String>
      [type]: <Record Type String>
    }]
  }

  @throws
  <Error>

  @returns
  {
    $category: [{
      [amount]: <Amount Number>
      [asset]: <Asset Type String>
      [created_at]: <ISO 8601 Date String>
      [external_id]: <External Reference Id String>
      [from_id]: <Source Id String>
      [id]: <Record Id String>
      [notes]: <Notes String>
      [to_id]: <Destination Id String>
      [type]: <Record Type String>
    }]
    [$category_csv]: <CSV String>
  }
*/
export default ({records}) => {
  if (!isArray(records)) {
    throw new Error('ExpectedRecordsArrayToCategorize');
  }

  records.sort((a, b) => a.created_at < b.created_at ? -1 : 1);

  const report = {};

  keys(harmony.categories).forEach(category => {
    const categoryRecords = records.filter(n => n.category === category);

    report[category] = categoryRecords;
    report[`${category}_csv`] = harmonize({records: categoryRecords}).csv;
  });

  return report;
};
