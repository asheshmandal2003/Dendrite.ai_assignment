-- CreateTable
CREATE TABLE "Drawing" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Drawing_pkey" PRIMARY KEY ("id")
);
