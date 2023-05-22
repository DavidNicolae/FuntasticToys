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

INSERT INTO "user" ("full_name", "mail", "password", "active_token", "role", "address")
VALUES ('Test User', 'test@mail.com', 'nopass123', 'llllllllllllllllll', 'admin', '1118 W Park Ave');

INSERT INTO "order" ("user_id", "address", "total_price", "status")
VALUES ('1', '	1118 W Park Ave', '445.00', 'PENDING');