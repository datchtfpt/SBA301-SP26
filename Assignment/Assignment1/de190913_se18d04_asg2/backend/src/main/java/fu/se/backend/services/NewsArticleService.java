package fu.se.backend.services;

import fu.se.backend.pojos.NewsArticle;
import fu.se.backend.repositories.INewsArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsArticleService implements INewsArticleService {

    @Autowired
    private INewsArticleRepository repository;

    @Override
    public NewsArticle create(NewsArticle article) {
        return repository.save(article);
    }

    @Override
    public NewsArticle update(Integer id, NewsArticle article) {
        NewsArticle oldArticle = getArticle(id);
        if (oldArticle != null) {
            oldArticle.setCategory(article.getCategory());
            oldArticle.setHeadline(article.getHeadline());
            oldArticle.setNewsContent(article.getNewsContent());
            oldArticle.setNewsSource(article.getNewsSource());
            oldArticle.setNewsTitle(article.getNewsTitle());
            oldArticle.setNewsStatus(article.getNewsStatus());
            oldArticle.setUpdatedBy(article.getUpdatedBy());
            oldArticle.setModifiedDate(new java.util.Date());
            oldArticle.setTags(article.getTags());
        }
        return repository.save(oldArticle);
    }

    @Override
    public NewsArticle getArticle(Integer id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<NewsArticle> getAllArticles() {
        return repository.findAll();
    }

    @Override
    public ResponseEntity<String> delete(Integer id) {
        NewsArticle article = repository.findById(id).orElse(null);
        if (article == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        repository.delete(article);
        return new ResponseEntity<>("Article deleted", HttpStatus.OK);
    }
}
