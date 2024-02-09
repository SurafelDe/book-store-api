-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "writer" VARCHAR(255) NOT NULL,
    "cover_image" TEXT NOT NULL DEFAULT false,
    "price" DOUBLE PRECISION NOT NULL,
    "tags" TEXT[],
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "number_of_review" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 100,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "orderCode" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderCode_key" ON "Order"("orderCode");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
