CREATE TABLE IF NOT EXISTS "Blueprint" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileBlobKey" TEXT NOT NULL,
    "coverUrl" TEXT NOT NULL,
    "coverBlobKey" TEXT,
    "fileSize" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blueprint_pkey" PRIMARY KEY ("id")
);