package com.launchcode.crescendo.backend.service;

import com.launchcode.crescendo.backend.data.SongRepository;
import com.launchcode.crescendo.backend.models.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class SongService {

    private final SongRepository songRepository;

    @Autowired
    public SongService(SongRepository songRepository) {
        this.songRepository = songRepository;
    }

    // Method to create a new song
    public void createSong(String title, String musician) {
        // Create a new Song entity
        Song song = new Song();
        song.setTitle(title);
        song.setMusician(musician);
        // Set other properties if needed
        // Save the song to the database
        songRepository.save(song);
    }

    // Method to retrieve all songs
    public List<Song> getAllSongs() {
        return (List<Song>) songRepository.findAll();
    }

    // Method to retrieve a specific song by its ID
    public Song getSongById(Long id) {
        // Implement error handling if the song is not found
        return songRepository.findById(id).orElse(null);
    }

    // Method to update an existing song
    public void updateSong(Long id, String title, String musician) {
        // Retrieve the existing song from the database
        Song existingSong = songRepository.findById(id).orElse(null);
        if (existingSong != null) {
            // Update the existing song with the new data
            existingSong.setTitle(title);
            existingSong.setMusician(musician);
            // Set other properties if needed
            // Save the updated song to the database
            songRepository.save(existingSong);
        }
    }

    // Method to delete a song by its ID
    public void deleteSong(int id) {
        // Implement error handling if the song is not found
        songRepository.deleteById(id);
    }
}
