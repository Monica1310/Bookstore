import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Space, Button, Modal, Input, Select, message } from 'antd';
import './Books.css';

const { Option } = Select;

function Books() {
  const [books, setBooks] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editBook, setEditBook] = useState({});
  const [title, setTitle] = useState('');
  const [author_id, setAuthorId] = useState('');
  const [genre_id, setGenreId] = useState('');
  const [price, setPrice] = useState('');
  const [publication_date, setPublicationDate] = useState('');
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
    fetchGenres();
  }, []);

  const fetchBooks = () => {
    axios.get('http://localhost:3001/books')
      .then(response => {
        setBooks(response.data.map(book => ({
          ...book,
          publication_date: book.publication_date.split('T')[0], // Format to show only date
          price: `₹ ${book.price}` // Format price to include Indian Rupee symbol
        })));
      })
      .catch(error => console.error('Error fetching books:', error));
  };

  const fetchAuthors = () => {
    axios.get('http://localhost:3001/authors')
      .then(response => {
        setAuthors(response.data);
      })
      .catch(error => console.error('Error fetching authors:', error));
  };

  const fetchGenres = () => {
    axios.get('http://localhost:3001/genres')
      .then(response => {
        setGenres(response.data);
      })
      .catch(error => console.error('Error fetching genres:', error));
  };

  const deleteBook = (book_id) => {
    axios.delete(`http://localhost:3001/books/${book_id}`)
      .then(response => {
        setBooks(books.filter(book => book.book_id !== book_id));
      })
      .catch(error => console.error('Error deleting book:', error));
  };

  const showEditModal = (book) => {
    setEditBook(book);
    setTitle(book.title);
    setAuthorId(book.author_id);
    setGenreId(book.genre_id);
    setPrice(book.price.split(' ')[1]); // Extracting the price value
    setPublicationDate(book.publication_date);
    setEditModalVisible(true);
  };

  const handleEditModalOk = () => {
    if (!title || !author_id || !genre_id || !price || !publication_date) {
      message.error('Please fill in all fields.');
      return;
    }

    axios.put(`http://localhost:3001/books/${editBook.book_id}`, {
      title,
      author_id,
      genre_id,
      price: parseFloat(price), // Assuming price is sent as a number without currency symbol
      publication_date
    })
      .then(response => {
        setEditModalVisible(false);
        fetchBooks(); // Refresh the books list after edit
      })
      .catch(error => console.error('Error editing book:', error));
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author_name',
      key: 'author_name',
    },
    {
      title: 'Genre',
      dataIndex: 'genre_name',
      key: 'genre_name',
    },
    {
      title: 'Publication Date',
      dataIndex: 'publication_date',
      key: 'publication_date',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => showEditModal(record)}>Edit</Button>
          <Button type="link" onClick={() => deleteBook(record.book_id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="books-container">
      <h1>Books List</h1>
      <Table
        className="books-table"
        dataSource={books}
        columns={columns}
        rowKey="book_id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Edit Book"
        visible={editModalVisible}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
      >
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Select placeholder="Select Author" value={author_id} onChange={(value) => setAuthorId(value)} style={{ width: '100%', marginTop: '1rem' }}>
          {authors.map(author => (
            <Option key={author.author_id} value={author.author_id}>{author.name}</Option>
          ))}
        </Select>
        <Select placeholder="Select Genre" value={genre_id} onChange={(value) => setGenreId(value)} style={{ width: '100%', marginTop: '1rem' }}>
          {genres.map(genre => (
            <Option key={genre.genre_id} value={genre.genre_id}>{genre.genre_name}</Option>
          ))}
        </Select>
        <Input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} style={{ marginTop: '1rem' }} />
        <Input placeholder="Publication Date" value={publication_date} onChange={(e) => setPublicationDate(e.target.value)} style={{ marginTop: '1rem' }} />
      </Modal>
    </div>
  );
}

export default Books;
