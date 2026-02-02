package datlt.fudn.demo.repositories;

import datlt.fudn.demo.pojos.Orchid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrchidRepository extends JpaRepository<Orchid, Integer> {

}
