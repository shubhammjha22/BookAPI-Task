import "./myBookShelf.css";

export default function MyBookShelf() {
  const data = JSON.parse(localStorage.getItem("savedBooks")) || [];

  return (
    <>
      <div className="box">
        <div className="header">
          <h1>MY BOOKSHELF</h1>
        </div>
        <hr />
        <div>
          <ul>
            {data.length === 0 && <p>No Books are Saved</p>}
            {data.length > 0 && (
              <div className="card-box">
                {data.map((book) => (
                  <li key={book._version_} className="card-details">
                    <div className="card-detail">
                      <b>Book Title:</b> {book.title}
                    </div>
                    <div className="card-detail">
                      <b>Edition Count:</b> {book.edition_count}
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
