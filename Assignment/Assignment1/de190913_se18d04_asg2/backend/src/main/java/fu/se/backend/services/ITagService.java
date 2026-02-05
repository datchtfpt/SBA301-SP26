package fu.se.backend.services;

import fu.se.backend.pojos.Tag;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ITagService {

    public Tag createTag(Tag tag);

    public ResponseEntity<String> deleteTag(Integer id);

    public Tag updateTag(Integer id, Tag tag);

    List<Tag> getTags();
    
    Tag getTag(Integer id);
}
