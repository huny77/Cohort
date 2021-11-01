package com.cohort.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.cohort.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByMail(String mail);
}
