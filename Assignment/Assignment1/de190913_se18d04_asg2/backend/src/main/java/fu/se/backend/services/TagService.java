package fu.se.backend.services;

import fu.se.backend.pojos.Tag;
import fu.se.backend.repositories.ITagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TagService implements ITagService {

    @Autowired
    private ITagRepository tagRepository;

    @Override
    public Tag createTag(Tag tag) {
        return tagRepository.save(tag);
    }

    @Override
    public ResponseEntity<String> deleteTag(Integer id) {
        try {
            if (tagRepository.existsById(id)) {
                tagRepository.deleteById(id);
                return ResponseEntity.ok("Tag deleted successfully");
            } else {
                return ResponseEntity.status(404).body("Tag not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting tag: " + e.getMessage());
        }
    }

    @Override
    public Tag updateTag(Integer id, Tag tag) {
        Optional<Tag> existingTag = tagRepository.findById(id);
        if (existingTag.isPresent()) {
            Tag updatedTag = existingTag.get();
            updatedTag.setTagName(tag.getTagName());
            updatedTag.setNote(tag.getNote());
            return tagRepository.save(updatedTag);
        }
        return null;
    }

    @Override
    public List<Tag> getTags() {
        return tagRepository.findAll();
    }

    @Override
    public Tag getTag(Integer id) {
        return tagRepository.findById(id).orElse(null);
    }
}
