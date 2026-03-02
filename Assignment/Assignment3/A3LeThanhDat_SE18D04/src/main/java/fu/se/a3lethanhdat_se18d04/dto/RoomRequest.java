package fu.se.a3lethanhdat_se18d04.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomRequest {
    private Integer roomNumber;
    private String roomDetailDescription;
    private Integer roomMaxCapacity;
    private Double roomPricePerDay;
    private String roomStatus;
    private Integer roomTypeId;
}
