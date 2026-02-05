package fu.se.backend.pojos;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "NewsArticle")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewsArticle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NewsArticleID")
    private Integer newsArticleID;

    @Column(name = "NewsTitle")
    private String newsTitle;

    @Column(name = "Headline")
    private String headline;

    @Column(name = "CreatedDate")
    private Date createdDate;

    @Column(name = "NewsContent")
    private String newsContent;

    @Column(name = "NewsSource")
    private String newsSource;

    @ManyToOne
    @JoinColumn(name = "CategoryID", nullable = false)
    private Category category;

    @Column(name = "NewsStatus")
    private Integer newsStatus;

    @ManyToOne
    @JoinColumn(name = "CreatedByID", nullable = false)
    private Account createdBy;

    @ManyToOne
    @JoinColumn(name = "UpdatedByID", nullable = false)
    private Account updatedBy;

    @Column(name = "ModifiedDate")
    private Date modifiedDate;

    @ManyToMany
    @JoinTable(
        name = "NewsTag",
        joinColumns = @JoinColumn(name = "NewsArticleID"),
        inverseJoinColumns = @JoinColumn(name = "TagID")
    )
    private Set<Tag> tags = new HashSet<>();

}
