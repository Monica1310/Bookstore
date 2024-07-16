import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Select, Button, message } from 'antd';
import './AddBook.css';

const { Option } = Select;

function AddBook() {
  const [title, setBookTitle] = useState('');
  const [author_id, setBookAuthorID] = useState('');
  const [genre_id, setBookGenreID] = useState('');
  const [price, setBookPrice] = useState('');
  const [publication_date, setBookDate] = useState('');
  const [Authors, setAuthors] = useState([]);
  const [Genres, setGenres] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State for success alert

  useEffect(() => {
    fetchAuthors();
    fetchGenres();
  }, []);

  const fetchAuthors = () => {
    axios
      .get('http://localhost:3001/authors')
      .then((response) => {
        let authors = response.data.map((item) => ({
          value: item.author_id,
          label: item.name,
        }));
        setAuthors(authors);
      })
      .catch((error) => console.error('Error fetching authors:', error));
  };

  const fetchGenres = () => {
    axios
      .get('http://localhost:3001/genres')
      .then((response) => {
        let genres = response.data.map((item) => ({
          value: item.genre_id,
          label: item.genre_name,
        }));
        setGenres(genres);
      })
      .catch((error) => console.error('Error fetching genres:', error));
  };

  const handleAddBook = () => {
    if (!title || !author_id || !genre_id || !price || !publication_date) {
      message.error('Please fill in all fields.');
      return;
    }

    axios
      .post('http://localhost:3001/books/', {
        title,
        author_id,
        genre_id,
        price: parseFloat(price), // Assuming price is sent as a number without currency symbol
        publication_date
      })
      .then((response) => {
        console.log('Book added:', response.data);
        setShowSuccessAlert(true); // Show success alert on successful addition
        // Optionally, clear the form fields after successful submission
        setBookTitle('');
        setBookAuthorID('');
        setBookGenreID('');
        setBookPrice('');
        setBookDate('');
      })
      .catch((error) => {
        console.error('Error adding book:', error);
        message.error('Error adding book. Please try again.');
      });
  };

  return (
    <div className="add-book-container">
      <h1>Add New Book</h1>
      <div className="add-book-form">
        <Input
          type="text"
          placeholder="Enter book title"
          value={title}
          onChange={(e) => setBookTitle(e.target.value)}
        />
        <Select
          options={Authors}
          size="large"
          onChange={setBookAuthorID}
          placeholder="Select author"
        />
        <Select
          options={Genres}
          size="large"
          onChange={setBookGenreID}
          placeholder="Select genre"
        />
        <Input
          type="text"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setBookPrice(e.target.value)}
        />
        <Input
          type="date"
          placeholder="Enter publication date"
          value={publication_date}
          onChange={(e) => setBookDate(e.target.value)}
        />
        <Button type="primary" onClick={handleAddBook}>
          Add Book
        </Button>
      </div>
      {showSuccessAlert && (
        <div className="success-alert">
          Book added successfully!
          <Button type="text" onClick={() => setShowSuccessAlert(false)}>Close</Button>
        </div>
      )}
    </div>
  );
}

export default AddBook;
