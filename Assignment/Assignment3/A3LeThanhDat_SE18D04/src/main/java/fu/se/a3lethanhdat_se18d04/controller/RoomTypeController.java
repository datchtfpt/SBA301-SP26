package fu.se.a3lethanhdat_se18d04.controller;

import fu.se.a3lethanhdat_se18d04.pojos.RoomType;
import fu.se.a3lethanhdat_se18d04.repositories.IRoomTypeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/room-types")
public class RoomTypeController {

    private final IRoomTypeRepository roomTypeRepository;

    public RoomTypeController(IRoomTypeRepository roomTypeRepository) {
        this.roomTypeRepository = roomTypeRepository;
    }

    @GetMapping
    public ResponseEntity<List<RoomType>> getAll() {
        return ResponseEntity.ok(roomTypeRepository.findAll());
    }

    @PostMapping
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<RoomType> create(@RequestBody RoomType payload) {
        return ResponseEntity.ok(roomTypeRepository.save(payload));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<RoomType> update(@PathVariable Integer id, @RequestBody RoomType payload) {
        Optional<RoomType> existing = roomTypeRepository.findById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        RoomType rt = existing.get();
        rt.setRoomTypeName(payload.getRoomTypeName());
        rt.setTypeDescription(payload.getTypeDescription());
        rt.setTypeNote(payload.getTypeNote());
        return ResponseEntity.ok(roomTypeRepository.save(rt));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (!roomTypeRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        roomTypeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
