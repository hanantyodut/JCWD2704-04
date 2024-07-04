/*
  Warnings:

  - The primary key for the `job_registrations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `admin_id` on the `job_registrations` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `job_registrations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `job_registrations` DROP PRIMARY KEY,
    DROP COLUMN `admin_id`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`job_id`, `user_id`);

-- AddForeignKey
ALTER TABLE `job_registrations` ADD CONSTRAINT `job_registrations_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_registrations` ADD CONSTRAINT `job_registrations_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
