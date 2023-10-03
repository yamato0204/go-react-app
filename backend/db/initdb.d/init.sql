DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
    `id` varchar(255) NOT NULL,
    `email` varchar(60) NOT NULL,
    `password` varchar(60) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);


CREATE TABLE `records` (
    `id` varchar(255) NOT NULL,
    `memo` varchar(60) NOT NULL,
    `duration` int(60) NOT NULL,
    `user_id` varchar(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

