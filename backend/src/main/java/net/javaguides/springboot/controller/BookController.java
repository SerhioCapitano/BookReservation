package net.javaguides.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
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
import net.javaguides.springboot.model.BookDTO;
import net.javaguides.springboot.repository.BookRepository;
import net.javaguides.springboot.repository.UserRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/books")
public class BookController {
	
	@Autowired
	private BookRepository bookRepository;
	
	@Autowired
	private UserRepository userRepo;
	
	public BookController(BookRepository bookRepository) {
		this.bookRepository = bookRepository;
	}
	
	@Secured({"ROLE_ADMIN" })
	@GetMapping
	public List<Book> getAllBooks() {
		return bookRepository.findAll();
	}
	
	@Secured({"ROLE_ADMIN" })
	@PostMapping
	public Book createBook(@RequestBody BookDTO bookDTO) {
			Book book = new Book();
			
			book.setCategory(bookDTO.getCategory());
			book.setDescription(bookDTO.getDescription());
			book.setName(bookDTO.getName());
			book.setISBN(bookDTO.getISBN());
			book.setPagesCount(bookDTO.getPagesCount());
			
			
			return bookRepository.save(book);
		
	}
	
	@Secured({"ROLE_ADMIN" })
	@PutMapping("{id}")
	public Book updateBook(@PathVariable long id, @RequestBody Book bookDTO) {
			Book book = bookRepository.findById(id).orElseThrow(() ->  new ResourceNotFoundException("Book not found"));
				
			book.setCategory(bookDTO.getCategory());
			book.setDescription(bookDTO.getDescription());
			book.setName(bookDTO.getName());
			book.setISBN(bookDTO.getISBN());
			book.setPagesCount(bookDTO.getPagesCount());
			
			return bookRepository.save(book);
			
	}
	@Secured({"ROLE_ADMIN" })
	@GetMapping("{id}")
	public Book getBookById(@PathVariable long id) {
		Book book = bookRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Book not found"));
		return book;
	}
	
	@Secured({"ROLE_ADMIN" })
	@DeleteMapping("{id}")
	public ResponseEntity<HttpStatus> deleteBook(@PathVariable long id) {
		Book book = bookRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Book not found"));
				
		bookRepository.delete(book);
		
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	
	
	
	
}
