package fu.se.a3lethanhdat_se18d04.repositories;

import fu.se.a3lethanhdat_se18d04.pojos.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRoomTypeRepository
        extends JpaRepository<RoomType, Integer> {

    List<RoomType> findByRoomTypeNameContainingIgnoreCase(String name);

}