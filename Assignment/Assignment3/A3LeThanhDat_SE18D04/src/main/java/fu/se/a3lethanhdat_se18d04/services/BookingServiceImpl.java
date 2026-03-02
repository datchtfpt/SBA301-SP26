package fu.se.a3lethanhdat_se18d04.services;

import fu.se.a3lethanhdat_se18d04.pojos.BookingReservation;
import fu.se.a3lethanhdat_se18d04.pojos.BookingDetail;
import fu.se.a3lethanhdat_se18d04.pojos.BookingDetailId;
import fu.se.a3lethanhdat_se18d04.repositories.IBookingReservationRepository;
import fu.se.a3lethanhdat_se18d04.repositories.IBookingDetailRepository;
import fu.se.a3lethanhdat_se18d04.repositories.IRoomInformationRepository;
import fu.se.a3lethanhdat_se18d04.enums.BookingStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImpl implements IBookingService {

    @Autowired
    private IBookingReservationRepository bookingReservationRepository;

    @Autowired
    private IBookingDetailRepository bookingDetailRepository;

    @Autowired
    private IRoomInformationRepository roomRepository;

    @Override
    public List<BookingReservation> getAllBookings() {
        return bookingReservationRepository.findAll();
    }

    @Override
    public Optional<BookingReservation> getBookingById(Integer id) {
        return bookingReservationRepository.findById(id);
    }

    @Override
    public List<BookingReservation> getBookingsByCustomer(Integer customerId) {
        return bookingReservationRepository.findByCustomerCustomerId(customerId);
    }

    @Override
    @Transactional
    public BookingReservation createBooking(BookingReservation booking, List<Integer> roomIds) {
        booking.setBookingDate(LocalDate.now());
        booking.setTotalPrice(0.0);
        booking.setStatus(BookingStatus.PENDING);
        
        // Calculate total price
        Double totalPrice = 0.0;
        
        BookingReservation savedBooking = bookingReservationRepository.save(booking);
        
        // Create booking details for each room
        for (Integer roomId : roomIds) {
            var room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found: " + roomId));
            
            BookingDetailId detailId = new BookingDetailId(savedBooking.getBrId(), roomId);
            BookingDetail detail = new BookingDetail();
            detail.setId(detailId);
            detail.setBookingReservation(savedBooking);
            detail.setRoom(room);
            detail.setStartDate(booking.getBookingDate());
            detail.setEndDate(booking.getBookingDate().plusDays(1)); // Default 1 day
            detail.setActualPrice(room.getRoomPricePerDay());
            
            bookingDetailRepository.save(detail);
            totalPrice += room.getRoomPricePerDay();
        }
        
        savedBooking.setTotalPrice(totalPrice);
        return bookingReservationRepository.save(savedBooking);
    }

    @Override
    @Transactional
    public BookingReservation updateBooking(Integer id, BookingReservation bookingDetails) {
        BookingReservation booking = bookingReservationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setBookingDate(bookingDetails.getBookingDate());
        booking.setTotalPrice(bookingDetails.getTotalPrice());
        booking.setStatus(bookingDetails.getStatus());
        booking.setCustomer(bookingDetails.getCustomer());

        return bookingReservationRepository.save(booking);
    }

    @Override
    @Transactional
    public void deleteBooking(Integer id) {
        BookingReservation booking = bookingReservationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Delete all booking details first
        List<BookingDetail> details = bookingDetailRepository.findByBookingReservationBrId(id);
        bookingDetailRepository.deleteAll(details);

        // Delete booking
        bookingReservationRepository.delete(booking);
    }

    @Override
    public BookingReservation updateBookingStatus(Integer id, String status) {
        BookingReservation booking = bookingReservationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        booking.setStatus(BookingStatus.valueOf(status.toUpperCase()));
        return bookingReservationRepository.save(booking);
    }
}
