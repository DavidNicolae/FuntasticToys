ALTER TABLE IF EXISTS "product_list"
DROP CONSTRAINT IF EXISTS "product_list_product_id_fkey";
ALTER TABLE IF EXISTS "product_list"
DROP CONSTRAINT IF EXISTS "product_list_order_id_fkey";
ALTER TABLE IF EXISTS "order"
DROP CONSTRAINT IF EXISTS "order_user_id_fkey";
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "order";
DROP TABLE IF EXISTS "product_list";
DROP TABLE IF EXISTS "product";


CREATE TABLE "user" (  
  "id" serial NOT NULL,
  PRIMARY KEY ("id"),
  "full_name" text NOT NULL,
  "mail" text NOT NULL,
  "password" text NOT NULL,
  "active_token" text NOT NULL,
  "role" text NOT NULL,
  "address" text NOT NULL
);


CREATE TABLE "order" (
  "id" serial NOT NULL,
  PRIMARY KEY ("id"),
  "user_id" integer NOT NULL,
  "address" text NOT NULL,
  "total_price" double precision NOT NULL DEFAULT '0',
  "status" text NOT NULL DEFAULT 'PENDING'
);

CREATE TABLE "product_list" (
  "product_id" integer NOT NULL,
  "order_id" integer NOT NULL,
  "qty" integer NOT NULL DEFAULT '1',
  "price" double precision NOT NULL
);

CREATE TABLE "product" (
  "id" serial NOT NULL,
  PRIMARY KEY ("id"),
  "description" text NOT NULL,
  "photo_src" text NOT NULL,
  "name" text NOT NULL,
  "qty_stock" integer NOT NULL,
  "qty_sold" integer NOT NULL,
  "price" double precision NOT NULL
);


ALTER TABLE "product_list"
ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "product_list"
ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "order"
ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO "product"("description", "photo_src", "name", "qty_stock", "qty_sold", "price") 
VALUES 
    ('Fun and colorful puzzle toy', 'puzzle1.jpg', 'Rainbow Puzzle', 150, 0, 10.00),
    ('Classic teddy bear, soft and huggable', 'teddybear1.jpg', 'Teddy Bear', 200, 0, 20.00),
    ('Exciting race car with remote control', 'racecar1.jpg', 'Remote Control Race Car', 100, 0, 30.00),
    ('Plastic building blocks set', 'blocks1.jpg', 'Building Blocks', 80, 0, 25.00),
    ('Adorable doll with changeable clothes', 'doll1.jpg', 'Fashion Doll', 120, 0, 15.00),
    ('A fun board game for the whole family', 'boardgame1.jpg', 'Family Board Game', 200, 0, 20.00),
    ('Interactive learning tablet for kids', 'tablet1.jpg', 'Learning Tablet', 50, 0, 40.00),
    ('Dinosaur toy set with realistic details', 'dinosaurs1.jpg', 'Dinosaur Toy Set', 100, 0, 30.00),
    ('Artist set with colors and brushes', 'artistset1.jpg', 'Artist Set', 60, 0, 35.00),
    ('Magic trick set for aspiring magicians', 'magicset1.jpg', 'Magic Set', 80, 0, 45.00),
    ('Wooden train set with tracks', 'trainset1.jpg', 'Wooden Train Set', 70, 0, 50.00),
    ('Space-themed puzzle set', 'spacepuzzle1.jpg', 'Space Puzzle Set', 90, 0, 15.00),
    ('Action figure of popular superhero', 'actionfigure1.jpg', 'Superhero Action Figure', 200, 0, 25.00),
    ('Musical instrument toy set', 'musicalset1.jpg', 'Musical Toy Set', 110, 0, 40.00),
    ('Soft plush toy in shape of a bunny', 'bunny1.jpg', 'Plush Bunny', 180, 0, 20.00),
    ('Interactive kitchen play set', 'kitchenplay1.jpg', 'Kitchen Play Set', 65, 0, 55.00),
    ('Robot toy with remote control', 'robot1.jpg', 'Robot Toy', 100, 0, 50.00),
    ('Adventurous pirate ship toy', 'pirateship1.jpg', 'Pirate Ship Toy', 120, 0, 35.00),
    ('Educational globe for children', 'globe1.jpg', 'Educational Globe', 75, 0, 30.00),
    ('Classic wooden toy car', 'woodencar1.jpg', 'Wooden Toy Car', 150, 0, 10.00);

INSERT INTO "user"("full_name", "mail", "password", "active_token", "role", "address") 
VALUES 
    ('James T. Kirk', 'james.kirk@mail.com', 'password123', 'token1', 'customer', '1701 Enterprise Dr, San Francisco, CA'),
    ('Jean-Luc Picard', 'jean.picard@mail.com', 'password456', 'token2', 'customer', '1701 Federation Pl, San Francisco, CA'),
    ('Kathryn Janeway', 'kathryn.janeway@mail.com', 'password789', 'token3', 'customer', '74656 Voyager St, San Francisco, CA'),
    ('Benjamin Sisko', 'benjamin.sisko@mail.com', 'ds9rules', 'token4', 'customer', '46531 DS9 Dr, San Francisco, CA'),
    ('Jonathan Archer', 'jonathan.archer@mail.com', 'password321', 'token5', 'customer', '2151 Enterprise Ln, San Francisco, CA'),
    ('Spock', 'spock@mail.com', 'logicalpass', 'token6', 'customer', '1701 Vulcan Way, San Francisco, CA'),
    ('Deanna Troi', 'deanna.troi@mail.com', 'empathetic', 'token7', 'customer', '1701 Betazed Blvd, San Francisco, CA'),
    ('Beverly Crusher', 'beverly.crusher@mail.com', 'medicalpass', 'token8', 'customer', '1701 Medical Pl, San Francisco, CA'),
    ('Geordi La Forge', 'geordi.laforge@mail.com', 'engineering123', 'token9', 'customer', '1701 Engineering St, San Francisco, CA'),
    ('Data', 'data@mail.com', 'androidpass', 'token10', 'customer', '1701 AI Ln, San Francisco, CA'),
    ('Worf', 'worf@mail.com', 'klingon123', 'token11', 'customer', '1701 Klingon Rd, San Francisco, CA'),
    ('William Riker', 'william.riker@mail.com', 'firstofficer', 'token12', 'customer', '1701 First St, San Francisco, CA'),
    ('Julian Bashir', 'julian.bashir@mail.com', 'ds9medic', 'token13', 'customer', '46531 Medical St, San Francisco, CA'),
    ('Jadzia Dax', 'jadzia.dax@mail.com', 'trillpass', 'token14', 'customer', '46531 Trill Ln, San Francisco, CA'),
    ('Quark', 'quark@mail.com', 'profit123', 'token15', 'customer', '46531 Ferengi Blvd, San Francisco, CA'),
    ('Elanna Torres', 'belanna.torres@mail.com', 'voyengi', 'token16', 'customer', '74656 Engineering Dr, San Francisco, CA'),
    ('Seven of Nine', 'seven@mail.com', 'borgpass', 'token17', 'customer', '74656 Borg Pl, San Francisco, CA'),
    ('T Pol', 'tpol@mail.com', 'vulcanpass', 'token18', 'customer', '2151 Vulcan St, San Francisco, CA'),
    ('Hoshi Sato', 'hoshi.sato@mail.com', 'linguist123', 'token19', 'customer', '2151 Linguist Ln, San Francisco, CA'),
    ('Malcolm Reed', 'malcolm.reed@mail.com', 'security321', 'token20', 'customer', '2151 Security Blvd, San Francisco, CA');

INSERT INTO "user" ("full_name", "mail", "password", "active_token", "role", "address")
VALUES ('Test User', 'test@mail.com', 'nopass123', 'llllllllllllllllll', 'admin', '1118 W Park Ave');

INSERT INTO "order" ("user_id", "address", "total_price", "status")
VALUES ('1', '	1118 W Park Ave', '445.00', 'PENDING');