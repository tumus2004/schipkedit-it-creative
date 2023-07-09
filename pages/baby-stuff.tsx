import React, { useState } from 'react';

interface ListItem {
  name: string;
  checked: boolean;
}

const BabyItems: React.FC = () => {
  const [list, setList] = useState<ListItem[]>([]);
  const [newItem, setNewItem] = useState<string>('');

  const handleAdd = () => {
    if (newItem) {
      setList([...list, { name: newItem, checked: false }]);
      setNewItem('');
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
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder='Enter new item'
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
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BabyItems;
