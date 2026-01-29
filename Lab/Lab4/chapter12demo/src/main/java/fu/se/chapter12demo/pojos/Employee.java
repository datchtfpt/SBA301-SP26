package fu.se.chapter12demo.pojos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {

    private String empId;

    private String name;

    private String destination;

    private double salary;
}
