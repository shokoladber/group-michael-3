package com.launchcode.crescendo.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.boot.autoconfigure.web.WebProperties;


@Entity
@Table(name="songs")//annotation is used to provide the details of the table that this entity will be mapped to
public class Song {
    @Id //This is a primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Allows database to generate the values of our primary key
    @Column(name= "id")//annotation is used to define the properties of the column that will be mapped to the annotated field
    private Integer id;

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 50, message = "Title must be between 3 and 50 characters")
    @Column(name= "title")//annotation is used to define the properties of the column that will be mapped to the annotated field
    private String title;

    @NotBlank(message = "Musician/Show is required")
    @Size(min = 3, max = 50, message = "Musician/Show must be between 3 and 50 characters")
    @Column(name= "musician")//annotation is used to define the properties of the column that will be mapped to the annotated field
    private String musician;

    @Size(max = 500, message = "Notes too long! Must be at least 500 characters.")
    private String notes;


    @Lob
    @Column(name = "image", columnDefinition = "LONGBLOB")
    private byte[] image;

    public Song(String title, String musician, String notes) {
        this.title = title;
        this.musician = musician;
        this.notes = notes;
    }


    public byte[] getImage() {
        return image;
    }


    private String fileName;

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setImage(byte[] imageBytes) {
        this.image = imageBytes;
    }
    public Song() {}

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMusician() {
        return musician;
    }

    public void setMusician(String musician) {
        this.musician = musician;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public int getId() {
        return id;
    }

    @Override
    public String toString() {
        return "Song{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", musician='" + musician + '\'' +
                ", notes='" + notes + '\'' +
                '}';
    }
}
