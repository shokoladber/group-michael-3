package com.launchcode.crescendo.backend.services.impl;

import com.launchcode.crescendo.backend.models.Song;
import com.launchcode.crescendo.backend.repository.SongRepository;
import com.launchcode.crescendo.backend.services.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

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

}
