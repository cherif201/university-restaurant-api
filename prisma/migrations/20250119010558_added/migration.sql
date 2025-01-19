-- CreateTable
CREATE TABLE "DailyMenu" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyMenu_pkey" PRIMARY KEY ("id")
);
