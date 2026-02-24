package fu.se.demo_hibernate.dao;

import fu.se.demo_hibernate.pojos.Student;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;

import java.util.ArrayList;
import java.util.List;


public class StudentDAO {

    private SessionFactory factory;

    public StudentDAO() {
        try {
            Configuration cfg = new Configuration().configure("hibernate.cfg.xml");
            this.factory = cfg.buildSessionFactory();
        }
        catch (Exception ex) {
            System.err.println("Erorr initailizing session Factory" + ex.getMessage());
            ex.printStackTrace();
        }
    }

    public void save(Student student) {
        Session session = factory.openSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();
            session.persist(student);
            tx.commit();
        }catch (Exception ex){
            if (tx!=null) tx.rollback();
            System.err.println(ex.getMessage());
        }
        finally {
            session.close();
        }
    }

    public List<Student> geAll(){
        List<Student> students = new  ArrayList<>();
        Session session = factory.openSession();
        try{
            Query<Student> query = session.createQuery("from Student", Student.class);
            students = query.getResultList();
        }
        catch (Exception ex){
            System.err.println("Erorr initailizing session Factory" + ex.getMessage());
        }
        finally {
            session.close();
        }
        return students;
    }

    public Student getById(int id) {
        Student student = null;
        Session session = factory.openSession();
        try{
            student = session.getReference(Student.class, id);
        }
        catch (Exception ex){
            System.err.println("Erorr initailizing session Factory" + ex.getMessage());
        }
        finally {
            session.close();
        }
        return student;
    }

    public Student findByEmail(String email) {
        Student student = null;
        Session session = factory.openSession();
        try{
            String hql = "From Student where email = :email";
            Query<Student> query = session.createQuery(hql,Student.class);
            query.setParameter("email", email);

            student = query.uniqueResult();
        }
        catch (Exception ex){
            System.err.println("Erorr initailizing session Factory" + ex.getMessage());
        }
        finally {
            session.close();
        }
        return student;
    }

    public void update(Student student) {
        Session session = factory.openSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();
            session.merge(student);
            tx.commit();
        }
        catch (Exception ex){
            if (tx!=null) tx.rollback();
            System.err.println(ex.getMessage());
        }
        finally {
            session.close();
        }
    }

    public void delete(Student student) {
        Session session = factory.openSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();
            session.remove(student);
            tx.commit();
        }
        catch (Exception ex){
            if (tx!=null) tx.rollback();
            System.err.println(ex.getMessage());
        }
        finally {
            session.close();
        }
    }


}
