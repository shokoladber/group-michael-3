package com.launchcode.crescendo.backend.services;

import com.launchcode.crescendo.backend.models.SpotifySearchResponse;
import com.launchcode.crescendo.backend.models.SpotifyTokenResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.Map;

@Service
public class SpotifyService {

    @Value("${spotify.clientId}")
    private String clientId;

    @Value("${spotify.clientSecret}")
    private String clientSecret;

    @Value("${spotify.apiBaseUrl}")
    private String apiBaseUrl;

    private final RestTemplate restTemplate;

    public SpotifyService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public SpotifyTokenResponse authenticate() {
        String authUrl = "https://accounts.spotify.com/api/token";
        String requestBody = "grant_type=client_credentials";
        String authHeader = "Basic " + Base64.getEncoder().encodeToString((clientId + ":" + clientSecret).getBytes());
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.add("Authorization", authHeader);
        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
        ResponseEntity<SpotifyTokenResponse> response = restTemplate.exchange(authUrl, HttpMethod.POST, request, SpotifyTokenResponse.class);
        return response.getBody();
    }

    public SpotifySearchResponse searchTracks(String query, String accessToken) {
        String url = apiBaseUrl + "/v1/search?q=" + query + "&type=track";
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<?> entity = new HttpEntity<>(headers);
        ResponseEntity<SpotifySearchResponse> response = restTemplate.exchange(url, HttpMethod.GET, entity, SpotifySearchResponse.class);
        return response.getBody();
    }

    public String getTrackUrl(String spotifyTrackId) {
        String trackInfoUrl = apiBaseUrl + "/v1/tracks/" + spotifyTrackId;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<?> entity = new HttpEntity<>(headers);
        ResponseEntity<Map> response = restTemplate.exchange(trackInfoUrl, HttpMethod.GET, entity, Map.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            Map<String, Object> trackInfo = response.getBody();
            return (String) trackInfo.get("preview_url");
        } else {
            return null;
        }
    }
}