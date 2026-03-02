package fu.se.a3lethanhdat_se18d04.pojos;

import fu.se.a3lethanhdat_se18d04.enums.RoomStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "room_information")
@Getter
@Setter
public class RoomInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "roomID", nullable = false)
    private int roomId;

    @Column(name = "roomNumber")
    private Integer roomNumber;

    @Column(name = "roomDetailDescription")
    private String roomDetailDescription;

    @Column(name = "roomMaxCapacity")
    private Integer roomMaxCapacity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "roomTypeId", nullable = false)
    private RoomType roomType;

    @Enumerated(EnumType.STRING)
    @Column(name = "roomStatus")
    private RoomStatus status;

    @Column(name = "roomPricePerDay")
    private Double roomPricePerDay;
}
