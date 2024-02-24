package com.launchcode.crescendo.backend.services.impl;

import com.launchcode.crescendo.backend.models.Song;
import com.launchcode.crescendo.backend.repository.SongRepository;
import com.launchcode.crescendo.backend.services.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

import java.util.Optional;

import java.util.List;

//service implementation holds the logic to handle the database interactions
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
    public Song createSongWithImage(Song song, MultipartFile imageFile) throws IOException {
        byte[] imageBytes = imageFile.getBytes();
        song.setImage(imageBytes);
        return songRepository.save(song);
    }

}
