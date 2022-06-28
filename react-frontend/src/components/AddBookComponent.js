import React, { useState, useEffect} from 'react'
import BookService from '../services/BookService'
import CategoryService from '../services/CategoryService';
import {useNavigate} from 'react-router-dom';
import {Link, useParams} from 'react-router-dom';
const AddBookComponent = () => {

    const [name, setName] = useState()
    const [category, setCategory] = useState()
    const [description, setDescription] = useState()
    const [pagesCount, setPagesCount] = useState()
    const [isbn, setIsbn] = useState()
    const navigate = useNavigate();
    const {id} = useParams();
    const [categories, setCategories] = useState([]);


    const getAllCategories = () => {
        CategoryService.getAllCategories().then((response) => {
            setCategories(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        getAllCategories();
        console.log(categories);
    }, [])


    const CategoryTable = categories.map(
        category => 
        <option value={category.name}>{category.name}</option>
    )

    const saveOrUpdateBook = (e) => {
        e.preventDefault();

         const book = {name ,category,description,pagesCount,isbn}
            if(id) {
                BookService.updateBook(id,book).then((response) =>{
                    navigate('/books')
                }).catch(error =>{
                    console.log(error);
                })
            } else {
                BookService.createBook(book).then((response) =>{
                    console.log(response.data)
                    navigate('/books')
        
                 }).catch(error => {
                     console.log(error)
                 })
            }
            }      
        

    useEffect(() => {
            BookService.getBookById(id).then((response) => {
                setName(response.data.name)
                setCategory(response.data.category)
                setDescription(response.data.description)
                setPagesCount(response.data.pagesCount)
                setIsbn(response.data.isbn)
            }).catch(error => {
                console.log(error)
            })
    }, [])
    
   const  title =  () => {
        if(id) {
            return <h2 className='text-center'> Update Book</h2>
        } else {
            return <h2 className='text-center'> Add Book</h2>
        }
    }
  return (
    <div>
        <br /> <br />
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        title()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Book Category</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)} style={{padding: 10, margin: 10,}}>
                                    {CategoryTable}
                                </select>
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Book Name</label>
                                <input
                                placeholder="Book name"
                                name="name"
                                className="form-control"
                                value={name}
                                onChange= {(e) => setName(e.target.value)}
                                >

                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Book Description</label>
                                <input
                                type="text"
                                placeholder="Book Description"
                                name="description"
                                className="form-control"
                                value={description}
                                onChange= {(e) => setDescription(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Book Pages Count</label>
                                <input
                                type="number"
                                placeholder="Book pages Count"
                                name="pages"
                                className="form-control"
                                value={pagesCount}
                                onChange= {(e) => setPagesCount(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Book ISBN</label>
                                <input
                                type="number"
                                placeholder="ISBN CODE"
                                name="isbn"
                                className="form-control"
                                value={isbn}
                                onChange= {(e) => setIsbn(e.target.value)}
                                >
                                </input>
                            </div>


                                <button className='btn btn-success' onClick={(e) => saveOrUpdateBook(e)}>Submit</button>
                                <Link to="/books" className="btn btn-danger"> Cancel</Link>

                        </form>
                        </div>
                </div>
            </div>
        </div>
        </div>
  )
}

export default AddBookComponent