package datlt.fudn.demo.pojos;

import jakarta.persistence.*;

import java.io.Serializable;



@Entity
@Table(name = "orchid")
public class Orchid implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orchid_id")
    private int orchidID;

    @Column(name = "orchid_name")
    private String orchidName;

    @Column(name = "is_natural", columnDefinition = "bit default 0")
    private boolean isNatural;

    @Column(name = "orchid_description")
    private String orchidDescription;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "is_attractive", columnDefinition = "bit default 0")
    private boolean isAttractive;

    @Column(name = "orchid_url")
    private String orchidURL;

    // Constructors
    public Orchid() {
    }

    public Orchid(String orchidName, boolean isNatural, String orchidDescription,
                  Category category, boolean isAttractive, String orchidURL) {
        this.orchidName = orchidName;
        this.isNatural = isNatural;
        this.orchidDescription = orchidDescription;
        this.category = category;
        this.isAttractive = isAttractive;
        this.orchidURL = orchidURL;
    }

    public int getOrchidID() {
        return orchidID;
    }

    public void setOrchidID(int orchidID) {
        this.orchidID = orchidID;
    }

    public String getOrchidName() {
        return orchidName;
    }

    public void setOrchidName(String orchidName) {
        this.orchidName = orchidName;
    }

    public boolean isNatural() {
        return isNatural;
    }

    public void setNatural(boolean natural) {
        isNatural = natural;
    }

    public String getOrchidDescription() {
        return orchidDescription;
    }

    public void setOrchidDescription(String orchidDescription) {
        this.orchidDescription = orchidDescription;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public boolean isAttractive() {
        return isAttractive;
    }

    public void setAttractive(boolean attractive) {
        isAttractive = attractive;
    }

    public String getOrchidURL() {
        return orchidURL;
    }

    public void setOrchidURL(String orchidURL) {
        this.orchidURL = orchidURL;
    }
}
