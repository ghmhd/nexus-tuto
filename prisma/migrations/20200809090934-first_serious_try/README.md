# Migration `20200809090934-first_serious_try`

This migration has been generated by Gharbi Mohamed at 8/9/2020, 10:09:34 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "User" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"firstName" TEXT NOT NULL,
"lastName" TEXT NOT NULL,
"email" TEXT NOT NULL,
"password" TEXT NOT NULL,
"enabled" BOOLEAN NOT NULL DEFAULT false,
"sex" INTEGER NOT NULL,
"profileId" INTEGER NOT NULL,
"groupId" INTEGER NOT NULL,
FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE,

FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE "Profile" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"birthDate" DATETIME ,
"profilePicture" TEXT NOT NULL DEFAULT '/images/profile.jpg')

CREATE TABLE "Message" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"content" TEXT NOT NULL,
"fromId" INTEGER NOT NULL,
FOREIGN KEY ("fromId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE "Group" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"name" TEXT NOT NULL)

CREATE TABLE "new_Post" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"body" TEXT NOT NULL,
"title" TEXT NOT NULL,
"published" BOOLEAN NOT NULL,
"autorId" INTEGER NOT NULL,
FOREIGN KEY ("autorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

INSERT INTO "new_Post" ("id", "body", "title", "published") SELECT "id", "body", "title", "published" FROM "Post"

PRAGMA foreign_keys=off;
DROP TABLE "Post";;
PRAGMA foreign_keys=on

ALTER TABLE "new_Post" RENAME TO "Post";

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")

CREATE UNIQUE INDEX "User.profileId_unique" ON "User"("profileId")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200809081145-init..20200809090934-first_serious_try
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator prisma_client {
   provider= "prisma-client-js"
@@ -15,27 +15,47 @@
   password String
   enabled Boolean @default(false)
   sex Int 
+  posts Post[]
+  profileId Int @unique
+  profile Profile @relation (fields: [profileId], references: [id])
+
+
+  groupId Int 
+  group Group @relation(fields: [groupId], references: [id])
+
 }
 model Profile {
   id Int @id @default(autoincrement())
   birthDate DateTime?
-  profilePicture String
-
-
+  profilePicture String @default("/images/profile.jpg")
+  user User
 }
 model Post {
   id Int @id @default(autoincrement())
   body String
   title String
   published Boolean
+
+  autorId Int
+  author  User @relation(fields: [autorId], references: [id])
 }
 model Message {
   id Int @id @default(autoincrement())
   content String
+  fromId Int
+  from User @relation(fields: [fromId], references: [id])
+
 }
+
+model Group {
+  id Int @id @default(autoincrement())
+  name String 
+  participants User[]
+  
+}
```


