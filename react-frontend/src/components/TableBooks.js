import React, {useState,useEffect}    from 'react'
import BookService from '../services/BookService'
import {Link} from 'react-router-dom';
const TableBooks = () => {
    const [books, setBooks] = useState([])


    useEffect(() => {
        getAllBooks();
    }, [])

    const getAllBooks = () => {
        BookService.getAllBooks().then((response) => {
            setBooks(response.data);
        }).catch(error => {
            console.log(error);
        })
    }
    const deleteBook =(bookId) =>{
        BookService.deleteBook(bookId).then((response) => {
        getAllBooks();
        }).catch(error => {
            console.log(error)
        })
    }
    const BooksTable = books.map(
        book => 
        <tr key={book.id}>
            <td>  {book.name} </td>
            <td>  {book.category} </td>
            <td>  {book.description}</td>
            <td>  {book.pagesCount}  </td>
            <td>  {book.isbn}</td>
            <td>
                <Link className='btn btn-info' to={`/edit-book/${book.id}`}>Update</Link>
                <button className='btn btn-danger' onClick={() => deleteBook(book.id)} style = {{marginLeft:"10px"}}>Delete</button>
            </td>
        </tr>   
    )
    

  return (
    <div className='container'>
        <h2 className='text-center'> List of Books</h2>
        <Link to = '/add-book' className='btn btn-primary mb-2'> Add Book</Link>
        <table className='table table-bordered table-striped'>
            <thead>
                <th>Name</th>
                <th>Category</th>
                <th>Description </th>
                <th>Pages</th>
                <th>ISBN</th>
                <th> Actions </th>
            </thead>
            <tbody>
                    {BooksTable}
            </tbody>
        </table>
    </div>
  )
}

export default TableBooks;