package fu.se.a3lethanhdat_se18d04.dto;

import java.time.LocalDate;

public class RegisterRequest {
    private String fullName;
    private String telephone;
    private String emailAddress;
    private LocalDate birthday;
    private String password;

    public RegisterRequest() {}

    public RegisterRequest(String fullName, String telephone, String emailAddress, LocalDate birthday, String password) {
        this.fullName = fullName;
        this.telephone = telephone;
        this.emailAddress = emailAddress;
        this.birthday = birthday;
        this.password = password;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
