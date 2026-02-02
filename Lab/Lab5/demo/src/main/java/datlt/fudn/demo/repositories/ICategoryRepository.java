package datlt.fudn.demo.repositories;

import datlt.fudn.demo.pojos.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoryRepository extends JpaRepository<Category, Integer> {
}
