package ru.activity.tracker.backend.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.activity.tracker.backend.dto.request.ActivityRequest;
import ru.activity.tracker.backend.dto.response.MessageResponse;
import ru.activity.tracker.backend.entity.Activity;
import ru.activity.tracker.backend.entity.ActivityType;
import ru.activity.tracker.backend.entity.User;
import ru.activity.tracker.backend.repository.ActivityRepository;
import ru.activity.tracker.backend.repository.ActivityTypeRepository;
import ru.activity.tracker.backend.repository.UserRepository;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/activity")
@Tag(name = "activity")
public class ActivityController {
    @Autowired
    ActivityRepository activityRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ActivityTypeRepository activityTypeRepository;

    @GetMapping("/user/{id}")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Activity> getAllByUser(@PathVariable("id") Long id) {
        User user = userRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Error: User is not found."));
        return activityRepository.findActivitiesByIsDeletedAndUser(false, user);
    }

    @PostMapping("")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> create(@Valid @RequestBody ActivityRequest activityRequest) {
        Activity activity = new Activity(activityRequest.getAmount(), activityRequest.getCreatedAt());

        User user = userRepository.findById(activityRequest.getUserId()).orElseThrow(() ->
                new RuntimeException("Error: User is not found."));
        ActivityType activityType = activityTypeRepository.findById(activityRequest.getActivityTypeId()).orElseThrow(() ->
                new RuntimeException("Error: ActivityType is not found."));

        activity.setUser(user);
        activity.setActivityType(activityType);

        activityRepository.save(activity);

        return ResponseEntity.ok(new MessageResponse("Activity added successfully!"));
    }

    @PutMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @Valid @RequestBody ActivityRequest activityRequest) {
        Activity activity = activityRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Error: Activity is not found."));

        activity.setAmount(activityRequest.getAmount());
        activityRepository.save(activity);

        return ResponseEntity.ok(new MessageResponse("Activity updated successfully!"));
    }

    @GetMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ADMIN')")
    public Activity getById(@PathVariable("id") Long id) {
        return activityRepository.findById(id).orElseThrow(() -> new RuntimeException("Error: Activity is not found."));
    }

    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        Activity activity = activityRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Error: Activity is not found."));
        activity.setIsDeleted(true);
        activityRepository.save(activity);
        return ResponseEntity.ok(new MessageResponse("Activity with id " + id + " deleted successfully"));
    }


}
