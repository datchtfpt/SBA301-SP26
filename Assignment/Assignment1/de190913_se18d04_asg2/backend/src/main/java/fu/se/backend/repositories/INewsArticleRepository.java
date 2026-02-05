package fu.se.backend.repositories;

import fu.se.backend.pojos.NewsArticle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface INewsArticleRepository extends JpaRepository<NewsArticle,Integer> {
}
