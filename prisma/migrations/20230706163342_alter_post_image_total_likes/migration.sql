-- AlterTable
ALTER TABLE `Post` MODIFY `image` VARCHAR(191) NULL,
    MODIFY `totalLikes` INTEGER NOT NULL DEFAULT 0;