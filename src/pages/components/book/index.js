import styles from './index.css';
import * as React from 'react';

class Book extends React.Component {
  constructor (props) {
    super(props);
  }
  render() { 
    const {book,indexOfList} = this.props
    const index = indexOfList + 1
    return (
      <div className={styles.book}>
        <h3 className={styles.index}>{index}. </h3> 
        <div className={styles.bookImageBox}>
          <img className={styles.bookImage} src={book.book_image} />
        </div>
        <div className={styles.detail}>
          <div className={styles.title}>{book.title}</div>
          <div className={styles.contributor}>{book.contributor}</div>
          <div className={styles.description}>{book.description}</div>
          <div className={styles.isbn}>ISBN: {book.isbns[0].isbn10}</div>
        </div>
      </div>
    )
  }
}
export default Book;
