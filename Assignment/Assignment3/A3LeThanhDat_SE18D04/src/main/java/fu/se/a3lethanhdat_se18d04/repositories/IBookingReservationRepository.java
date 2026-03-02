package fu.se.a3lethanhdat_se18d04.repositories;

import fu.se.a3lethanhdat_se18d04.pojos.BookingReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IBookingReservationRepository extends JpaRepository<BookingReservation, Integer> {

        // Get bookings of a customer
        List<BookingReservation> findByCustomerCustomerId(Integer customerId);

        // Find bookings by date range
        List<BookingReservation> findByBookingDateBetween(
                LocalDate start, LocalDate end);
}
