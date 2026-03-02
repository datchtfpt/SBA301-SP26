package fu.se.a3lethanhdat_se18d04.services;

import fu.se.a3lethanhdat_se18d04.pojos.BookingReservation;

import java.util.List;
import java.util.Optional;

public interface IBookingService {
    List<BookingReservation> getAllBookings();
    Optional<BookingReservation> getBookingById(Integer id);
    List<BookingReservation> getBookingsByCustomer(Integer customerId);
    BookingReservation createBooking(BookingReservation booking, List<Integer> roomIds);
    BookingReservation updateBooking(Integer id, BookingReservation bookingDetails);
    void deleteBooking(Integer id);
    BookingReservation updateBookingStatus(Integer id, String status);
}
