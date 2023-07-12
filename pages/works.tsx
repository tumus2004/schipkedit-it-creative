import React, { useEffect, useState } from 'react';
import styles from '../styles/Works.module.css';
import listOfRedRisingCharacters from '../components/ListOfRedRisingCharHeights';

// Define the type for a character
type Character = {
  name: string;
  faction: string;
  height: string;
};

const Works: React.FC = () => {
  // Provide the type for the state variable
  const [sortedCharacters, setSortedCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const sorted = [...listOfRedRisingCharacters].sort((a, b) => {
      const aHeight =
        parseInt(a.height.split("'")[0]) * 12 +
        parseInt(a.height.split("'")[1]);
      const bHeight =
        parseInt(b.height.split("'")[0]) * 12 +
        parseInt(b.height.split("'")[1]);
      return bHeight - aHeight;
    });
    setSortedCharacters(sorted);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h1 className='text-2xl font-bold text-white mb-4 text-center'>
          Height and faction of Red Rising characters
        </h1>
        <div
          className='overflow-x-auto bg-gray-800 rounded-lg shadow overflow-y-auto relative'
          style={{ margin: 'auto', width: 'fit-content' }}>
          <table className={styles.table}>
            <thead>
              <tr className='text-left'>
                <th
                  className={`py-2 px-3 sticky top-0 border-b border-gray-700 bg-gray-800 text-gray-100 ${styles.tableCell}`}>
                  Name
                </th>
                <th
                  className={`py-2 px-3 sticky top-0 border-b border-gray-700 bg-gray-800 text-gray-100 ${styles.tableCell}`}>
                  Height
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedCharacters.map((character, index) => (
                <tr key={index} className={styles.row}>
                  <td className={`py-2 px-3 text-white ${styles.tableCell}`}>
                    {character.name}{' '}
                    <span className='text-gray-500'>({character.faction})</span>
                  </td>
                  <td className={`py-2 px-3 text-white ${styles.tableCell}`}>
                    {character.height}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Works;
