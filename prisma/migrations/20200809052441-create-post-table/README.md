# Migration `20200809052441-create-post-table`

This migration has been generated by Gharbi Mohamed at 8/9/2020, 6:24:41 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "Post" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"body" TEXT NOT NULL,
"title" TEXT NOT NULL,
"published" BOOLEAN NOT NULL)

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200809052441-create-post-table
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,15 @@
+datasource db {
+  provider = "sqlite"
+  url = "***"
+}
+
+generator prisma_client {
+  provider= "prisma-client-js"
+}
+
+model Post {
+  id Int @id @default(autoincrement())
+  body String
+  title String
+  published Boolean
+}
```


