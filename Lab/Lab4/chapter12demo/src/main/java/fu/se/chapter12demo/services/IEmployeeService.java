package fu.se.chapter12demo.services;

import fu.se.chapter12demo.pojos.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IEmployeeService {

    public Employee getEmployeeById(String empId);

    public Employee delete(String empId);

    public Employee create(Employee user);

    public Page<Employee> getAllEmployees(Pageable pageable);
}
