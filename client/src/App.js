import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Space, Modal, Select, Input, Button } from "antd";

function App() {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [book, setBook] = useState({});
  const [title, setBookTitle] = useState("");
  const [author_id, setBookAuthorID] = useState("");
  const [genre_id, setBookGenreID] = useState("");
  const [price, setBookPrice] = useState("");
  const [publication_date, setBookDate] = useState("");
  const [Authors, setAuthors] = useState([]);
  const [Genres, setGenres] = useState([]);
  const [book_id, setBookId] = useState();
  const [reload, setReload] = useState(false);
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author_name",
      key: "author_name",
    },
    {
      title: "Genre Name",
      dataIndex: "genre_name",
      key: "genre_name",
    },
    {
      title: "Publication date",
      dataIndex: "publication_date",
      key: "publication_date",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Actions",
      dataIndex: "book_id",
      key: "book_id",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => {
            setOpen(true);
            setBookId(record.book_id);
            setBookTitle(record.title);
            setBookAuthorID(record.author_id);
            setBookGenreID(record.genre_id);
            setBookPrice(record.price);
            setBookDate(record.publication_date.split("T")[0]);       
          }}>Edit</a>
          <a onClick={()=>{
            deleteBook(record.book_id);
          }}>Delete</a>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    axios
      .get("http://localhost:3001/books")
      .then((response) => {
        console.error(response.data);
        setBooks(response.data);
      })
      .catch((error) => console.error("Error fetching books:", error));
      axios
      .get("http://localhost:3001/authors")
      .then((response) => {
       
        let authors = response.data.filter((item)=>{
          item["value"] = item.author_id;
          item["label"] = item.name;
          return item;
        })
        setAuthors(authors);
      })
      .catch((error) => console.error("Error fetching books:", error));
      axios
      .get("http://localhost:3001/genres")
      .then((response) => {
        let genres = response.data.filter((item)=>{
          item["value"] = item.genre_id;
          item["label"] = item.genre_name;
          return item;
        })
        setGenres(genres);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, [reload]);
  const handleOk = ()=>{
    setOpen(false);
    axios.put(`http://localhost:3001/books/${book_id}`, {
      title, author_id, genre_id, price, publication_date
    })
      .then(response => {
        console.log('Book added:', response.data);
        setReload(!reload);
      })
      .catch(error => console.error('Error adding book:', error));
  };
  const handleCancel = ()=>{
    setOpen(false);
    setAddModalOpen(false);
  }
  const deleteBook = (book_id)=>{
    axios.delete(`http://localhost:3001/books/${book_id}`).then(response =>{
      setReload(!reload);
    });
  }
  const addBook = ()=>{
    setBookTitle("")
    setBookPrice("");
    setBookDate("");
    setAddModalOpen(true);
    }
    const handleAddBook = ()=>{
      axios.post(`http://localhost:3001/books/`, {
        title, author_id, genre_id, price, publication_date
      })
        .then(response =>{
           console.log('Book added:', response.data);
            setReload(!reload);
            setAddModalOpen(false);
           
          })
        .catch(error => console.error('Error adding book:', error));
    }
  return (
    <div className="App">
      <header className="App-header">
        <Button type="primary" onClick={addBook}>Add Book</Button>
        <hr></hr>
        <Table dataSource={books} columns={columns} />;
        <Modal
          open={open}
          title="Title"
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Save"
          footer={(_, { OkBtn, CancelBtn }) => (
            <>
              <CancelBtn />
              <OkBtn />
            </>
          )}
        >
          <Input type="text" value={title} onChange={(e)=>setBookTitle(e.target.value)}></Input>
          <Select options={Authors} size ={"large"} onChange={setBookAuthorID} style={{width:"300px"}}></Select>
          <Select options={Genres} size ={"large"} onChange={setBookGenreID} style={{width:"300px"}}></Select>
          <Input type="text" value={price} onChange={(e)=>setBookPrice(e.target.value)}></Input>
          <Input type="text" value={publication_date} onChange={(e)=>setBookDate(e.target.value)}></Input>
        </Modal>
        <Modal
          open={addModalOpen}
          title="Add Book"
          onOk={handleAddBook}
          onCancel={handleCancel}
          okText="Add"
          footer={(_, { OkBtn, CancelBtn }) => (
            <>
              <CancelBtn />
              <OkBtn />
            </>
          )}
        >
          <Input type="text" value={title} onChange={(e)=>setBookTitle(e.target.value)}></Input>
          <Select options={Authors} size ={"large"} onChange={setBookAuthorID} style={{width:"300px"}}></Select>
          <Select options={Genres} size ={"large"} onChange={setBookGenreID} style={{width:"300px"}}></Select>
          <Input type="text" value={price} onChange={(e)=>setBookPrice(e.target.value)}></Input>
          <Input type="text" value={publication_date} onChange={(e)=>setBookDate(e.target.value)}></Input>
        </Modal>
      </header>
    </div>
  );
}

export default App;
