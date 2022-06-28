package net.javaguides.springboot.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookDTO {

	private long id;
	
	private String name;
	
	private String description;
	
	private long ISBN;
	
	private short PagesCount;
	
	private String category;
	
}	
