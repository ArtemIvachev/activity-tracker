package ru.activity.tracker.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.activity.tracker.backend.entity.Activity;
import ru.activity.tracker.backend.entity.Role;
import ru.activity.tracker.backend.entity.User;
import ru.activity.tracker.backend.enums.RoleEnum;

import java.util.List;
import java.util.Optional;


@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findActivitiesByIsDeletedAndUser(Boolean isDeleted, User user);
}