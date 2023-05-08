package ru.activity.tracker.backend.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.activity.tracker.backend.dto.request.ActivityTypeRequest;
import ru.activity.tracker.backend.dto.response.MessageResponse;
import ru.activity.tracker.backend.entity.ActivityType;
import ru.activity.tracker.backend.repository.ActivityTypeRepository;
import ru.activity.tracker.backend.repository.UserRepository;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/activity/type")
@Tag(name = "activity-type")
public class ActivityTypeController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    ActivityTypeRepository activityTypeRepository;

    @GetMapping("")
    public List<ActivityType> getAll() {
        return activityTypeRepository.findActivityTypesByIsDeleted(false);
    }

    @PostMapping("")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> create(@Valid @RequestBody ActivityTypeRequest activityTypeRequest) {
        ActivityType activityType = new ActivityType(activityTypeRequest.getName(), activityTypeRequest.getUnit());
        activityTypeRepository.save(activityType);

        return ResponseEntity.ok(new MessageResponse("Activity type added successfully!"));
    }

    @PutMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @Valid @RequestBody ActivityTypeRequest activityTypeRequest) {
        ActivityType activityType = activityTypeRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Error: Activity type is not found."));

        activityType.setName(activityTypeRequest.getName());
        activityType.setUnit(activityTypeRequest.getUnit());
        activityTypeRepository.save(activityType);

        return ResponseEntity.ok(new MessageResponse("Activity type updated successfully!"));
    }

    @GetMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ADMIN')")
    public ActivityType getById(@PathVariable("id") Long id) {
        return activityTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Activity type is not found."));
    }

    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        ActivityType activityType  = activityTypeRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Error: Activity type is not found."));
        activityType.setIsDeleted(true);
        activityTypeRepository.save(activityType);
        return ResponseEntity.ok(new MessageResponse("Activity type with id " + id + " deleted successfully"));
    }

}
