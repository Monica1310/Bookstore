.add-book-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: #fff; /* Default background color */
        }
        
        .add-book-form {
          display: grid;
          grid-gap: 10px;
        }
        
        .success-alert {
          margin-top: 20px;
          padding: 10px;
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        /* Style for the text box with light brown background */
        .add-book-form input[type="text"],
        .add-book-form input[type="number"],
        .add-book-form input[type="date"],
        .add-book-form textarea,
        .add-book-form .ant-select-selection {
          background-color: #f5deb3; /* Light brown background color */
          border: 1px solid #ccc;
          padding: 8px;
          border-radius: 4px;
          width: 100%;
          box-sizing: border-box;
        }
        
        .add-book-form .ant-select-selection {
          background-color: #f5deb3; /* Light brown background color for Select component */
        }
        
        .add-book-form .ant-btn {
          background-color: #6b4e3d; /* Dark brown button background color */
          border-color: #6b4e3d;
          color: #fff;
        }
        
        .add-book-form .ant-btn:hover {
          background-color: #543a2b; /* Darker brown on hover */
          border-color: #543a2b;
        }
        
