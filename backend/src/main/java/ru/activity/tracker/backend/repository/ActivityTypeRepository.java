package ru.activity.tracker.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.activity.tracker.backend.entity.ActivityType;

import java.util.List;


@Repository
public interface ActivityTypeRepository extends JpaRepository<ActivityType, Long> {
    List<ActivityType> findActivityTypesByIsDeleted(Boolean isDeleted);

}