package datlt.demo_slot15.repositories;

import datlt.demo_slot15.pojos.Product;

import java.util.List;

public interface IProductRepository {
    public List<Product> getAllProducts();

    public Product findById(int id);

    public List<Product> search(String name);

    public Product save(Product product);

    public String delete(int id);

    public Product update(Product product);

}
