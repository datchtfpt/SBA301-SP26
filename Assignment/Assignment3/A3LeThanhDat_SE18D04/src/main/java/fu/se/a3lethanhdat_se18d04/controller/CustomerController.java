package fu.se.a3lethanhdat_se18d04.controller;

import fu.se.a3lethanhdat_se18d04.pojos.Customer;
import fu.se.a3lethanhdat_se18d04.pojos.BookingReservation;
import fu.se.a3lethanhdat_se18d04.pojos.RoomInformation;
import fu.se.a3lethanhdat_se18d04.services.CustomerService;
import fu.se.a3lethanhdat_se18d04.services.IBookingService;
import fu.se.a3lethanhdat_se18d04.services.IRoomService;
import fu.se.a3lethanhdat_se18d04.enums.BookingStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/customers")
@PreAuthorize("hasRole('CUSTOMER')")
public class CustomerController {

    private final CustomerService customerService;
    private final IBookingService bookingService;
    private final IRoomService roomService;

    public CustomerController(CustomerService customerService, IBookingService bookingService, IRoomService roomService) {
        this.customerService = customerService;
        this.bookingService = bookingService;
        this.roomService = roomService;
    }

    @PostMapping("/register")
    @PreAuthorize("permitAll()")
    public ResponseEntity<Customer> register(@RequestBody Customer customer) {
        try {
            return ResponseEntity.ok(customerService.createCustomer(customer));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<Customer> getProfile(Authentication auth) {
        Customer customer = customerService.findByEmail(auth.getName());
        return customer != null ? ResponseEntity.ok(customer) : ResponseEntity.notFound().build();
    }

    @PutMapping("/profile")
    public ResponseEntity<Customer> updateProfile(Authentication auth, @RequestBody Customer details) {
        Customer customer = customerService.findByEmail(auth.getName());
        if (customer == null) return ResponseEntity.notFound().build();
        try {
            return ResponseEntity.ok(customerService.updateCustomer(customer.getCustomerId(), details));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<BookingReservation>> getBookings(Authentication auth) {
        Customer customer = customerService.findByEmail(auth.getName());
        return customer != null ? ResponseEntity.ok(bookingService.getBookingsByCustomer(customer.getCustomerId())) : ResponseEntity.notFound().build();
    }

    @GetMapping("/bookings/{id}")
    public ResponseEntity<BookingReservation> getBooking(Authentication auth, @PathVariable Integer id) {
        Customer customer = customerService.findByEmail(auth.getName());
        if (customer == null) return ResponseEntity.notFound().build();
        
        return bookingService.getBookingById(id)
            .filter(booking -> booking.getCustomer().getCustomerId() == customer.getCustomerId())
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/bookings")
    public ResponseEntity<BookingReservation> createBooking(Authentication auth, @RequestBody Map<String, Object> request) {
        Customer customer = customerService.findByEmail(auth.getName());
        if (customer == null) return ResponseEntity.notFound().build();
        
        try {
            BookingReservation booking = new BookingReservation();
            booking.setCustomer(customer);
            booking.setBookingDate(LocalDate.parse((String) request.get("bookingDate")));
            booking.setTotalPrice(0.0);
            booking.setStatus(BookingStatus.PENDING);
            
            @SuppressWarnings("unchecked")
            List<Integer> roomIds = (List<Integer>) request.get("roomIds");
            return ResponseEntity.ok(bookingService.createBooking(booking, roomIds));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<Void> cancelBooking(Authentication auth, @PathVariable Integer id) {
        Customer customer = customerService.findByEmail(auth.getName());
        if (customer == null) return ResponseEntity.notFound().build();
        
        return bookingService.getBookingById(id)
            .filter(booking -> booking.getCustomer().getCustomerId() == customer.getCustomerId())
            .map(booking -> {
                try {
                    bookingService.updateBookingStatus(id, BookingStatus.CANCELLED.name());
                    return ResponseEntity.ok().<Void>build();
                } catch (RuntimeException e) {
                    return ResponseEntity.badRequest().<Void>build();
                }
            })
            .orElse(ResponseEntity.notFound().build());
    }

    // Room endpoints (public)
    @GetMapping("/rooms")
    @PreAuthorize("permitAll()")
    public ResponseEntity<List<RoomInformation>> getRooms() {
        return ResponseEntity.ok(roomService.getAllRooms());
    }

    @GetMapping("/rooms/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<RoomInformation> getRoom(@PathVariable Integer id) {
        return roomService.getRoomById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/rooms/available")
    @PreAuthorize("permitAll()")
    public ResponseEntity<List<RoomInformation>> getAvailableRooms() {
        return ResponseEntity.ok(roomService.getAvailableRooms());
    }

    @GetMapping("/rooms/type/{typeId}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<List<RoomInformation>> getRoomsByType(@PathVariable Integer typeId) {
        return ResponseEntity.ok(roomService.getRoomsByType(typeId));
    }
}
