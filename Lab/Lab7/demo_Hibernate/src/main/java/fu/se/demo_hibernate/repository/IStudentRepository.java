package fu.se.demo_hibernate.repository;

import fu.se.demo_hibernate.pojos.Student;

import java.util.List;

public interface IStudentRepository {

    void save(Student student);
    void update(Student student);
    void delete(Student student);
    Student findById(Integer id);
    Student findByEmail(String email);
    List<Student> findAll();
}
