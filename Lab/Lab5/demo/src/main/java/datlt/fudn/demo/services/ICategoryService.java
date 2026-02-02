package datlt.fudn.demo.services;

import datlt.fudn.demo.pojos.Category;

import java.util.List;
import java.util.Optional;

public interface ICategoryService {

    List<Category> getAllCategories();

    Optional<Category> getCategoryByID(int categoryID);
}
