package fu.se.a3lethanhdat_se18d04.pojos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "booking_detail")
@Getter
@Setter
public class BookingDetail implements Serializable {

    @EmbeddedId
    private BookingDetailId id;

    @ManyToOne
    @MapsId("bookingReservation")
    @JoinColumn(name = "bookingReservationID", nullable = false)
    @JsonIgnore
    private BookingReservation bookingReservation;

    @ManyToOne
    @MapsId("room")
    @JoinColumn(name = "roomID")
    @JsonIgnore
    private RoomInformation room;

    @Column(name = "startDate")
    private LocalDate startDate;

    @Column(name = "endDate")
    private LocalDate endDate;

    @Column(name = "actualPrice")
    private Double actualPrice;

}
