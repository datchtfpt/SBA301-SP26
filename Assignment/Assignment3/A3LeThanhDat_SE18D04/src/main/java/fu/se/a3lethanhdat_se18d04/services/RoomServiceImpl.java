package fu.se.a3lethanhdat_se18d04.services;

import fu.se.a3lethanhdat_se18d04.pojos.RoomInformation;
import fu.se.a3lethanhdat_se18d04.repositories.IRoomInformationRepository;
import fu.se.a3lethanhdat_se18d04.repositories.IBookingDetailRepository;
import fu.se.a3lethanhdat_se18d04.enums.RoomStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomServiceImpl implements IRoomService {

    @Autowired
    private IRoomInformationRepository roomRepository;

    @Autowired
    private IBookingDetailRepository bookingDetailRepository;

    @Override
    public List<RoomInformation> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Optional<RoomInformation> getRoomById(Integer id) {
        return roomRepository.findById(id);
    }

    @Override
    public List<RoomInformation> getRoomsByType(Integer roomTypeId) {
        return roomRepository.findByRoomTypeRoomTypeId(roomTypeId);
    }

    @Override
    public List<RoomInformation> getAvailableRooms() {
        return roomRepository.findByStatus(RoomStatus.AVAILABLE);
    }

    @Override
    public RoomInformation createRoom(RoomInformation room) {
        room.setStatus(RoomStatus.AVAILABLE);
        return roomRepository.save(room);
    }

    @Override
    public RoomInformation updateRoom(Integer id, RoomInformation roomDetails) {
        RoomInformation room = roomRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Room not found"));

        room.setRoomNumber(roomDetails.getRoomNumber());
        room.setRoomDetailDescription(roomDetails.getRoomDetailDescription());
        room.setRoomMaxCapacity(roomDetails.getRoomMaxCapacity());
        room.setRoomType(roomDetails.getRoomType());
        room.setRoomPricePerDay(roomDetails.getRoomPricePerDay());
        room.setStatus(roomDetails.getStatus());

        return roomRepository.save(room);
    }

    @Override
    public void deleteRoom(Integer id) {
        RoomInformation room = roomRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Room not found"));

        // Check if room has bookings
        List<fu.se.a3lethanhdat_se18d04.pojos.BookingDetail> bookings = bookingDetailRepository.findByRoomRoomId(id);
        
        if (bookings.isEmpty()) {
            // Hard delete if no bookings
            roomRepository.delete(room);
        } else {
            // Soft delete if has bookings
            room.setStatus(RoomStatus.MAINTENANCE);
            roomRepository.save(room);
        }
    }

    @Override
    public RoomInformation updateRoomStatus(Integer id, String status) {
        RoomInformation room = roomRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Room not found"));
        
        room.setStatus(RoomStatus.valueOf(status.toUpperCase()));
        return roomRepository.save(room);
    }
}
