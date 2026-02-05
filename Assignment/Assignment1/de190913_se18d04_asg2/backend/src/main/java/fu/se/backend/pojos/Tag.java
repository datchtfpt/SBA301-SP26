package fu.se.backend.pojos;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Tag")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TagID")
    private Integer tagID;

    @Column(name = "TagName")
    private String tagName;

    @Column(name = "Note")
    private String note;

    @ManyToMany(mappedBy = "tags")
    private Set<NewsArticle> newsArticles = new HashSet<>();

}
