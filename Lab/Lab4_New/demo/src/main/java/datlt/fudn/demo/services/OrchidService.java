package datlt.fudn.demo.services;

import datlt.fudn.demo.pojos.Orchid;
import datlt.fudn.demo.repositories.IOrchidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrchidService implements IOrchidService {

    @Autowired
    private IOrchidRepository repository;

    @Override
    public List<Orchid> getAllOrchids() {
        return repository.findAll();
    }

    @Override
    public Orchid insertOrchid(Orchid orchid) {
        return repository.save(orchid);
    }

    @Override
    public Orchid updateOrchid(int orchidID, Orchid orchid) {
        Orchid o = repository.findById(orchidID).get();
        if (o != null) {
            o.setOrchidName(orchid.getOrchidName());
            o.setOrchidDescription(orchid.getOrchidDescription());
        }
        return null;
    }

    @Override
    public void deleteOrchid(int orchidID) {
        repository.deleteById(orchidID);
    }

    @Override
    public Optional<Orchid> getOrchidByID(int orchidID) {
        return repository.findById(orchidID);
    }
}
