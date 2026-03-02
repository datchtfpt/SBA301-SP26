package fu.se.a3lethanhdat_se18d04.pojos;

import java.io.Serializable;
import java.util.Objects;

public class BookingDetailId implements Serializable {

    private Integer bookingReservation;
    private Integer room;

    public BookingDetailId() {}

    public BookingDetailId(Integer bookingReservation, Integer room) {
        this.bookingReservation = bookingReservation;
        this.room = room;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BookingDetailId that = (BookingDetailId) o;
        return Objects.equals(bookingReservation, that.bookingReservation) &&
               Objects.equals(room, that.room);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookingReservation, room);
    }

    public Integer getBookingReservation() {
        return bookingReservation;
    }

    public void setBookingReservation(Integer bookingReservation) {
        this.bookingReservation = bookingReservation;
    }

    public Integer getRoom() {
        return room;
    }

    public void setRoom(Integer room) {
        this.room = room;
    }
}
