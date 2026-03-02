package fu.se.a3lethanhdat_se18d04.controller;

import fu.se.a3lethanhdat_se18d04.pojos.Customer;
import fu.se.a3lethanhdat_se18d04.pojos.RoomInformation;
import fu.se.a3lethanhdat_se18d04.pojos.BookingReservation;
import fu.se.a3lethanhdat_se18d04.pojos.RoomType;
import fu.se.a3lethanhdat_se18d04.dto.RoomRequest;
import fu.se.a3lethanhdat_se18d04.services.CustomerService;
import fu.se.a3lethanhdat_se18d04.services.IRoomService;
import fu.se.a3lethanhdat_se18d04.services.IBookingService;
import fu.se.a3lethanhdat_se18d04.repositories.IRoomTypeRepository;
import fu.se.a3lethanhdat_se18d04.enums.RoomStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/staff")
@PreAuthorize("hasRole('STAFF')")
public class StaffController {

    private static final Logger log = LoggerFactory.getLogger(StaffController.class);

    @Autowired
    private CustomerService customerService;

    @Autowired
    private IRoomService roomService;

    @Autowired
    private IBookingService bookingService;

    @Autowired
    private IRoomTypeRepository roomTypeRepository;

    // Customer Management
    @GetMapping("/customers")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    @GetMapping("/customers/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Integer id) {
        return customerService.getCustomerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/customers")
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        try {
            Customer createdCustomer = customerService.createCustomer(customer);
            return ResponseEntity.ok(createdCustomer);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/customers/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Integer id, @RequestBody Customer customer) {
        try {
            Customer updatedCustomer = customerService.updateCustomer(id, customer);
            return ResponseEntity.ok(updatedCustomer);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/customers/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Integer id) {
        try {
            customerService.deleteCustomer(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/customers/{id}/status")
    public ResponseEntity<Customer> updateCustomerStatus(@PathVariable Integer id, @RequestParam String status) {
        try {
            Customer customer = customerService.updateCustomerStatus(id, status);
            return ResponseEntity.ok(customer);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Room Management
    @GetMapping("/rooms")
    public ResponseEntity<List<RoomInformation>> getAllRooms() {
        return ResponseEntity.ok(roomService.getAllRooms());
    }

    @GetMapping("/rooms/{id}")
    public ResponseEntity<RoomInformation> getRoomById(@PathVariable Integer id) {
        return roomService.getRoomById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/rooms/type/{typeId}")
    public ResponseEntity<List<RoomInformation>> getRoomsByType(@PathVariable Integer typeId) {
        return ResponseEntity.ok(roomService.getRoomsByType(typeId));
    }

    @GetMapping("/rooms/available")
    public ResponseEntity<List<RoomInformation>> getAvailableRooms() {
        return ResponseEntity.ok(roomService.getAvailableRooms());
    }

    @PostMapping("/rooms")
    public ResponseEntity<RoomInformation> createRoom(@RequestBody RoomRequest req) {
        Optional<RoomType> rtOpt = roomTypeRepository.findById(req.getRoomTypeId());
        if (rtOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        RoomInformation room = new RoomInformation();
        room.setRoomNumber(req.getRoomNumber());
        room.setRoomDetailDescription(req.getRoomDetailDescription());
        room.setRoomMaxCapacity(req.getRoomMaxCapacity());
        room.setRoomPricePerDay(req.getRoomPricePerDay());
        room.setStatus(RoomStatus.valueOf(req.getRoomStatus()));
        room.setRoomType(rtOpt.get());
        RoomInformation createdRoom = roomService.createRoom(room);
        return ResponseEntity.ok(createdRoom);
    }

    @PutMapping("/rooms/{id}")
    public ResponseEntity<RoomInformation> updateRoom(@PathVariable Integer id, @RequestBody RoomInformation room) {
        try {
            RoomInformation updatedRoom = roomService.updateRoom(id, room);
            return ResponseEntity.ok(updatedRoom);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/rooms/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Integer id) {
        try {
            roomService.deleteRoom(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/rooms/{id}/status")
    public ResponseEntity<RoomInformation> updateRoomStatus(@PathVariable Integer id, @RequestParam String status) {
        try {
            RoomInformation room = roomService.updateRoomStatus(id, status);
            return ResponseEntity.ok(room);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Booking Management
    @GetMapping("/bookings")
    public ResponseEntity<List<BookingReservation>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/bookings/{id}")
    public ResponseEntity<BookingReservation> getBookingById(@PathVariable Integer id) {
        return bookingService.getBookingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/bookings/customer/{customerId}")
    public ResponseEntity<List<BookingReservation>> getBookingsByCustomer(@PathVariable Integer customerId) {
        return ResponseEntity.ok(bookingService.getBookingsByCustomer(customerId));
    }

    @PostMapping("/bookings")
    public ResponseEntity<BookingReservation> createBooking(@RequestBody BookingReservation booking) {
        try {
            BookingReservation createdBooking = bookingService.createBooking(booking, List.of());
            return ResponseEntity.ok(createdBooking);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/bookings/{id}")
    public ResponseEntity<BookingReservation> updateBooking(@PathVariable Integer id, @RequestBody BookingReservation booking) {
        try {
            BookingReservation updatedBooking = bookingService.updateBooking(id, booking);
            return ResponseEntity.ok(updatedBooking);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Integer id) {
        try {
            bookingService.deleteBooking(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/bookings/{id}/status")
    public ResponseEntity<?> updateBookingStatus(@PathVariable Integer id, @RequestParam String status) {
        try {
            BookingReservation booking = bookingService.updateBookingStatus(id, status);
            return ResponseEntity.ok(booking);
        } catch (IllegalArgumentException e) {
            log.warn("Invalid booking status '{}' for bookingId={}", status, id, e);
            return ResponseEntity.badRequest().body("Invalid status: " + status);
        } catch (RuntimeException e) {
            log.error("Update booking status failed. bookingId={}, status={}", id, status, e);
            return ResponseEntity.badRequest().body(e.getMessage() == null ? "Update booking status failed" : e.getMessage());
        }
    }
}
