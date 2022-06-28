import axios from 'axios';
import authHeader from "./auth.header";


const EMPLOYEE_BASE_REST_API_URL = 'http://localhost:8080/books/categories';


class EmployeeService {
    getAllCategories() {
            return axios.get(EMPLOYEE_BASE_REST_API_URL, {headers: authHeader() });

    }

    createCategory(category) {
        return axios.post(EMPLOYEE_BASE_REST_API_URL, category,  { headers: authHeader() });
    }


    getCategoryById(categoryId) {
        return axios.get(EMPLOYEE_BASE_REST_API_URL + '/' + categoryId,  { headers: authHeader() });
    }


    updateCategory(categoryId,category) {
        return axios.put(EMPLOYEE_BASE_REST_API_URL + '/' + categoryId,category,  { headers: authHeader() });
    }

    deleteCategory(categoryId) {
        return axios.delete(EMPLOYEE_BASE_REST_API_URL + '/' + categoryId,  { headers: authHeader() });
    }


}

export default new EmployeeService();