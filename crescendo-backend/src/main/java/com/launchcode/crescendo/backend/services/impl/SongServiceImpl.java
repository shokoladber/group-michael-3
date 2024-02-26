package com.launchcode.crescendo.backend.services.impl;

import com.launchcode.crescendo.backend.models.Song;
import com.launchcode.crescendo.backend.repository.SongRepository;
import com.launchcode.crescendo.backend.services.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

import java.util.NoSuchElementException;
import java.util.Optional;

import java.util.List;

@Service
public class SongServiceImpl implements SongService {

    @Autowired
    private SongRepository songRepository;

    public SongServiceImpl(SongRepository songRepository) {
        this.songRepository = songRepository;
    }

    @Override
    public List<Song> searchSongs(String keyword){
        List<Song> songs = songRepository.findByTitleContaining(keyword);
        return songs;
    }

    @Override
    public Song createSong(Song song) {
        return songRepository.save(song);
    }

    @Override
    public List<Song> getAllSongs(){
        return songRepository.findAll(Sort.by(Sort.Direction.DESC));
    }

    @Override
    public Optional<Song> findById(Integer id) {
        return songRepository.findById(id);
    }



    @Override
    public List<Song> getFavoriteSongs() {
        return songRepository.findByFavoriteTrue();
    }


    @Override
    public Song toggleFavorite(Long id) {
        return songRepository.findById(id).map(song -> {
            song.setFavorite(!song.isFavorite());
            return songRepository.save(song);
        }).orElseThrow(() -> new NoSuchElementException("Song not found with id " + id));
    }


    @Override
    public Song save(Song song) {
        return songRepository.save(song);
    }

    @Override
    public Song createSongWithImage(Song song, MultipartFile imageFile) throws IOException {
        byte[] imageBytes = imageFile.getBytes();
        song.setImage(imageBytes);
        return songRepository.save(song);
    }

}
