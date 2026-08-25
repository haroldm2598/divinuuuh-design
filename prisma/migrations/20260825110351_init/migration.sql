-- CreateTable
CREATE TABLE "PostTest" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PostTest_pkey" PRIMARY KEY ("id")
);
