import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '' });
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/items');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditItem({ ...editItem, [name]: value });
    };

    const addItem = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/items', newItem);
            setItems([...items, response.data]);
            setNewItem({ name: '', description: '' });
        } catch (error) {
            console.error('Error adding item', error);
        }
    };

    const updateItem = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/items/${editItem._id}`, editItem);
            setItems(items.map(item => item._id === editItem._id ? response.data : item));
            setEditItem(null);
        } catch (error) {
            console.error('Error updating item', error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/items/${id}`);
            setItems(items.filter(item => item._id !== id));
        } catch (error) {
            console.error('Error deleting item', error);
        }
    };

    return (
        <div>
            <h1>MERN Stack with Vite</h1>
            <div>
                <h2>Add Item</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newItem.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newItem.description}
                    onChange={handleChange}
                />
                <button onClick={addItem}>Add</button>
            </div>
            <div>
                <h2>Items</h2>
                {Array.isArray(items) && items.map(item => (
                    <div key={item._id}>
                        <p>{item.name}: {item.description}</p>
                        <button onClick={() => setEditItem(item)}>Edit</button>
                        <button onClick={() => deleteItem(item._id)}>Delete</button>
                    </div>
                ))}
            </div>
            {editItem && (
                <div>
                    <h2>Edit Item</h2>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={editItem.name}
                        onChange={handleEditChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={editItem.description}
                        onChange={handleEditChange}
                    />
                    <button onClick={updateItem}>Update</button>
                </div>
            )}
        </div>
    );
};

export default App;
