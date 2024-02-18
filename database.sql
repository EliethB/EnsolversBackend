CREATE DATABASE IF NOT EXISTS ensolvers_data;
USE ensolvers_data;

CREATE TABLE IF NOT EXISTS state (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(1000) NOT NULL,
    number INT, 
    id_state INT NOT NULL,
    FOREIGN KEY (id_state) REFERENCES state(id)
);