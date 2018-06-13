# MyReads
---
[This](https://gfa61-ga.github.io/my-reads/build/) is a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read.

## Installation and Run

1. Clone this GitHub repository.
2. Go in the repository folder
3. Install all project dependencies with `npm install`
4.  Start the development server with `npm start`
5. With your server running, visit the app in your browser at: `http://localhost:3000/`

## App Functionality
In this application, the main page displays a list of "shelves" (i.e. categories), each of which contains a number of books. The three shelves are:

* Currently Reading
* Want to Read
* Read

Each book has a control that lets you select the shelf for that book. When you select a different shelf, the book moves there. The main page also has a link to /search, a search page that allows you to find books to add to your library.

The search page has a text input that may be used to find books. As the value of the text input changes, the books that match that query are displayed on the page, along with a control that lets you add the book to your library. The search page also has a link to / (the root URL), which leads back to the main page.

When you navigate back to the main page from the search page, you instantly see all of the selections, you made on the search page, in your library.

## Important
The [backend API](https://reactnd-books-api.udacity.com) uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Dependencies

The application's code is based on the code of Udacity/reactnd-project-myreads-starter [repository](https://github.com/udacity/reactnd-project-myreads-starter)  for the Front End Develpmpent students.

## License
This code is distributed under the [MIT license](https://opensource.org/licenses/MIT).
