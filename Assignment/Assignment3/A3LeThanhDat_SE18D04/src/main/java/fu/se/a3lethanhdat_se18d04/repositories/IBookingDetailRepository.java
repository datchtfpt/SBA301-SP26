package fu.se.a3lethanhdat_se18d04.repositories;

import fu.se.a3lethanhdat_se18d04.pojos.BookingDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBookingDetailRepository extends JpaRepository<BookingDetail, fu.se.a3lethanhdat_se18d04.pojos.BookingDetailId> {
    List<BookingDetail> findByBookingReservationBrId(Integer bookingReservationId);
    List<BookingDetail> findByRoomRoomId(Integer roomId);
}
