import { useCallback, useEffect, useRef, useState } from "react";
import "./bookshelf.css";
import { Link } from "react-router-dom";

export default function BookShelf() {
  const [savedBooks, setSavedBooks] = useState([]);
  const [data, setData] = useState([]);

  const search = useRef();

  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (search.current) {
      setQuery(search.current.value);
    }
  };

  // Debounce function to limit the API calls
  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  // Function to fetch contacts from the API
  const fetchContacts = async (query) => {
    if (query) {
      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${query}&limit=10&page=1`
        );
        const result = await response.json();
        setData(result.docs);
        console.log(result.docs[0], "this is the data");
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    } else {
      setData([]);
    }
  };

  // Using useCallback to memoize the debounced function
  const debouncedFetchContacts = useCallback(
    debounce((query) => fetchContacts(query), 500),
    []
  );

  useEffect(() => {
    if (query) {
      debouncedFetchContacts(query);
    }
  }, [query, debouncedFetchContacts]);

  useEffect(() => {
    // Load saved books from localStorage when the component mounts
    const savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];
    setSavedBooks(savedBooks);
  }, []);

  function handleSave(book) {
    const savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];
    const { title, edition_count, _version_ } = book;
    const newBook = { title, edition_count, _version_ };
    // Check if the book is already saved
    if (
      !savedBooks.some((savedBook) => savedBook._version_ === book._version_)
    ) {
      const updatedBooks = [...savedBooks, newBook];
      localStorage.setItem("savedBooks", JSON.stringify(updatedBooks));
      setSavedBooks(updatedBooks); // Update state with the new list of saved books
      console.log("Saved BOOKS", updatedBooks);
    }
  }

  return (
    <>
      <div className="box">
        <div className="header">
          <h1>SEARCH BY BOOK NAME</h1>
          <input
            className="searchbar"
            placeholder="Search"
            type="text"
            ref={search}
            onChange={handleSearch}
          />
          <Link to="/myBook">
            <button className="myBook">My BookShelf</button>
          </Link>
        </div>
        <hr />
        <div>
          <ul>
            {data.length > 0 && (
              <div className="card-box">
                {data.map((book) => (
                  <li key={book._version_} className="card-details">
                    <div className="card-detail">
                      <b>Book Title:</b> {book.title}
                    </div>
                    <div className="card-detail">
                      <b>Edition Count:</b> {book.edition_count}
                      {!savedBooks.some(
                        (savedBook) => savedBook._version_ === book._version_
                      ) && (
                        <>
                          <div className="add-btn-div">
                            <button
                              className="add-btn"
                              onClick={() => handleSave(book)}
                            >
                              Add to your BookShelf
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
