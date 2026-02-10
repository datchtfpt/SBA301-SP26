package fu.se.chapter16jwt.repositories;

import org.springframework.data.repository.CrudRepository;

import fu.se.chapter16jwt.entities.Users;

import java.util.Optional;

public interface UserRepository extends CrudRepository<Users, Long> {

    Optional<Users> findByEmail(String email);

}
