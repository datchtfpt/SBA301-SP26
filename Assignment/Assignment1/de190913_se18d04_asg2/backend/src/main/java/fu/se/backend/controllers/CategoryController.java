package fu.se.backend.controllers;

import fu.se.backend.dto.CategoryDTO;
import fu.se.backend.pojos.Category;
import fu.se.backend.services.CategoryService;
import fu.se.backend.services.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private ICategoryService service;

    // Helper method to check if user is Staff
    private boolean isStaff(Integer userRole) {
        return userRole != null && userRole == 2;
    }

    @GetMapping
    public ResponseEntity<?> getAllCategories(@RequestHeader(value = "X-User-Role", required = false) Integer userRole) {
        if (!isStaff(userRole)) {
            return ResponseEntity.status(403).body("Access denied. Staff role required.");
        }
        return ResponseEntity.ok(service.getCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable Integer id, @RequestHeader(value = "X-User-Role", required = false) Integer userRole) {
        if (!isStaff(userRole)) {
            return ResponseEntity.status(403).body("Access denied. Staff role required.");
        }
        System.out.println("++++++++++++++");
        return ResponseEntity.ok(service.getCategory(id));
    }

    @PostMapping
    public ResponseEntity<?> createCategory(@RequestBody Category category, @RequestHeader(value = "X-User-Role", required = false) Integer userRole) {
        if (!isStaff(userRole)) {
            return ResponseEntity.status(403).body("Access denied. Staff role required.");
        }
        return ResponseEntity.ok(service.createCategory(category));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategoryById(@PathVariable Integer id, @RequestHeader(value = "X-User-Role", required = false) Integer userRole) {
        if (!isStaff(userRole)) {
            return ResponseEntity.status(403).body("Access denied. Staff role required.");
        }
        return service.deleteCategory(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Integer id, @RequestBody Category category, @RequestHeader(value = "X-User-Role", required = false) Integer userRole) {
        if (!isStaff(userRole)) {
            return ResponseEntity.status(403).body("Access denied. Staff role required.");
        }
        return ResponseEntity.ok(service.updateCategory(id, category));
    }



}
