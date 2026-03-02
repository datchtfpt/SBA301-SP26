package fu.se.a3lethanhdat_se18d04.services;

import fu.se.a3lethanhdat_se18d04.pojos.RoomInformation;

import java.util.List;
import java.util.Optional;

public interface IRoomService {
    List<RoomInformation> getAllRooms();
    Optional<RoomInformation> getRoomById(Integer id);
    List<RoomInformation> getRoomsByType(Integer roomTypeId);
    List<RoomInformation> getAvailableRooms();
    RoomInformation createRoom(RoomInformation room);
    RoomInformation updateRoom(Integer id, RoomInformation roomDetails);
    void deleteRoom(Integer id);
    RoomInformation updateRoomStatus(Integer id, String status);
}
