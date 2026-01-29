package fu.se.chapter12demo.repositories;

import fu.se.chapter12demo.pojos.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Repository
public class EmployeeRepository implements IEmployeeRepository {

    private List<Employee> employees = createList();

    private static List<Employee> createList() {
        List<Employee> tempEmp = new ArrayList<>();
        Collections.addAll(tempEmp,
                new Employee("EMP01", "Viktor Le", "Technical Manager", 3000),
                new Employee("EMP02", "Dinh Bac", "Developer", 9000),
                new Employee("EMP03", "Khuat Van Khang", "Tester", 9000),
                new Employee("EMP04", "Le Phat", "Technical Dev", 3000),
                new Employee("EMP05", "Ngoc My", "BA", 2000),
                new Employee("EMP06", "Trung Kien", "BA Lead", 5000)
                );
        return tempEmp;
    }

    @Override
    public Employee getByEmpId(String empId) {
        for (Employee employee : employees) {
            if (employee.getEmpId().equals(empId)) {
                return employee;
            }
        }
        return null;
    }

    @Override
    public Employee delete(String empId) {
        System.out.println("+++++++++++++++++++++++++++");
        for (Employee employee : employees) {
            if (employee.getEmpId().equalsIgnoreCase(empId)) {
                employees.remove(employee);
                return employee;
            }
        }
        return null;
    }

    @Override
    public Employee create(Employee user) {
        employees.add(user);
        return user;
    }

    @Override
    public List<Employee> getAllEmployee() {
        return employees;
    }

    @Override
    public List<Employee> findAll(Sort sort) {
        return employees;
    }

    @Override
    public Page<Employee> findAll(Pageable pageable) {

        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), employees.size());

        List<Employee> pageContent = employees.subList(start, end);

        return new PageImpl<>(pageContent, pageable, employees.size());

    }
}
