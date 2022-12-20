/*
  Warnings:

  - A unique constraint covering the columns `[index]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[index]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Card_index_key" ON "Card"("index");

-- CreateIndex
CREATE UNIQUE INDEX "Task_index_key" ON "Task"("index");
