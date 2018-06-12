import React from 'react'
import Book from'./Book'
import PropTypes from 'prop-types'

class BookShelf extends React.Component {
  static propTypes = {
    booksInShelf: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    handleSelectedBook: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

            {/* Display booksInShelf */
              this.props.booksInShelf.map(book =>
              <Book
                key={book.id}
                book={book}
                handleSelectedBook={this.props.handleSelectedBook}
              />
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf