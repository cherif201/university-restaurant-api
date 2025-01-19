-- DropForeignKey
ALTER TABLE "UserPrefs" DROP CONSTRAINT "UserPrefs_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserPrefs" ADD CONSTRAINT "UserPrefs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
