-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_email_fkey`;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_email_fkey` FOREIGN KEY (`email`) REFERENCES `User`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;
