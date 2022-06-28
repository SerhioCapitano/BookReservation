package net.javaguides.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.javaguides.springboot.model.Category;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{
	
	Boolean existsByName(String name);
	Category findByName(String name);
	void deleteByName(String name);

}
