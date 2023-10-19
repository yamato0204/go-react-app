DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
    `id` varchar(255) NOT NULL,
    `email` varchar(60) NOT NULL UNIQUE,
    `password` varchar(60) NOT NULL,
    `name` varchar(60) NOT NULL UNIQUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);


CREATE TABLE `records` (
    `id` varchar(255) NOT NULL,
    `memo` varchar(60) NOT NULL,
    `duration` int(60) NOT NULL,
    `user_id` varchar(255) NOT NULL,
    `category_id` varchar(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `categories` (
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `color_r` int(60) NOT NULL,
    `color_g` int(60) NOT NULL,
    `color_b` int(60) NOT NULL,
    `color_a` int(60) NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);


-- type Categories struct {
-- 	ID  string  `json:"id"`
-- 	Name string  `json:"name"`
-- 	Color_code string  `json:"color"`
-- 	UserId    string    `json:"user_id" gorm:"not null"`

--  }