package com.launchcode.crescendo.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 50, message = "Title must be between 3 and 50 characters")
    private String title;

    @NotBlank(message = "Musician/Show is required")
    @Size(min = 3, max = 50, message = "Musician/Show must be between 3 and 50 characters")
    private String musician;

    @Size(max = 500, message = "Notes too long! Must be at most 500 characters.")
    private String notes;

    // Additional fields for Spotify integration
    private String spotifyTrackId;
    private String spotifyTrackUrl;

    public Song(String title, String musician, String notes, String spotifyTrackId, String spotifyTrackUrl) {
        this.title = title;
        this.musician = musician;
        this.notes = notes;
        this.spotifyTrackId = spotifyTrackId;
        this.spotifyTrackUrl = spotifyTrackUrl;
    }

    // Getters and setters
    public Integer getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMusician() {
        return musician;
    }

    public void setMusician(String musician) {
        this.musician = musician;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getSpotifyTrackId() {
        return spotifyTrackId;
    }

    public void setSpotifyTrackId(String spotifyTrackId) {
        this.spotifyTrackId = spotifyTrackId;
    }

    public String getSpotifyTrackUrl() {
        return spotifyTrackUrl;
    }

    public void setSpotifyTrackUrl(String spotifyTrackUrl) {
        this.spotifyTrackUrl = spotifyTrackUrl;
    }

    // Default constructor required by JPA
    public Song() {
    }
}
