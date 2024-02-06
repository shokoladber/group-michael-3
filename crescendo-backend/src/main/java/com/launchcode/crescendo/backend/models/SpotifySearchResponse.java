package com.launchcode.crescendo.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import java.util.List;
public class SpotifySearchResponse {
    private SpotifyTracks tracks;

    public SpotifyTracks getTracks() {
        return tracks;
    }

    public void setTracks(SpotifyTracks tracks) {
        this.tracks = tracks;
    }
}
