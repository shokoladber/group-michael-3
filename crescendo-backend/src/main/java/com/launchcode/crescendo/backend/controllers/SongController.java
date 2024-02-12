package com.launchcode.crescendo.backend.controllers;

import com.launchcode.crescendo.backend.data.MusicData;
import com.launchcode.crescendo.backend.data.SongRepository;
import com.launchcode.crescendo.backend.models.Song;
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
    private SongRepository songRepository;

    @GetMapping
    public String displayUserSongs (Model model) {
        model.addAttribute("title","Your Library");
        model.addAttribute("songs", songRepository.findAll());
        return "songs/index";
    }
    @GetMapping("create")
    public String displayAddSongForm(Model model){
        model.addAttribute("title","Add new song");
        model.addAttribute(new Song());
        return "songs/create";
    }
    @PostMapping("create")
    public String processAddSongForm(@ModelAttribute @Valid Song newSong,
                                     Errors errors, Model model) {
        if(errors.hasErrors()) {
            model.addAttribute("title", "Add new song");
            return "songs/create";
        }
        songRepository.save(newSong);
        return "redirect:/songs";
    }

    @GetMapping("update/{id}")
    public String displayUpdateSongForm(@PathVariable int id, Model model){
        Song songToUpdate = MusicData.getById(id);
        if (songToUpdate == null){
            return "redirect:/songs";
        }
        model.addAttribute("title", "Update Song");
        model.addAttribute("song", songToUpdate);
        return "songs/update";
    }

    @PostMapping("update/{id}")
    public String processUpdateSongForm(@PathVariable int id, @ModelAttribute @Valid Song updatedSong,
                                        Errors errors, Model model){
        if (errors.hasErrors()) {
            model.addAttribute("title", "Update Song");
            return "songs/update";
        }

        Song existingSong = MusicData.getById(id);
        if(existingSong == null){
            return "redirect:/songs";
        }
        existingSong.setTitle(updatedSong.getTitle());
        existingSong.setMusician(updatedSong.getMusician());

        return "redirect:/songs";
    }
    @GetMapping("delete/{id}")
    public String deleteSong(@PathVariable int id){
        songRepository.deleteById(id);
        return "redirect:/songs";
    }
}