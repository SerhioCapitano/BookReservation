import React, { useState, useEffect} from 'react'
import BookService from '../services/BookService'
import CategoryService from '../services/CategoryService';
import {useNavigate} from 'react-router-dom';
import {Link, useParams} from 'react-router-dom';
const AddCategoryComponent = () => {

    const [name, setName] = useState()
    const navigate = useNavigate();
    const {id} = useParams();



    const saveOrUpdateCategory = (e) => {
        e.preventDefault();

         const category = {name}
            if(id) {
                CategoryService.updateCategory(id,category).then((response) =>{
                    navigate('/category')
                }).catch(error =>{
                    console.log(error);
                })
            } else {
                CategoryService.createCategory(category).then((response) =>{
                    console.log(response.data)
                    navigate('/category')
                 }).catch(error => {
                     console.log(error)
                 })
            }
            }      
        

    useEffect(() => {
            CategoryService.getCategoryById(id).then((response) => {
                setName(response.data.name)
            }).catch(error => {
                console.log(error)
            })
    }, [])
    
   const  title =  () => {
        if(id) {
            return <h2 className='text-center'> Update Category</h2>
        } else {
            return <h2 className='text-center'> Add Category</h2>
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
                                <label className='form-label'>Category Name</label>
                                <input
                                type="text"
                                placeholder="Category"
                                name="name"
                                className="form-control"
                                value={name}
                                onChange= {(e) => setName(e.target.value)}
                                >

                                </input>
                            </div>


                                <button className='btn btn-success' onClick={(e) => saveOrUpdateCategory(e)}>Submit</button>
                                <Link to="/category" className="btn btn-danger"> Cancel</Link>

                        </form>
                        </div>
                </div>
            </div>
        </div>
        </div>
  )
}

export default AddCategoryComponent