module demo_Hibernate{
    requires jakarta.persistence;
    requires static lombok;
    requires org.hibernate.orm.core;

    // JavaFX

    requires javafx.controls;
    requires javafx.fxml;
    requires javafx.base;

    //Persistence

    requires java.sql;


    requires java.naming;

    opens fu.se.demo_hibernate.controller to javafx.fxml;

    opens fu.se.demo_hibernate.pojos to org.hibernate.orm.core;

    exports fu.se.demo_hibernate.controller;

    exports fu.se.demo_hibernate.service;

    exports fu.se.demo_hibernate.pojos;

    exports fu.se.demo_hibernate.dao;

    exports fu.se.demo_hibernate.repository;

}