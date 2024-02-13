package com.launchcode.crescendo.backend.controllers;

import com.launchcode.crescendo.backend.data.SongRepository;
import com.launchcode.crescendo.backend.models.Song;
import com.launchcode.crescendo.backend.service.SongService;
import com.launchcode.crescendo.backend.service.SpotifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@Controller
@RequestMapping("songs")
public class SongController {

    @Autowired
    private SongService songService;

    @Autowired
    private SpotifyService spotifyService;

    @Autowired
    private SongRepository songRepository;

    @GetMapping
    public String displayUserSongs(Model model) {
        model.addAttribute("title", "Your Library");
        model.addAttribute("songs", songService.getAllSongs());
        return "songs/index";
    }

    @GetMapping("create")
    public String displayAddSongForm(Model model) {
        model.addAttribute("title", "Add new song");
        model.addAttribute("newSong", new Song());
        return "songs/create";
    }

    @PostMapping("create")
    public String processAddSongForm(@ModelAttribute @Valid Song newSong,
                                     Errors errors, Model model) {
        if (errors.hasErrors()) {
            model.addAttribute("title", "Add new song");
            return "songs/create";
        }
        songService.createSong(newSong.getTitle(), newSong.getMusician());
        return "redirect:/songs";
    }

    @GetMapping("searchSpotify")
    public String searchSpotify(@RequestParam String query, Model model) {
        model.addAttribute("title", "Search Spotify");
        model.addAttribute("tracks", spotifyService.searchTracks(query));
        return "songs/searchSpotify";
    }

    @GetMapping("update/{id}")
    public String displayUpdateSongForm(@PathVariable Long id, Model model) {
        Song songToUpdate = songService.getSongById(id);
        if (songToUpdate == null) {
            return "redirect:/songs";
        }
        model.addAttribute("title", "Update Song");
        model.addAttribute("song", songToUpdate);
        return "songs/update";
    }

    @PostMapping("update/{id}")
    public String processUpdateSongForm(@PathVariable Long id, @ModelAttribute @Valid Song updatedSong,
                                        Errors errors, Model model) {
        if (errors.hasErrors()) {
            model.addAttribute("title", "Update Song");
            return "songs/update";
        }
        songService.updateSong(id, updatedSong.getTitle(), updatedSong.getMusician());
        return "redirect:/songs";
    }

    @GetMapping("delete/{id}")
    public String deleteSong(@PathVariable int id) {
        songService.deleteSong(id);
        return "redirect:/songs";
    }
}
