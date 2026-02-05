package fu.se.backend.services;

import fu.se.backend.dto.CategoryDTO;
import fu.se.backend.pojos.Category;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ICategoryService {

    public Category createCategory(Category category);


    public ResponseEntity<String> deleteCategory(Integer id);

    public Category updateCategory(Integer id, Category category);

    List<CategoryDTO> getCategories();
    CategoryDTO getCategory(Integer id);
}
