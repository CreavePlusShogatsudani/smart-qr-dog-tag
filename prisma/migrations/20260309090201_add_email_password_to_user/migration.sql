/*
  Warnings:

  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "line_user_id" TEXT,
    "sos_message" TEXT,
    "sos_contact_name" TEXT,
    "sos_contact_phone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "id", "line_user_id", "sos_contact_name", "sos_contact_phone", "sos_message", "updatedAt") SELECT "createdAt", "id", "line_user_id", "sos_contact_name", "sos_contact_phone", "sos_message", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_line_user_id_key" ON "User"("line_user_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
