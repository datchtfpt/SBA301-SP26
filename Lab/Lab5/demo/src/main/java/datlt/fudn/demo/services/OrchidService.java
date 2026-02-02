package datlt.fudn.demo.services;

import datlt.fudn.demo.pojos.Category;
import datlt.fudn.demo.pojos.Orchid;
import datlt.fudn.demo.repositories.ICategoryRepository;
import datlt.fudn.demo.repositories.IOrchidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrchidService implements IOrchidService {

    @Autowired
    private IOrchidRepository repository;

    @Autowired
    private ICategoryRepository categoryRepository;

    @Override
    public List<Orchid> getAllOrchids() {
        return repository.findAll();
    }

    @Override
    public Orchid insertOrchid(Orchid orchid) {
        resolveCategory(orchid);
        return repository.save(orchid);
    }

    @Override
    public Orchid updateOrchid(int orchidID, Orchid orchid) {
        Orchid o = repository.findById(orchidID).orElse(null);
        if (o == null) {
            return null;
        }
        o.setOrchidName(orchid.getOrchidName());
        o.setOrchidDescription(orchid.getOrchidDescription());
        o.setOrchidURL(orchid.getOrchidURL());
        o.setAttractive(orchid.isAttractive());
        o.setNatural(orchid.isNatural());
        resolveCategory(orchid);
        o.setCategory(orchid.getCategory());
        return repository.save(o);
    }

    /** Gán lại entity Category từ categoryId (tránh gửi object thiếu từ FE). */
    private void resolveCategory(Orchid orchid) {
        if (orchid.getCategory() != null && orchid.getCategory().getCategoryID() > 0) {
            Category c = categoryRepository.findById(orchid.getCategory().getCategoryID()).orElse(null);
            orchid.setCategory(c);
        }
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
