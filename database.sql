CREATE DATABASE IF NOT EXISTS ensolvers_data;
USE ensolvers_data;

CREATE TABLE IF NOT EXISTS state (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nameCategory VARCHAR(100) NOT NULL
 );

CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(1000) NOT NULL,
    number INT, 
    id_state INT NOT NULL,
    id_category INT,
    FOREIGN KEY (id_state) REFERENCES state(id),
	FOREIGN KEY (id_category) REFERENCES categories(id)
);
INSERT INTO ensolvers_data.state (id, status) VALUES ('1', 'active');
INSERT INTO ensolvers_data.state (id, status) VALUES ('2', 'archived');

