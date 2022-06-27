import axios from 'axios';
import authHeader from "./auth.header";


const EMPLOYEE_BASE_REST_API_URL = 'http://localhost:8080/api/v1/employees';


class EmployeeService {
    getAllEmployees() {
            return axios.get(EMPLOYEE_BASE_REST_API_URL, {headers: authHeader() });

    }

    createEmployee(employee) {
        return axios.post(EMPLOYEE_BASE_REST_API_URL, employee,  { headers: authHeader() });
    }


    getEmployeeById(employeeId) {
        return axios.get(EMPLOYEE_BASE_REST_API_URL + '/' + employeeId,  { headers: authHeader() });
    }


    updateEmployee(employeeId,employee) {
        return axios.put(EMPLOYEE_BASE_REST_API_URL + '/' + employeeId,employee,  { headers: authHeader() });
    }

    deleteEmployee(employeeId) {
        return axios.delete(EMPLOYEE_BASE_REST_API_URL + '/' + employeeId,  { headers: authHeader() });
    }


}

export default new EmployeeService();