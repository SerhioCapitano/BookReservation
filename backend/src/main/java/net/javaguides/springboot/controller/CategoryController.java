package net.javaguides.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.transaction.annotation.Transactional;
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
import net.javaguides.springboot.model.Book;
import net.javaguides.springboot.model.Category;
import net.javaguides.springboot.model.CategoryDTO;
import net.javaguides.springboot.repository.CategoryRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("books/categories")
public class CategoryController {
	
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	
	public CategoryController(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}
	
	@Secured({"ROLE_ADMIN" })
	@GetMapping
	public List<Category> getAllCategories() {
		return categoryRepository.findAll();
	}
	
	
	@Secured({"ROLE_ADMIN" })
	@PostMapping
	public Category createCategory(@RequestBody CategoryDTO categoryDTO) {
		
		Category category = new Category();
		
		category.setName(categoryDTO.getName());

		return categoryRepository.save(category);
		
		
	}
	
	@Secured({"ROLE_ADMIN" })
	@GetMapping("{id}")
	public Category getBookById(@PathVariable long id) {
		Category category = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found"));
		return category;
	}
	
	@Secured({"ROLE_ADMIN" })
	@PutMapping("/{id}")
	public Category updateCategory(@PathVariable("id") long id, @RequestBody Category categoryDTO) {
		
		Category category = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No such Category"));
		
		category.setName(categoryDTO.getName());
		
		return categoryRepository.save(category);
		
	}
	
	
	@DeleteMapping("{id}")
	public void deleteCategory(@PathVariable long id) {
		Category category = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("category not found"));
		categoryRepository.delete(category);
		}
	} 	

