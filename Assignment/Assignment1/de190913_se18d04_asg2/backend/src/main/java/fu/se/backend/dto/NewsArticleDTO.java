package fu.se.backend.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class NewsArticleDTO {
    private Integer newsArticleID;
    private String newsTitle;
    private String headline;
    private Date createdDate;
    private String newsContent;
    private String newsSource;
    private Integer categoryId;
    private String categoryName;
    private Integer newsStatus;
    private Integer createdById;
    private String createdByName;
    private Integer updatedById;
    private String updatedByName;
    private Date modifiedDate;
    private List<TagDTO> tags;
}
