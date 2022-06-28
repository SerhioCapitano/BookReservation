import React, {useState,useEffect}    from 'react'
import {Link} from 'react-router-dom';
import CategoryService from '../services/CategoryService';
const CategoryTable = () => {
    const [categories, setCategories] = useState([])


    useEffect(() => {
        getAllCategories();
    }, [])

    const getAllCategories = () => {
        CategoryService.getAllCategories().then((response) => {
            setCategories(response.data);
        }).catch(error => {
            console.log(error);
        })
    }
    const deleteCategory =(categoryId) =>{
        CategoryService.deleteCategory(categoryId).then((response) => {
        getAllCategories();
        }).catch(error => {
            console.log(error)
        })
    }
    const CategoriesTable = categories.map(
        category => 
        <tr key={category.id}>
            <td>  {category.name} </td>
            <td>
                <Link className='btn btn-info' to={`/edit-category/${category.id}`}>Update</Link>
                <button className='btn btn-danger' onClick={() => deleteCategory(category.id)}  style = {{marginLeft:"10px"}}>Delete</button>
            </td>
        </tr>   
    )
    

  return (
    <div className='container'>
        <h2 className='text-center'>List of Categories</h2>
        <Link to = '/add-category' className='btn btn-primary mb-2'> Add Category</Link>
        <table className='table table-bordered table-striped'>
            <thead>
                <th>Name</th>
            </thead>
            <tbody>
                    {CategoriesTable}
            </tbody>
        </table>
    </div>
  )
}

export default CategoryTable;