package fu.se.backend.pojos;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "SystemAccount")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AccountID")
    private Integer accountId;

    @Column(name = "AccountName")
    private String accountName;

    @Column(name = "AccountEmail")
    private String accountEmail;

    @Column(name = "AccountRole")
    private Integer AccountRole;

    @Column(name = "AccountPassword")
    private String accountPassword;




}
