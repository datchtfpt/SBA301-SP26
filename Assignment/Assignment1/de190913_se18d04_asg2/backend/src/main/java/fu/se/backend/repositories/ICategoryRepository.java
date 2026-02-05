package fu.se.backend.repositories;

import fu.se.backend.pojos.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoryRepository extends JpaRepository<Category,Integer> {
}
