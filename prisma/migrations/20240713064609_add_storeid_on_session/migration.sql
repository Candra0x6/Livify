-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "storeId" TEXT NOT NULL DEFAULT 'null';

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
