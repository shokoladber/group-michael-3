package com.launchcode.crescendo.backend.controllers;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
@Service
public class SpotifyService {
    @Value("${spotify.clientId")
    private String clientId;

    @Value("${spotify.clientSecret")
    private String clientSecret;

    @Value("${spotify.apiBaseUrl}")
    private String apiBaseUrl;

    private final RestTemplate restTemplate = new RestTemplate();

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

}
