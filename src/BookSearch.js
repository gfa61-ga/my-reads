import React from 'react'
import * as BooksAPI from './BooksAPI'
import Book from'./Book'

class BookSearch extends React.Component {
  state = {
    query: ''
  }

  searchResult = [];

  searchQuery = (newQuery) => {
    const query = newQuery.replace(/[^a-zA-Z ]+/g, '').replace(/\s+/g, ' ')
    if (query.length > 0) {
      BooksAPI.search(query).then(booksFound => {
        console.log(query)
        console.log(booksFound)
        this.searchResult = booksFound
        this.setState({query: query})
      }).catch(() => {
        this.searchResult = [];
        this.setState({query: query})
      })
    } else {
      this.searchResult = [];
      this.setState({query: ''})
    }
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