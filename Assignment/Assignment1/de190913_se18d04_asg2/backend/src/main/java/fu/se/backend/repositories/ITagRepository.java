package fu.se.backend.repositories;

import fu.se.backend.pojos.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITagRepository extends JpaRepository<Tag,Integer> {
}
