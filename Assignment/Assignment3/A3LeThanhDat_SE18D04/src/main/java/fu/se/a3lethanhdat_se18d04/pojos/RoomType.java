package fu.se.a3lethanhdat_se18d04.pojos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "room_type")
@Getter
@Setter
public class RoomType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "roomTypeId")
    private Integer roomTypeId;

    @Column(name = "roomTypeName")
    private String roomTypeName;

    @Column(name = "typeDescription")
    private String typeDescription;

    @Column(name = "typeNote")
    private String typeNote;

    @OneToMany(mappedBy = "roomType")
    @JsonIgnore
    private List<RoomInformation> rooms;

}
