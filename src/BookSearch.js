import React from 'react'
import * as BooksAPI from './BooksAPI'
import Book from'./Book'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class BookSearch extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    handleSelectedBook: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  searchResult = [];

  searchQuery = (newQuery) => {
    const validatedQuery = newQuery.replace(/[^a-zA-Z ]+/g, '').replace(/\s+/g, ' ')

    if (validatedQuery.length > 0) {
      BooksAPI.search(validatedQuery).then(booksFound => {
        this.searchResult = booksFound
        this.setState({query: validatedQuery})
      }).catch(() => {
        this.searchResult = [];
        this.setState({query: validatedQuery})
      })
    } else {
      this.searchResult = [];
      this.setState({query: ''})
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search" >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/* NOTE: The search from BooksAPI is limited to a particular set of search terms */}
            <input type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => {
                const newQuery = event.target.value
                this.searchQuery(newQuery)
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.searchResult.length > 0 &&
              this.searchResult.map(book => {
                this.props.books.forEach(bookInState => {
                  if (book.id === bookInState.id) {
                    book.shelf=bookInState.shelf
                  }
                })
                if (!book.shelf) {
                  book.shelf='none'
                }
                return (
                  <Book
                    key={book.id}
                    book={book}
                    handleSelectedBook={this.props.handleSelectedBook}
                  />
                )
              })
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch