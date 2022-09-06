BEGIN;

DROP TABLE IF EXISTS users, posts, likes, comments CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    user_img  VARCHAR(500) DEFAULT 'https://bit.ly/3RagrYZ'
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    post TEXT NOT NULL,
    date DATE DEFAULT now(),
    post_img VARCHAR(500) DEFAULT null,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    comment TEXT NOT NULL,
    date DATE DEFAULT now(),
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE likes(
    id int PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

COMMIT;
