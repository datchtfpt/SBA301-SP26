package datlt.demo_slot15.controllers;

import datlt.demo_slot15.pojos.Product;
import datlt.demo_slot15.services.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {


    @Autowired
    private IProductService service;

    @PostMapping
    public Product createProduct(@RequestBody Product product){
        return service.saveProduct(product);
    }

    @GetMapping
    public List<Product> findAllProducts(){
        System.out.println("----------------------------------");
        return service.getProducts();
    }

    @GetMapping("{id}")
    public Product getProductById(@PathVariable int id){
        return service.getProductById(id);
    }

    @PutMapping
    public Product updateProduct(@RequestBody Product product){
        return service.updateProduct(product);
    }

    @DeleteMapping("{id}")
    public String deleteProduct(@PathVariable int id){
        return service.deleteProduct(id);
    }
}
