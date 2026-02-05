package fu.se.backend.services;

import fu.se.backend.dto.CategoryDTO;
import fu.se.backend.pojos.Category;
import fu.se.backend.repositories.ICategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    private ICategoryRepository repository;

    @Override
    public Category createCategory(Category category) {
        return repository.save(category);
    }



    @Override
    public ResponseEntity<String> deleteCategory(Integer id) {
        Category category = repository.findById(id).orElseThrow();
        if (category == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        repository.delete(category);
        return new ResponseEntity<>("Category deleted", HttpStatus.OK);
    }

    @Override
    public Category updateCategory(Integer id, Category category) {
        Category oldCategory = repository.findById(id).orElseThrow();
        oldCategory.setCategoryName(category.getCategoryName());
        oldCategory.setCategoryDescription(category.getCategoryDescription());
        return repository.save(oldCategory);
    }

    @Override
    public List<CategoryDTO> getCategories() {
        return repository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public CategoryDTO getCategory(Integer id) {
        Category c = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        return mapToDTO(c);
    }

    private CategoryDTO mapToDTO(Category c) {
        CategoryDTO dto = new CategoryDTO();
        dto.setCategoryId(c.getCategoryId());
        dto.setCategoryName(c.getCategoryName());
        dto.setCategoryDescription(c.getCategoryDescription());
        dto.setIsActive(c.getIsActive());

        if (c.getParentCategory() != null) {
            dto.setParentCategoryId(c.getParentCategory().getCategoryId());
        }

        dto.setChildCategoryIds(
                c.getChildCategories()
                        .stream()
                        .map(Category::getCategoryId)
                        .toList()
        );

        return dto;
    }

}
