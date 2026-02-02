package datlt.fudn.demo.controllers;

import datlt.fudn.demo.pojos.Category;
import datlt.fudn.demo.services.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(
        origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"},
        allowedHeaders = "*",
        methods = {
                RequestMethod.GET,
                RequestMethod.OPTIONS
        }
)
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private ICategoryService service;

    @GetMapping
    public ResponseEntity<List<Category>> fetchAll() {
        return ResponseEntity.ok(service.getAllCategories());
    }
}
