package ru.activity.tracker.backend.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.activity.tracker.backend.dto.response.MessageResponse;
import ru.activity.tracker.backend.entity.Role;
import ru.activity.tracker.backend.entity.User;
import ru.activity.tracker.backend.enums.RoleEnum;
import ru.activity.tracker.backend.repository.RoleRepository;
import ru.activity.tracker.backend.repository.UserRepository;

import java.util.HashSet;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/migrate")
@Tag(name = "migrate")
public class MigrationController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @PostMapping("")
    public ResponseEntity<?> migrate() {
        Role roleAdmin = new Role(RoleEnum.ROLE_ADMIN);
        Role roleUser = new Role(RoleEnum.ROLE_USER);
        roleRepository.save(roleAdmin);
        roleRepository.save(roleUser);
        User admin = new User("admin", "admin@example.com", encoder.encode("123456"));
        User user = new User("user", "user@example.com", encoder.encode("123456"));
        Set<Role> adminRoles = new HashSet<>();
        Set<Role> userRoles = new HashSet<>();
        adminRoles.add(roleAdmin);
        userRoles.add(roleUser);
        admin.setRoles(adminRoles);
        user.setRoles(userRoles);
        userRepository.save(admin);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("Migrations created successfully!"));
    }
}
