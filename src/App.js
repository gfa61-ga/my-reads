import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from'./BookShelf'
import BookSearch from'./BookSearch'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books =>
      this.setState({books})
    )
  }

  handleSelectedBook = (bookToMove, toShelf) => {
    this.setState((prevState) => {
      if (toShelf !== 'none') {
        prevState.books.find(book =>
          book.id === bookToMove.id).shelf = toShelf
      } else {
        prevState.books = prevState.books.filter((book) => book.id !== bookToMove.id)
      }
      return {books: prevState.books}
    })
    // BooksAPI.update(bookToMove, toShelf)
  }

  showSearchPage = () => {
    this.setState({ showSearchPage: false })
  }

  render() {
    const {books} = this.state
console.log(books)
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <BookSearch showSearchPage={this.showSearchPage}/>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf books={books.filter(book => book.shelf === 'currentlyReading')}
                  title='Currently Reading' handleSelectedBook={this.handleSelectedBook}/>
                <BookShelf books={books.filter(book => book.shelf === 'wantToRead')}
                  title='Want to Read' handleSelectedBook={this.handleSelectedBook}/>
                <BookShelf books={books.filter(book => book.shelf === 'read')}
                  title='Read' handleSelectedBook={this.handleSelectedBook}/>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
