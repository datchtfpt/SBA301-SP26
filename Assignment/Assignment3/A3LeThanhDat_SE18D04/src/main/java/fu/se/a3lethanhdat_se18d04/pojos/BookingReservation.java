package fu.se.a3lethanhdat_se18d04.pojos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fu.se.a3lethanhdat_se18d04.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "booking_reservation")
@Getter
@Setter
public class BookingReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookingReservationID")
    private Integer brId;

    @Column(name = "bookingDate")
    private LocalDate bookingDate;

    @Column(name = "totalPrice")
    private Double totalPrice;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customerID", nullable = false)
    private Customer customer;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private BookingStatus status;
}
