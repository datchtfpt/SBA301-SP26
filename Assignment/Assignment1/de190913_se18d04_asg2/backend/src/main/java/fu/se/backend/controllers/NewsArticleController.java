package fu.se.backend.controllers;

import fu.se.backend.pojos.NewsArticle;
import fu.se.backend.services.INewsArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/news-articles")
public class NewsArticleController {

    @Autowired
    private INewsArticleService service;

    // Helper method to check if user is Staff
    private boolean isStaff(Integer userRole) {
        return userRole != null && userRole == 2;
    }

    @GetMapping
    public ResponseEntity<?> getAllNewsArticles(@RequestHeader(value = "X-User-Role", required = false) Integer userRole) {
        if (!isStaff(userRole)) {
            return ResponseEntity.status(403).body("Access denied. Staff role required.");
        }
        return ResponseEntity.ok(service.getAllArticles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getNewsArticleById(@PathVariable Integer id, @RequestHeader(value = "X-User-Role", required = false) Integer userRole) {
        if (!isStaff(userRole)) {
            return ResponseEntity.status(403).body("Access denied. Staff role required.");
        }
        NewsArticle article = service.getArticle(id);
        if (article != null) {
            return ResponseEntity.ok(article);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> createNewsArticle(@RequestBody NewsArticle article, @RequestHeader(value = "X-User-Role", required = false) Integer userRole) {
        if (!isStaff(userRole)) {
            return ResponseEntity.status(403).body("Access denied. Staff role required.");
        }
        return ResponseEntity.ok(service.create(article));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNewsArticleById(@PathVariable Integer id, @RequestHeader(value = "X-User-Role", required = false) Integer userRole) {
        if (!isStaff(userRole)) {
            return ResponseEntity.status(403).body("Access denied. Staff role required.");
        }
        return service.delete(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateNewsArticle(@PathVariable Integer id, @RequestBody NewsArticle article, @RequestHeader(value = "X-User-Role", required = false) Integer userRole) {
        if (!isStaff(userRole)) {
            return ResponseEntity.status(403).body("Access denied. Staff role required.");
        }
        NewsArticle updatedArticle = service.update(id, article);
        if (updatedArticle != null) {
            return ResponseEntity.ok(updatedArticle);
        }
        return ResponseEntity.notFound().build();
    }
}
