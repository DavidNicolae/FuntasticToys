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