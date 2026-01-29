package datlt.demo_slot15.repositories;


import datlt.demo_slot15.pojos.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class ProductRepository implements IProductRepository {


    private List<Product> list = new ArrayList<Product>();

    public void createProduct(){
        list = List.of(
                new Product(1,"product 1", 10,"this is product", 1000),
                new Product(2,"product 2", 20,"this is product", 2000),
                new Product(3,"product 3", 30,"this is product", 3000)
        );
    }

    @Override
    public List<Product> getAllProducts() {
        System.out.println("................................");
        System.out.println(list.size());
        return list;
    }

    @Override
    public Product findById(int id) {
        for (Product product : list) {
            if (product.getId() == id) {
                return product;
            }
        }
        return null;
    }

    @Override
    public List<Product> search(String name) {
        return list.stream().filter(product -> product.getName().toLowerCase().contains(name.toLowerCase())).collect(Collectors.toList());
    }

    @Override
    public Product save(Product product) {
        Product p = new Product();
        p.setId(product.getId());
        p.setName(product.getName());
        p.setPrice(product.getPrice());
        p.setDescription(product.getDescription());
        p.setQuantity(product.getQuantity());
        list.add(p);
        return p;
    }

    @Override
    public String delete(int id) {
        list.removeIf(x -> x.getId() == (id));
        return null;
    }

    @Override
    public Product update(Product product) {
        return null;
    }


}
