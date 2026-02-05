package fu.se.backend.controllers;

import fu.se.backend.pojos.Tag;
import fu.se.backend.services.ITagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/tags")
public class TagController {

    @Autowired
    private ITagService service;

    // Helper method to check if user is Staff
    private boolean isStaff(Integer userRole) {
        return userRole != null && userRole == 2;
    }

    @GetMapping
    public ResponseEntity<?> getAllTags(@RequestHeader(value = "X-User-Role", required = false) Integer userRole) {
        if (!isStaff(userRole)) {
            return ResponseEntity.status(403).body("Access denied. Staff role required.");
        }
        return ResponseEntity.ok(service.getTags());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTagById(@PathVariable Integer id, @RequestHeader(value = "X-User-Role", required = false) Integer userRole) {
        if (!isStaff(userRole)) {
            return ResponseEntity.status(403).body("Access denied. Staff role required.");
        }
        Tag tag = service.getTag(id);
        if (tag != null) {
            return ResponseEntity.ok(tag);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> createTag(@RequestBody Tag tag, @RequestHeader(value = "X-User-Role", required = false) Integer userRole) {
        if (!isStaff(userRole)) {
            return ResponseEntity.status(403).body("Access denied. Staff role required.");
        }
        return ResponseEntity.ok(service.createTag(tag));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTagById(@PathVariable Integer id, @RequestHeader(value = "X-User-Role", required = false) Integer userRole) {
        if (!isStaff(userRole)) {
            return ResponseEntity.status(403).body("Access denied. Staff role required.");
        }
        return service.deleteTag(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTag(@PathVariable Integer id, @RequestBody Tag tag, @RequestHeader(value = "X-User-Role", required = false) Integer userRole) {
        if (!isStaff(userRole)) {
            return ResponseEntity.status(403).body("Access denied. Staff role required.");
        }
        Tag updatedTag = service.updateTag(id, tag);
        if (updatedTag != null) {
            return ResponseEntity.ok(updatedTag);
        }
        return ResponseEntity.notFound().build();
    }
}
