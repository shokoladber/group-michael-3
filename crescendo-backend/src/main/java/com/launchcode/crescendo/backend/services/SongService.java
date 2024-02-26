package com.launchcode.crescendo.backend.services;

import com.launchcode.crescendo.backend.models.Song;
import com.launchcode.crescendo.backend.repository.SongRepository;
import com.launchcode.crescendo.backend.repository.SongRepository;
import java.util.Optional;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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
