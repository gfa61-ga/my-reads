import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from'./BookShelf'
import BookSearch from'./BookSearch'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    booksInShelves: []
  }

  shelves = [
    {
      name: 'currentlyReading',
      title: 'Currently Reading'
    },
    {
      name: 'wantToRead',
      title: 'Want to Read'
    },
    {
      name: 'read',
      title: 'Read'
    }
  ]

  // When App is first loaded, get all booksInShelves from Server
  componentDidMount() {
    BooksAPI.getAll().then(books =>
      this.setState({booksInShelves: books})
    )
  }

  handleSelectedBook = (bookToMove, toShelf) => {
    this.setState((prevState) => {
      // If bookToMove is not in booksInShelves, add it
      if (bookToMove.shelf === 'none') {
        prevState.booksInShelves.push(bookToMove)
      }

      // If a shelf selected, move book toShelf, else remove it from booksInShelves
      if (toShelf !== 'none') {
        prevState.booksInShelves.find(book => (
          book.id === bookToMove.id)
        ).shelf = toShelf
      } else {
        prevState.booksInShelves = prevState.booksInShelves.filter(book => book.id !== bookToMove.id)
      }

      // Update bookShelves
      return {booksInShelves: prevState.booksInShelves}
    })

    // Update Server
    BooksAPI.update(bookToMove, toShelf)
  }

  render() {
    const {booksInShelves} = this.state

    return (
      <div className="app">

        <Route path='/search' render={() => (
          <BookSearch
            booksInShelves={booksInShelves}
            handleSelectedBook={this.handleSelectedBook}
          />
        )}/>

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>

                {/* Send booksInShelves in their shelves*/
                  this.shelves.map(shelf =>
                  <BookShelf
                    key={shelf.name}
                    booksInShelf={booksInShelves.filter(book => book.shelf === shelf.name)}
                    title={shelf.title}
                    handleSelectedBook={this.handleSelectedBook}
                  />
                )}
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
