-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoriesToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriesToPost_AB_unique" ON "_CategoriesToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriesToPost_B_index" ON "_CategoriesToPost"("B");

-- AddForeignKey
ALTER TABLE "_CategoriesToPost" ADD CONSTRAINT "_CategoriesToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriesToPost" ADD CONSTRAINT "_CategoriesToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
