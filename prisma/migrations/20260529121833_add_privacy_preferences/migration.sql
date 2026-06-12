-- AlterTable
ALTER TABLE "User" ADD COLUMN     "publicProfile" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "showResumeScore" BOOLEAN NOT NULL DEFAULT true;
