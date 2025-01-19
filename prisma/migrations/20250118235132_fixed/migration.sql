/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Vote` table. All the data in the column will be lost.
  - Added the required column `voteType` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "createdAt",
DROP COLUMN "value",
ADD COLUMN     "voteType" TEXT NOT NULL;
