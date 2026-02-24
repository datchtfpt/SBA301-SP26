package fu.se.demo_hibernate.service;

import fu.se.demo_hibernate.pojos.Student;

import java.util.List;

public interface IStudentService {

    void save(Student student);
    void update(Student student);
    void delete(Student student);

    Student findById(int id);
    Student findByEmail(String email);
    List<Student> findAll();
}
