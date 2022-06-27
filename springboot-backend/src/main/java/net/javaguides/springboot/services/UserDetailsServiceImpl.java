package net.javaguides.springboot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.javaguides.springboot.model.User;
import net.javaguides.springboot.repository.UserRepository;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	UserRepository userRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		if(username.isEmpty()) {
			throw new UsernameNotFoundException("User Not Found with username: " + username);
		}
		User user = userRepository.findByUsername(username);
		return UserDetailsImpl.build(user);
	}
}