package com.launchcode.crescendo.backend.data;

import com.launchcode.crescendo.backend.models.Song;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class MusicData {
    private static final Map<Integer, Song> songs = new HashMap<>();
    public static Collection<Song> getAll() {
        return songs.values();
    }
    public static Song getById(int id) {
        return songs.get(id);
    }
    public static void add(Song song) {
        songs.put(song.getId(), song);
    }
    public static void delete(int id){
        songs.remove(id);
    }
}