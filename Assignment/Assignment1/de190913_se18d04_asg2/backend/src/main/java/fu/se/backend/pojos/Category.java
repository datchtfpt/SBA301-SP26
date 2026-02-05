package fu.se.backend.pojos;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"parentCategory", "childCategories"})
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CategoryID")
    private Integer categoryId;

    @Column(name = "CategoryName")
    private String categoryName;

    @Column(name = "CategoryDescription")
    private String categoryDescription;

    /** Self-reference: parent category (null for category gốc). */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ParentCategoryID")
    private Category parentCategory;

    /** Danh sách category con. */
    @OneToMany(mappedBy = "parentCategory", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Category> childCategories = new ArrayList<>();

    /** 1 = active, 0 = inactive */
    @Column(name = "IsActive")
    private Integer isActive;


}
