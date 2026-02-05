package fu.se.backend.services;

import fu.se.backend.pojos.Category;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ICategoryRepository {

    public Category createCategory(Category category);

    public Category getCategory(Integer id);

    public List<Category> getCategories();

    public ResponseEntity<String> deleteCategory(Integer id);

    public Category updateCategory(Integer id, Category category);
}
