package net.javaguides.springboot.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Employee;
import net.javaguides.springboot.model.User;
import net.javaguides.springboot.repository.EmployeeRepository;
import net.javaguides.springboot.repository.UserRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {

	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private UserRepository userRepo;
	
	
	public EmployeeController(EmployeeRepository employeeRepository) {
		this.employeeRepository = employeeRepository;
	}
	
	
	
	@Secured({"ROLE_USER" })
	@GetMapping
	public List<Employee> getAllEmployeesByUser() {
		String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userRepo.findByUsername(currentUsername);
		List<Employee> allEmployees = employeeRepository.findAll();
		List<Employee> employees = new ArrayList<>();
		for(Employee employee : allEmployees) {
			if(employee.getUser().getUsername().equals(user.getUsername())) {	
				employees.add(employee);
			}
		}
 		return employees;
	}

	// build create employee REST API
	@Secured({"ROLE_USER" })
	@PostMapping
	public Employee createEmployee(@RequestBody Employee employee) {
		String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userRepo.findByUsername(currentUsername);
		employee.setUser(user);
		return employeeRepository.save(employee);
	}

	// build get employee by id REST API
	@Secured({"ROLE_USER" })
	@GetMapping("{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable long id) {
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));
		return ResponseEntity.ok(employee);
	}

	// build update employee REST API
	@Secured({"ROLE_USER" })
	@PutMapping("{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable long id, @RequestBody Employee employeeDetails) {
		Employee updateEmployee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));

		updateEmployee.setFirstName(employeeDetails.getFirstName());
		updateEmployee.setLastName(employeeDetails.getLastName());
		updateEmployee.setEmailId(employeeDetails.getEmailId());

		employeeRepository.save(updateEmployee);

		return ResponseEntity.ok(updateEmployee);

	}
	@Secured({"ROLE_USER" })
	@DeleteMapping("{id}")
	public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable long id) {
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));

		employeeRepository.delete(employee);

		return new ResponseEntity<>(HttpStatus.NO_CONTENT);

	}
}
