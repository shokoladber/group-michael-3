package com.launchcode.crescendo.backend.repository;

import com.launchcode.crescendo.backend.models.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SongRepository extends JpaRepository<Song, Integer> {



//    @Query("SELECT s FROM Song s WHERE " +
//            "s.title LIKE CONCAT('%',:query, '%')" +
//            "s.musician LIKE CONCAT('%',:query, '%')")
//    List<Song> searchSongs(String query);

//    @Query(value = "SELECT * FROM crescendo.songs s WHERE " +
//            "s.title LIKE CONCAT('%',:query, '%')" +
//            "s.musician LIKE CONCAT('%',:query, '%')", nativeQuery = true)
//    List<Song> searchSongsSQL(String query);

    @Query(value = "SELECT * FROM songs WHERE " +
            "title LIKE CONCAT('%',:query, '%')" +
            "musician LIKE CONCAT('%',:query, '%')", nativeQuery = true)
    List<Song> searchSongsSQL(String query);
}

