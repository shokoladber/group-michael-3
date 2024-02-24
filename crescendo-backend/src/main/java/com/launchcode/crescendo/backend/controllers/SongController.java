package com.launchcode.crescendo.backend.controllers;

import com.launchcode.crescendo.backend.repository.SongRepository;
import com.launchcode.crescendo.backend.models.Song;
import com.launchcode.crescendo.backend.services.SongService;
import org.springframework.http.MediaType;
import jakarta.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @Autowired
    private ServletContext servletContext;

    //Create a new song
    // @PostMapping("/add")
    // public Song createSong(@RequestBody Song song) {
    //    return songService.createSong(song);//used when search feature is added
    // }

    






    @PostMapping("/add")
    public ResponseEntity<Song> uploadSongWithImage(
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "musician", required = false) String musician,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            Song song = new Song();
            song.setTitle(title);
            song.setMusician(musician);
            song.setFileName(file.getOriginalFilename());

            Song savedSong = songService.createSongWithImage(song, file);
            return ResponseEntity.ok(savedSong);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }

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

        return ResponseEntity.ok("Song updated successfully.");
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

        return ResponseEntity.ok("Song deleted successfully.");
    }


    @GetMapping("/{id}")
    public ResponseEntity<Song> getSongById(@PathVariable Integer id) {
        Optional<Song> songOpt = songRepository.findById(id);
        if (songOpt.isPresent()) {
            return ResponseEntity.ok(songOpt.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/{id}/image")
public ResponseEntity<byte[]> getSongImage(@PathVariable Integer id) {
    Optional<Song> songOpt = songService.findById(id);
    if (songOpt.isPresent() && songOpt.get().getImage() != null) {
        // Get the image from the song
        byte[] imageBytes = songOpt.get().getImage();
        
        // Determine the file's media type
        String mimeType = servletContext.getMimeType(songOpt.get().getFileName()); // Ensure your Song model has a getFileName() method or similar
        MediaType mediaType = MediaType.parseMediaType(mimeType);
        
        // Return the image with the dynamically determined media type
        return ResponseEntity.ok()
                .contentType(mediaType)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + songOpt.get().getFileName() + "\"") // Optional: Forces the browser to download the image
                .body(imageBytes);
    } else {
        return ResponseEntity.notFound().build();
    }
}
    


}



