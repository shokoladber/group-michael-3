package com.launchcode.crescendo.backend.service;

import com.launchcode.crescendo.backend.service.models.SpotifyTrackItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.launchcode.crescendo.backend.service.models.SpotifyTrackResponse;

import java.util.Objects;

@Service
public class SpotifyService {

    @Value("${spotify.apiBaseUrl}")
    private String apiBaseUrl;

    private final RestTemplate restTemplate;

    public SpotifyService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public SpotifyTrackItem[] searchTracks(String query) {
        String url = apiBaseUrl + "/search?q=" + query + "&type=track";
        return Objects.requireNonNull(restTemplate.getForObject(url, SpotifyTrackResponse.class)).getItems();
    }
}
