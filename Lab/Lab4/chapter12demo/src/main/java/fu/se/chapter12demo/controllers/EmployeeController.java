package fu.se.chapter12demo.controllers;


import fu.se.chapter12demo.pojos.Employee;
import fu.se.chapter12demo.repositories.IEmployeeRepository;
import fu.se.chapter12demo.services.IEmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
public class EmployeeController {

    @Autowired
    private IEmployeeService service;

    @GetMapping(value = "/employees", produces = "application/json")
    public Page<Employee> firstPage(Pageable pageable) {
        return service.getAllEmployees(pageable);
    }

    @Operation(
            summary = "Get employee by ID",
            description = "Find employee by empId",
            tags = {"employees"},
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Employee found",
                            content = @Content(schema = @Schema(implementation = Employee.class))
                    ),
                    @ApiResponse(responseCode = "404", description = "Employee not found")
            }
    )

    @GetMapping("/employees/{empId}")
    public Employee getEmployeeById(@PathVariable String empId) {
        return service.getEmployeeById(empId);
    }

    @DeleteMapping("/employees/{empId}")
    public Employee deleteEmployeeById(@PathVariable String empId) {
        return service.delete(empId);
    }

    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee) {
        return service.create(employee);
    }




}
