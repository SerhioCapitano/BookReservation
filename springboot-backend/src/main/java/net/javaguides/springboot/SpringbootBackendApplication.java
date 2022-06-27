package net.javaguides.springboot;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import net.javaguides.springboot.model.ERole;
import net.javaguides.springboot.model.Employee;
import net.javaguides.springboot.model.Role;
import net.javaguides.springboot.model.User;
import net.javaguides.springboot.repository.EmployeeRepository;
import net.javaguides.springboot.repository.RoleRepository;
import net.javaguides.springboot.repository.UserRepository;

@SpringBootApplication
public class SpringbootBackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootBackendApplication.class, args);
	}

	@Autowired
	private EmployeeRepository employeeRepository;

	@Override
	public void run(String... args) throws Exception {

	}
	
	@Bean
    public CommandLineRunner initialData(RoleRepository roleRepo, UserRepository userRepo, PasswordEncoder encoder) {
        return args -> {
       
            if(roleRepo.findByName(ERole.ROLE_USER).isEmpty()){
                roleRepo.save(new Role(ERole.ROLE_USER));
            }
            if(roleRepo.findByName(ERole.ROLE_ADMIN).isEmpty()){
                roleRepo.save(new Role(ERole.ROLE_ADMIN));
            }
            if(!userRepo.existsByEmail("admin@aa.aa")&&!userRepo.existsByUsername("admin")) {
                User user = new User();
                user.setEmail("admin@mail.lt");
                user.setPassword(encoder.encode("password"));
                user.setUsername("admin");
                user.setRoles(Set.of(roleRepo.findByName(ERole.ROLE_ADMIN).get()));
                userRepo.save(user);
	
	


        
	}
        };
	}
}

