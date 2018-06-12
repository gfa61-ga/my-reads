import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    handleSelectedBook: PropTypes.func.isRequired
  }

  render() {
    const {book} = this.props
    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
              style={{ width: 128, height: 193,
              backgroundImage: book.imageLinks && `url(${book.imageLinks.thumbnail})`}}>
            </div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(event) => {
                  const toShelf = event.target.value
                  this.props.handleSelectedBook(book, toShelf)
                }}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
        </div>
      </li>
    )
  }
}

export default Book