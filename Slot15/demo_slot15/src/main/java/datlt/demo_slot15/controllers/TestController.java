package datlt.demo_slot15.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {
    public TestController() {
        System.out.println("++++++++++++++++++++");
    }

    @GetMapping
    public String test() {
        return "OK";
    }
}