package com.test.back.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

import lombok.Data;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)    
    private Long id;

    @NotBlank(message = "Le code du produit ne peut pas être vide")
    @Size(max = 20, message = "Le code du produit ne peut pas dépasser {max} caractères")
    @Column(unique = true)
    private String code;

    @NotBlank(message = "Le nom du produit ne peut pas être vide")
    private String name;

    private String description;

    @Positive(message = "Le prix du produit doit être un nombre positif")
    private double price;

    @Positive(message = "La quantité du produit doit être un nombre positif")
    private int quantity;

    @Column(name = "inventory_status")
    private String inventoryStatus;

    private String category;

    private String image;

    private Double rating;

    public Product() {
    }

    public Product(String code, String name, String description, double price, int quantity, String inventoryStatus, String category, String image, Double rating) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.inventoryStatus = inventoryStatus;
        this.category = category;
        this.image = image;
        this.rating = rating;
    }
}
