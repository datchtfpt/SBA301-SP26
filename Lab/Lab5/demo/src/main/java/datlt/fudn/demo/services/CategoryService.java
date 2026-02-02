package datlt.fudn.demo.services;

import datlt.fudn.demo.pojos.Category;
import datlt.fudn.demo.repositories.ICategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    private ICategoryRepository repository;

    @Override
    public List<Category> getAllCategories() {
        return repository.findAll();
    }

    @Override
    public Optional<Category> getCategoryByID(int categoryID) {
        return repository.findById(categoryID);
    }
}
