import AWS from 'aws-sdk';
import React, { useState } from 'react';
import ApiUtils from '../utils/ApiUtils';
import firebase, { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';
import { firebaseConfig } from '../firebase.config';

interface ListItem {
  name: string;
  babylist: string;
  brand?: string;
  providedBy?: string;
  checked?: boolean;
}

const BabyStuff: React.FC = () => {
  const [list, setList] = useState<ListItem[]>([]);
  const [newItem, setNewItem] = useState<{
    name: string;
    babylist: string;
    brand: string;
    providedBy: string;
    checked?: boolean;
  }>({ name: '', babylist: 'one', brand: '', providedBy: '', checked: false });

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const handleAdd = async () => {
    if (newItem.name) {
      try {
        const babyListRef = ref(database, 'babyList');
        await push(babyListRef, newItem);
        setNewItem({
          name: '',
          babylist: 'one',
          brand: '',
          providedBy: '',
          checked: false,
        });
      } catch (error) {
        console.error('Failed to add item', error);
      }
    }
  };

  const toggleChecked = (index: number) => {
    const newList = [...list];
    newList[index].checked = !newList[index].checked;
    setList(newList);
  };

  return (
    <>
      <div>
        <input
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          placeholder='Enter new item'
        />
        <input
          value={newItem.brand}
          onChange={(e) => setNewItem({ ...newItem, brand: e.target.value })}
          placeholder='Enter brand'
        />
        <input
          value={newItem.providedBy}
          onChange={(e) =>
            setNewItem({ ...newItem, providedBy: e.target.value })
          }
          placeholder='Enter provider'
        />
        <button onClick={handleAdd}>Add Item</button>
        <ul>
          {list.map((item, index) => (
            <li key={index}>
              <input
                type='checkbox'
                checked={item.checked}
                onChange={() => toggleChecked(index)}
              />
              {item.name} - {item.brand} - {item.providedBy}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BabyStuff;
