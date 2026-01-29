package datlt.demo_slot15.services;

import datlt.demo_slot15.pojos.Product;
import datlt.demo_slot15.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements IProductService {

    @Autowired
    private ProductRepository repository;

    @Override
    public Product saveProduct(Product product) {
        return repository.save(product);
    }

    @Override
    public List<Product> getProducts() {
        System.out.println("+++++++++++++++++++++++");
        return repository.getAllProducts();
    }

    @Override
    public Product getProductById(int id) {
        return repository.findById(id);
    }

    @Override
    public String deleteProduct(int id) {
        repository.delete(id);
        return "Product with id " + id + " has been deleted";
    }

    @Override
    public Product updateProduct(Product product) {
        return repository.update(product);
    }
}
