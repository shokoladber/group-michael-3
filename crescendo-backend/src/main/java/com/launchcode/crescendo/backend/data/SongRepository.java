package com.launchcode.crescendo.backend.data;

import com.launchcode.crescendo.backend.models.Song;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SongRepository extends CrudRepository<Song, Integer> {
    Optional<Song> findById(long id);
};

