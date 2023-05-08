package ru.activity.tracker.backend.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.activity.tracker.backend.dto.request.ActivityTypeRequest;
import ru.activity.tracker.backend.dto.request.UserUpdateRequest;
import ru.activity.tracker.backend.dto.response.MessageResponse;
import ru.activity.tracker.backend.entity.ActivityType;
import ru.activity.tracker.backend.entity.Role;
import ru.activity.tracker.backend.entity.User;
import ru.activity.tracker.backend.enums.RoleEnum;
import ru.activity.tracker.backend.repository.RoleRepository;
import ru.activity.tracker.backend.repository.UserRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/user")
@Tag(name = "user")
@SecurityRequirement(name = "bearerAuth")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAll() {
        return userRepository.findUsersByIsDeleted(false);
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER') || hasRole('ADMIN')")
    public Optional<User> getCurrentUserInfo(HttpServletRequest request) {
        return userRepository.findByUsername(request.getUserPrincipal().getName());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public User getById(@PathVariable("id") Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: User is not found."));
    }

    @PutMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @Valid @RequestBody UserUpdateRequest userUpdateRequest) {
        User user = userRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Error: Activity type is not found."));

        user.setEmail(userUpdateRequest.getEmail());
        user.setUsername(userUpdateRequest.getUsername());

        Set<String> strRoles = userUpdateRequest.getRole();
        Set<Role> roles = new HashSet<>();
        if (strRoles == null) {
            Role userRole = roleRepository.findByName(RoleEnum.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                if ("admin".equals(role) || "ROLE_ADMIN".equals(role)) {
                    Role adminRole = roleRepository.findByName(RoleEnum.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(adminRole);
                } else {
                    Role userRole = roleRepository.findByName(RoleEnum.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(userRole);
                }
            });
        }
        user.setRoles(roles);

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User updated successfully!"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: User is not found."));
        user.setIsDeleted(true);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User with id " + id + " deleted successfully"));
    }
}
