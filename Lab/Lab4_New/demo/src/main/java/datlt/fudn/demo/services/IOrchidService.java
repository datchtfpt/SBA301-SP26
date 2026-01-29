package datlt.fudn.demo.services;

import datlt.fudn.demo.pojos.Orchid;

import java.util.List;
import java.util.Optional;

public interface IOrchidService {

    public List<Orchid> getAllOrchids();

    public Orchid insertOrchid(Orchid orchid);

    public Orchid updateOrchid(int orchidID, Orchid orchid);

    public void deleteOrchid(int orchidID);

    public Optional<Orchid> getOrchidByID(int orchidID);
}
