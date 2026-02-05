package fu.se.backend.dto;


import lombok.Data;

import java.util.List;

@Data
public class CategoryDTO {
    private Integer categoryId;
    private String categoryName;
    private String categoryDescription;
    private Integer parentCategoryId;
    private Integer isActive;

    private List<Integer> childCategoryIds;
}
