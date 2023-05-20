import React from 'react';
import styles from '../styles/Works.module.css';

const Works: React.FC = () => {
  const listOfRedRisingCharacters = [
    {
      name: 'Darrow au Andromedus',
      faction: 'Red',
      height: "7'1",
    },
    {
      name: 'Mustang/Eliseo au Augustus',
      faction: 'Gold',
      height: "6'1",
    },
    {
      name: 'Sevro au Augustus',
      faction: 'Gold',
      height: "5'9",
    },
    {
      name: 'Victra au Julii',
      faction: 'Gold',
      height: "6'9",
    },
    {
      name: 'Cassius au Bellona',
      faction: 'Gold',
      height: "7'",
    },
    {
      name: 'Roque au Fabii',
      faction: 'Gold',
      height: "6'10",
    },
    {
      name: 'Aja au Grimmus',
      faction: 'Gold',
      height: "6'8",
    },
    {
      name: 'Pax au Telemanus',
      faction: 'Gold',
      height: "7'4",
    },
    {
      name: 'Kavax au Telemanus',
      faction: 'Gold',
      height: "7'2",
    },
    {
      name: 'Daxo au Telemanus',
      faction: 'Gold',
      height: "7'3",
    },
    {
      name: 'Ragnar Volarus',
      faction: 'Obsidian',
      height: "8'6",
    },
    {
      name: 'Dancer',
      faction: 'Red',
      height: "5'10",
    },
    {
      name: 'Harmony',
      faction: 'Red',
      height: "5'8",
    },
    {
      name: 'Mickey',
      faction: 'Violet',
      height: "5'6",
    },
    {
      name: 'Evey',
      faction: 'Pink',
      height: "5'4",
    },
    {
      name: 'Matteo',
      faction: 'Pink',
      height: "5'2",
    },
    {
      name: 'Theodora',
      faction: 'Pink',
      height: "5'0",
    },
    {
      name: 'Matron Carena',
      faction: 'Pink',
      height: "4'11",
    },
    {
      name: 'Fitchner au Barca',
      faction: 'Gold',
      height: "6'10",
    },
    {
      name: 'Antonia au Severus',
      faction: 'Gold',
      height: "6'7",
    },
    {
      name: 'Titus au Ladros',
      faction: 'Gold',
      height: "6'8",
    },
    {
      name: 'Tactus au Rath',
      faction: 'Gold',
      height: "6'6",
    },
    {
      name: 'Lorn au Arcos',
      faction: 'Gold',
      height: "6'10",
    },
    {
      name: 'Nero au Augustus',
      faction: 'Gold',
      height: "6'10",
    },
    {
      name: 'Octavia au Lune',
      faction: 'Gold',
      height: "5'10",
    },
    {
      name: 'Claudius au Augustus',
      faction: 'Gold',
      height: "6'7",
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className='text-3xl font-bold text-white mb-4'>
        Height and faction of Red Rising characters
      </h1>
      <div className='overflow-x-auto bg-gray-800 rounded-lg shadow overflow-y-auto relative'>
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
            {listOfRedRisingCharacters.map((character, index) => (
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
  );
};

export default Works;
