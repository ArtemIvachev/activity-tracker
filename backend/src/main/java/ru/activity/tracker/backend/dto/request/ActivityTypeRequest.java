package ru.activity.tracker.backend.dto.request;

import jakarta.validation.constraints.NotBlank;

public class ActivityTypeRequest {
    @NotBlank
    private String name;

    @NotBlank
    private String unit;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
}
