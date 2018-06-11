import React from 'react'
import * as BooksAPI from './BooksAPI'
import Book from'./Book'

class BookSearch extends React.Component {
  state = {
    query: ''
  }

  searchResult = [];

  searchQuery = (newQuery) => {
    const query = newQuery.replace(/[^a-zA-Z ]+/g, '').replace(/\s+/g, ' ').split(' ')
    BooksAPI.search(query[0]).then(booksFound => {
      this.searchResult = booksFound ? booksFound : []
      for (let i = 1; i < query.length; i++) {
        this.searchResult = this.searchResult.filter(book =>
          book.title.toLowerCase().includes(query[i].toLowerCase()) ||
            (book.authors && book.authors.join(' ').toLowerCase().includes(query[i].toLowerCase()))
          )
        }
      this.setState({query: query.join(' ')})
    })
  }

  render() {
    const {query} = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={this.props.showSearchPage}>Close</a>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don`t worry if
              you don`t find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => {
                const newQuery = event.target.value
                this.searchQuery(newQuery)
              }}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.searchResult.length > 0 &&
              this.searchResult.map(book =>
                <Book key={book.id} book={book} />
              )
            }
          </ol>
        </div>
      </div>
    )
  }
}
export default BookSearch