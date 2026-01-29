package fu.se.chapter12demo.repositories;

import fu.se.chapter12demo.pojos.Employee;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface IEmployeeRepository extends PagingAndSortingRepository<Employee, Long> {

    public Employee getByEmpId(String empId);

    public Employee delete(String empId);

    public Employee create(Employee user);

    public List<Employee> getAllEmployee();
}
