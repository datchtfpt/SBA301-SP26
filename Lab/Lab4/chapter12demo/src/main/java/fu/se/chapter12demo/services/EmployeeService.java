package fu.se.chapter12demo.services;

import fu.se.chapter12demo.pojos.Employee;
import fu.se.chapter12demo.repositories.IEmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService implements IEmployeeService {


    @Autowired
    private IEmployeeRepository repository;

    @Override
    public Employee getEmployeeById(String empId) {
        return repository.getByEmpId(empId);
    }

    @Override
    public Employee delete(String empId) {
        return repository.delete(empId);
    }

    @Override
    public Employee create(Employee user) {
        return repository.create(user);
    }

    @Override
    public Page<Employee> getAllEmployees(Pageable pageable) {
        return repository.findAll(pageable);
    }
}
