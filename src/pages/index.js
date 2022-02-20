import styles from './index.css';
import * as React from 'react';
import  'whatwg-fetch'
import Book from './components/book'

//Using the NYT Books API, build the following UI to display today’s “paperback-nonfiction” best sellers.
//You may create your own NYT Developer account and generate a personal API key or use this one: TCA6F3ERSCl405KagmGI7MIe8rn2bu2U
// API reference:
// https://developer.nytimes.com/docs/books-product/1/overview

//sort books by Rank, Title, Author, and ISBN

class ListPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      order: 'Rank',
      books:[],
      currentBooksDisplay:5
    }
  }
  componentDidMount() {
    this.loadList({
      "api-key":"TCA6F3ERSCl405KagmGI7MIe8rn2bu2U"
    })
  }
  loadList = payload => {
    let date = new Date()
    var Y = date.getFullYear();
    var M = date.getMonth() + 1;
    var D = date.getDate();
    var times = Y + (M < 10 ? "-0" : "-") + M + (D < 10 ? "-0" : "-") + D;
    let url = 'https://api.nytimes.com/svc/books/v3/lists/'+ String(times)  +'/paperback-nonfiction.json'
    var queryString = Object.keys(payload).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(payload[key])
      }).join('&');
    url += '?' + queryString
    fetch(url, {
      method: "GET",
      mode: 'cors',
    })
    .then(response => response.json())
    .then(json => {
      // console.log('i get'+JSON.stringify(json))
      const {results} = json
      const {books} = results
      this.setState({books: books})
    })
    .catch(e =>  {
       console.log('error:'+e)
    })
  }
  updateFilter = e => {
    let orderBy = null
    switch(e.target.value) {
      case 'Rank':
        orderBy = (current,next) => {
          return current.rank > next.rank ? 1 : -1
        }
         break;
      case 'Title':
        orderBy = (current,next) => {
          return current.title > next.title ? 1 : -1
        }
         break;
      case 'Author':
        orderBy = (current,next) => {
          return current.author > next.author ? 1 : -1
        }
         break;
      case 'ISBN':
        orderBy = (current,next) => {
          return current.isbns[0].isbn10 > next.isbns[0].isbn10 ? 1 : -1
        }
         break;
      default:
        // console.log(e.target.value)
    } 
    const { books } = this.state
    let orderedBooks = books
    orderedBooks.sort(orderBy)
    this.setState({
      books: orderedBooks,
      currentBooksDisplay: 5
    })
  }
  showMore = () => {
    const {currentBooksDisplay} = this.state
    this.setState({currentBooksDisplay: currentBooksDisplay + 5})
  }
  render() { 
    const { books, currentBooksDisplay } = this.state
    return (
      <div className={styles.normal}>
        <div className={styles.panel}>  
          <div className={styles.title}>Paperback Nonfiction Bestsellers</div>
          <div className={styles.dropdown}>  
            <div>Sort by:</div>
            <select onChange={this.updateFilter}>
              <option>Rank</option>
              <option>Title</option>
              <option>Author</option>
              <option>ISBN</option>
            </select>
          </div>
        </div>
        <ul className={styles.list}>
          { books.map((book,index) => 
            <Book book={book} key={index} indexOfList={index} ></Book>
          ).slice(0,currentBooksDisplay)
          }
        </ul>
        <div className={styles.moreBtn} onClick={this.showMore}>SHOW MORE</div>
      </div>
    )
  }
}
export default ListPage;