package ru.activity.tracker.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.activity.tracker.backend.entity.Role;
import ru.activity.tracker.backend.enums.RoleEnum;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleEnum name);

}
