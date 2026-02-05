package fu.se.backend.services;

import fu.se.backend.pojos.NewsArticle;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface INewArticleService {

    public NewsArticle create(NewsArticle article);

    public NewsArticle update(Integer id, NewsArticle article);
    
    public NewsArticle getArticle(Integer id);

    public List<NewsArticle> getAllArticles();

    public ResponseEntity<String> delete(Integer id);
}
