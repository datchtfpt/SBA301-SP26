package fu.se.demo_hibernate.service;

import fu.se.demo_hibernate.pojos.Student;
import fu.se.demo_hibernate.repository.IStudentRepository;
import fu.se.demo_hibernate.repository.StudentRepository;

import java.util.List;

public class StudentService implements IStudentService {

    private IStudentRepository studentRepository = new StudentRepository();

    @Override
    public void save(Student student) {
        // Validate all required fields
        if (student.getEmail() == null || student.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Error: Email is required");
        }
        if (student.getFirstName() == null || student.getFirstName().trim().isEmpty()) {
            throw new IllegalArgumentException("Error: First name is required");
        }
        if (student.getLastName() == null || student.getLastName().trim().isEmpty()) {
            throw new IllegalArgumentException("Error: Last name is required");
        }
        if (student.getMarks() == null) {
            throw new IllegalArgumentException("Error: Marks is required");
        }
        
        Student existingStudent = studentRepository.findByEmail(student.getEmail());
        if (existingStudent != null) {
            throw new RuntimeException("Error: Email already exists");
        }

        if(student.getMarks() < 0 || student.getMarks() > 10){
            throw new IllegalArgumentException("Error: Marks must be between 0 and 10");
        }

        studentRepository.save(student);
    }

    @Override
    public void update(Student student) {
        Student existingStudent = studentRepository.findById(student.getId());
        if (existingStudent == null) {
            throw new RuntimeException("Error: Student not found");
        }
        Student studentWithNewEmail = studentRepository.findByEmail(student.getEmail());
        if (studentWithNewEmail != null && studentWithNewEmail.getId() != student.getId()) {
            throw new RuntimeException("Error: Email already exists");
        }

        if(student.getMarks() == null || student.getMarks() < 0 || student.getMarks() > 10){
            throw new IllegalArgumentException("Error: Marks must be between 0 and 10");
        }

        studentRepository.update(student);
    }

    @Override
    public void delete(Student student) {
        studentRepository.delete(student);
    }

    @Override
    public Student findById(int id) {
        if(id <= 0){
            throw new IllegalArgumentException("Error: ID must be greater than 0");
        }
        return studentRepository.findById(id);
    }

    @Override
    public Student findByEmail(String email) {
        if(email == null || email.trim().isEmpty()){
            throw new IllegalArgumentException("Error: Email cannot be empty");
        }
        return studentRepository.findByEmail(email);
    }

    @Override
    public List<Student> findAll() {
        return studentRepository.findAll();
    }
}
