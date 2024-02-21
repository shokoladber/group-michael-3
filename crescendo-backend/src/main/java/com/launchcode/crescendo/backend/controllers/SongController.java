package com.launchcode.crescendo.backend.controllers;

import com.launchcode.crescendo.backend.repository.SongRepository;
import com.launchcode.crescendo.backend.models.Song;
import com.launchcode.crescendo.backend.services.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController //handling the incoming requests to a web application's RESTful API
@RequestMapping("api/songs")
@CrossOrigin(origins = "http://localhost:3000") // Allows requests from localhost:3000

public class SongController {
    @Autowired
    private SongRepository songRepository;

    @Autowired
    private SongService songService;


    //Create a new song
    @PostMapping("/add")
    public Song createSong(@RequestBody Song song) {
       return songService.createSong(song);
    }

    //Get a list of all the songs
    @GetMapping("/list")
    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    //Search the list of songs by title
    @GetMapping("search")
    public List<Song> searchSongs(@RequestParam String keyword) {
        return songRepository.findByTitleContaining(keyword);
    }
    @PutMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> updateSong(@PathVariable int id, @RequestBody Song updatedSong) {
        // Check if the song exists
        Optional<Song> optionalSong = songRepository.findById(id);
        if (optionalSong.isEmpty()) {
            return ResponseEntity.notFound().build(); // Return 404 if the song does not exist
        }

        // Update the song details
        Song existingSong = optionalSong.get();
        existingSong.setTitle(updatedSong.getTitle());
        existingSong.setMusician(updatedSong.getMusician());
        // Update other fields as needed

        // Save the changes
        songRepository.save(existingSong);

        return ResponseEntity.ok("Song updated successfully");
    }
    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> deleteSong(@PathVariable int id) {
        // Check if the song exists
        if (!songRepository.existsById(id)) {
            return ResponseEntity.notFound().build(); // Return 404 if the song does not exist
        }

        // Delete the song
        songRepository.deleteById(id);

        return ResponseEntity.ok("Song deleted successfully");
    }}



