/*
  Warnings:

  - You are about to drop the column `idUser` on the `Post` table. All the data in the column will be lost.
  - Added the required column `email` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_idUser_fkey`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `idUser`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_email_fkey` FOREIGN KEY (`email`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
