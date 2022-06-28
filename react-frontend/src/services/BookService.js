import axios from 'axios';
import authHeader from "./auth.header";


const EMPLOYEE_BASE_REST_API_URL = 'http://localhost:8080/books';


class EmployeeService {
    getAllBooks() {
            return axios.get(EMPLOYEE_BASE_REST_API_URL, {headers: authHeader() });

    }

    createBook(book) {
        return axios.post(EMPLOYEE_BASE_REST_API_URL, book,  { headers: authHeader() });
    }


    getBookById(bookId) {
        return axios.get(EMPLOYEE_BASE_REST_API_URL + '/' + bookId,  { headers: authHeader() });
    }


    updateBook(bookId,book) {
        return axios.put(EMPLOYEE_BASE_REST_API_URL + '/' + bookId,book,  { headers: authHeader() });
    }

    deleteBook(bookId) {
        return axios.delete(EMPLOYEE_BASE_REST_API_URL + '/' + bookId,  { headers: authHeader() });
    }


}

export default new EmployeeService();