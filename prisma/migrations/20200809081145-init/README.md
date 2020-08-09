# Migration `20200809081145-init`

This migration has been generated by Gharbi Mohamed at 8/9/2020, 9:11:45 AM.
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
"sex" INTEGER NOT NULL)

CREATE TABLE "Profile" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"birthDate" DATETIME ,
"profilePicture" TEXT NOT NULL)

CREATE TABLE "Message" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"content" TEXT NOT NULL)

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200809052441-create-post-table..20200809081145-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,15 +1,41 @@
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator prisma_client {
   provider= "prisma-client-js"
 }
+model User {
+  id Int @id @default(autoincrement())
+  firstName String 
+  lastName String 
+  email String @unique
+  password String
+  enabled Boolean @default(false)
+  sex Int 
+
+}
+
+model Profile {
+  id Int @id @default(autoincrement())
+  birthDate DateTime?
+  profilePicture String
+
+
+}
+
 model Post {
   id Int @id @default(autoincrement())
   body String
   title String
   published Boolean
 }
+
+
+model Message {
+  id Int @id @default(autoincrement())
+  content String
+  
+}
```

