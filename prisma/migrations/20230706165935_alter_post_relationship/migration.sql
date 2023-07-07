/*
  Warnings:

  - You are about to drop the column `username` on the `Post` table. All the data in the column will be lost.
  - Added the required column `idUser` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Post_username_key` ON `Post`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `username`,
    ADD COLUMN `idUser` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
