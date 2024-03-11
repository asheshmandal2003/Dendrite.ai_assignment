-- AlterTable
ALTER TABLE "Drawing" ADD COLUMN     "access" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Untitled Document';
