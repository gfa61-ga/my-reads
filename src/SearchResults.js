import React from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class SearchResults extends React.Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    booksInShelves: PropTypes.array.isRequired,
    handleSelectedBook: PropTypes.func.isRequired
  }

  state = {
    searchResult: []
  }

  // When there is a query update, make a new search
  componentWillReceiveProps = (newProps) => {
    const thisSearchRequestQuery = newProps.query
    const currentQueryBeforeSearchRequest = this.props.query

    /* If the new query has changed, then handle it
     * In any case, finally call setState() to display the new searchResult
     */
    if (thisSearchRequestQuery !== currentQueryBeforeSearchRequest) {

      // If thisSearchRequestQuery is not empty, search on server for books that match the query
      if (thisSearchRequestQuery.length > 0) {
        BooksAPI.search(newProps.query).then(booksFound => {

          const currentQueryAfterSearchRequest = this.props.query

          /* In case the currentQuery has been updated until to fetch the search results,
           * there is no need to display the results of this search request
           * A newer search request will fetch and display the resurls for the updated query
           */
          if (thisSearchRequestQuery === currentQueryAfterSearchRequest) {
              this.setState({searchResult: booksFound})
          }
        }).catch(() => // If server search request returns a 'query not found error' catch it
         this.setState({searchResult: []}) //  and clear previous searchResult
        )
      } else { // If thisSearchRequestQuery is empty, clear previous searchResult
         this.setState({searchResult: []})
      }
    }
  }

  render() {
  const {searchResult} = this.state

    return (
      <div className="search-books-results">
        <ol className="books-grid">

          {/* If there are books found, render them */
            searchResult.length > 0 && searchResult.map(book => {

              /* If the found book is allready in bookInShelves, set his shelf */
              this.props.booksInShelves.forEach(bookInShelves => {
                if (book.id === bookInShelves.id) {
                  book.shelf=bookInShelves.shelf
                }
              })

              /* If the found book is NOT allready in bookInShelves, set his shelf equal to 'none' */
              if (!book.shelf) {
                book.shelf='none'
              }

              /* Render the book */
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
    )
  }
}

export default SearchResults