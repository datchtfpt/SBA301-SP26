package datlt.fudn.demo.controllers;

import datlt.fudn.demo.pojos.Orchid;
import datlt.fudn.demo.services.IOrchidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/orchids")
public class OrchidController {

    @Autowired
    private IOrchidService service;

    @GetMapping("/")
    public ResponseEntity<List<Orchid>> fetchAll() {
        return ResponseEntity.ok(service.getAllOrchids());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Orchid>> getOrchidByID(@PathVariable int id) {
        return ResponseEntity.ok(service.getOrchidByID(id));
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public Orchid saveOrchid(@RequestBody Orchid orchid) {
        return service.insertOrchid(orchid);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Orchid> updateOrchid(@PathVariable int id, @RequestBody Orchid orchid) {
        return ResponseEntity.ok(service.updateOrchid(id, orchid));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrchid(@PathVariable int id) {
        service.deleteOrchid(id);
        return ResponseEntity.ok("OK");
    }
}
