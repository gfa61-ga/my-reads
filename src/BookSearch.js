import React from 'react'
import SearchResults from './SearchResults'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class BookSearch extends React.Component {
  static propTypes = {
    booksInShelves: PropTypes.array.isRequired,
    handleSelectedBook: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (newQuery) => {
    // Remove any non letter character and any leading space from query and let only one space between words
    const validatedQuery = newQuery.replace(/[^a-zA-Z ]+|^\s/g, '').replace(/\s+/g, ' ')

    this.setState({query: validatedQuery})
  }

  // Autofocus the input field
  componentDidMount(){
   this.inputField.focus();
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
            <input type="text" placeholder="Search by title or author"

              ref={thisInputElement =>
                /* Store a reference of this input element to this.inputField */
                this.inputField = thisInputElement
              }

              value={/* Display current query, as it is stored in state */
                this.state.query
              }

              onChange={event => {
                /* When query is updated, call updateQuery() method to handle it */
                const newQuery = event.target.value
                this.updateQuery(newQuery)
              }}
            />
          </div>
        </div>

        <SearchResults
          query={this.state.query}
          booksInShelves={this.props.booksInShelves}
          handleSelectedBook={this.props.handleSelectedBook}
        />
      </div>
    )
  }
}

export default BookSearch