package com.launchcode.crescendo.backend.service.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SpotifyTrackResponse {

    private SpotifyTrackItem[] items;

    public SpotifyTrackItem[] getItems() {
        return items;
    }

    public void setItems(SpotifyTrackItem[] items) {
        this.items = items;
    }

    public SpotifyTrackItem[] getTracks() {
        return items;
    }
}
