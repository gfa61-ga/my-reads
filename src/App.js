import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from'./BookShelf'
import BookSearch from'./BookSearch'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books =>
      this.setState({books})
    )
  }

  handleSelectedBook = (bookToMove, toShelf) => {
    this.setState((prevState) => {
      if (bookToMove.shelf === 'none') {
        prevState.books.push(bookToMove)
      }
      if (toShelf !== 'none') {
        prevState.books.find(book =>
          book.id === bookToMove.id).shelf = toShelf
      } else {
        prevState.books = prevState.books.filter((book) => book.id !== bookToMove.id)
      }
      return {books: prevState.books}
    })
    BooksAPI.update(bookToMove, toShelf)
  }

  render() {
    const {books} = this.state
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <BookSearch
            books={this.state.books}
            handleSelectedBook={this.handleSelectedBook}/>
        )}/>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  books={books.filter(book => book.shelf === 'currentlyReading')}
                  title='Currently Reading'
                  handleSelectedBook={this.handleSelectedBook}/>
                <BookShelf
                  books={books.filter(book => book.shelf === 'wantToRead')}
                  title='Want to Read'
                  handleSelectedBook={this.handleSelectedBook}/>
                <BookShelf
                  books={books.filter(book => book.shelf === 'read')}
                  title='Read'
                  handleSelectedBook={this.handleSelectedBook}/>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>
                Add a book
              </Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
