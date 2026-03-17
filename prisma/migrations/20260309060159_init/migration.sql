-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "line_user_id" TEXT NOT NULL,
    "sos_message" TEXT,
    "sos_contact_name" TEXT,
    "sos_contact_phone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "owner_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "breed" TEXT,
    "age" INTEGER,
    "is_lost" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Pet_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VaccineRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pet_id" TEXT NOT NULL,
    "rabies_date" DATETIME,
    "mixed_date" DATETIME,
    "certificateUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "VaccineRecord_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MedicalRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pet_id" TEXT NOT NULL,
    "chronic_diseases" TEXT,
    "medications" TEXT,
    "vet_clinic_name" TEXT,
    "vet_clinic_phone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MedicalRecord_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pet_id" TEXT,
    "tag_hash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Tag_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_line_user_id_key" ON "User"("line_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_tag_hash_key" ON "Tag"("tag_hash");
