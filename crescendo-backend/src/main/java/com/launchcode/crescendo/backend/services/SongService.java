package com.launchcode.crescendo.backend.services;

import com.launchcode.crescendo.backend.models.Song;
import java.util.Optional;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

//interface class created to promote abstraction-defines the methods related to song management
public interface SongService {


    List<Song> searchSongs(String keyword);

    Optional<Song> findById(Integer id);

    Song createSong(Song song);

    List<Song> getAllSongs();


    List<Song> getFavoriteSongs();


    Song toggleFavorite(Long id);

    Song save(Song song);

    Song createSongWithImage(Song song, MultipartFile imageFile) throws IOException;
}
