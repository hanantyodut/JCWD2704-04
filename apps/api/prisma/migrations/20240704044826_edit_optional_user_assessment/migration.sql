/*
  Warnings:

  - Made the column `user_id` on table `skill_assessments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `skill_assessments` DROP FOREIGN KEY `skill_assessments_user_id_fkey`;

-- AlterTable
ALTER TABLE `skill_assessments` MODIFY `user_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `skill_assessments` ADD CONSTRAINT `skill_assessments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
