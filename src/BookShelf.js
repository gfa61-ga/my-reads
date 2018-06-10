import React from 'react'
import Book from'./Book'
import PropTypes from 'prop-types'

class BookShelf extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    moveBook: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book =>
              <Book key={book.id} book={book} moveBook={this.props.moveBook}/>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf