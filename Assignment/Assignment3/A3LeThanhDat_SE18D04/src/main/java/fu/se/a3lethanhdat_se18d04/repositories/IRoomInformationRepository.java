package fu.se.a3lethanhdat_se18d04.repositories;

import fu.se.a3lethanhdat_se18d04.enums.RoomStatus;
import fu.se.a3lethanhdat_se18d04.pojos.RoomInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IRoomInformationRepository extends JpaRepository<RoomInformation, Integer> {
    // Find by room number
    Optional<RoomInformation> findByRoomNumber(Integer roomNumber);

    // Find by status
    List<RoomInformation> findByStatus(RoomStatus status);

    // Find rooms by RoomType
    List<RoomInformation> findByRoomTypeRoomTypeId(Integer roomTypeId);
}
