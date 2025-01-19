-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "verificationToken" TEXT;
