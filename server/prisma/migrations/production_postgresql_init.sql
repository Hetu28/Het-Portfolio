-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT DEFAULT 'General Collaboration',
    "referral" TEXT,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'UNREAD',
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "videoUrl" TEXT,
    "synopsis" TEXT NOT NULL,
    "client" TEXT,
    "type" TEXT NOT NULL DEFAULT 'video',
    "behanceUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectCategoryMapping" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "ProjectCategoryMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectDeliverable" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProjectDeliverable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectStill" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "caption" TEXT,
    "lighting" TEXT,
    "aspect" TEXT DEFAULT 'wide',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProjectStill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnicalSpecs" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "camera" TEXT,
    "lens" TEXT,
    "aspectRatio" TEXT,
    "colorGrading" TEXT,
    "lightingStyle" TEXT,
    "location" TEXT,

    CONSTRAINT "TechnicalSpecs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilmographyGroup" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "subtitle" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FilmographyGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilmographyItem" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "meta" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FilmographyItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContributionFilm" (
    "id" TEXT NOT NULL,
    "seat" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ContributionFilm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FreelanceProject" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FreelanceProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FreelanceProjectRole" (
    "id" TEXT NOT NULL,
    "freelanceProjectId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FreelanceProjectRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrandCollaboration" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "extra" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BrandCollaboration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Inquiry_status_idx" ON "Inquiry"("status");

-- CreateIndex
CREATE INDEX "Inquiry_createdAt_idx" ON "Inquiry"("createdAt");

-- CreateIndex
CREATE INDEX "Project_featured_idx" ON "Project"("featured");

-- CreateIndex
CREATE INDEX "Project_sortOrder_idx" ON "Project"("sortOrder");

-- CreateIndex
CREATE INDEX "ProjectCategoryMapping_category_idx" ON "ProjectCategoryMapping"("category");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectCategoryMapping_projectId_category_key" ON "ProjectCategoryMapping"("projectId", "category");

-- CreateIndex
CREATE INDEX "ProjectDeliverable_projectId_idx" ON "ProjectDeliverable"("projectId");

-- CreateIndex
CREATE INDEX "ProjectStill_projectId_idx" ON "ProjectStill"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "TechnicalSpecs_projectId_key" ON "TechnicalSpecs"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "FilmographyGroup_role_key" ON "FilmographyGroup"("role");

-- CreateIndex
CREATE INDEX "FilmographyItem_groupId_idx" ON "FilmographyItem"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "ContributionFilm_seat_key" ON "ContributionFilm"("seat");

-- CreateIndex
CREATE INDEX "ContributionFilm_category_idx" ON "ContributionFilm"("category");

-- CreateIndex
CREATE INDEX "ContributionFilm_year_idx" ON "ContributionFilm"("year");

-- CreateIndex
CREATE UNIQUE INDEX "FreelanceProject_title_key" ON "FreelanceProject"("title");

-- CreateIndex
CREATE INDEX "FreelanceProjectRole_freelanceProjectId_idx" ON "FreelanceProjectRole"("freelanceProjectId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE INDEX "AdminUser_email_idx" ON "AdminUser"("email");

-- AddForeignKey
ALTER TABLE "ProjectCategoryMapping" ADD CONSTRAINT "ProjectCategoryMapping_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectDeliverable" ADD CONSTRAINT "ProjectDeliverable_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectStill" ADD CONSTRAINT "ProjectStill_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalSpecs" ADD CONSTRAINT "TechnicalSpecs_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilmographyItem" ADD CONSTRAINT "FilmographyItem_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "FilmographyGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FreelanceProjectRole" ADD CONSTRAINT "FreelanceProjectRole_freelanceProjectId_fkey" FOREIGN KEY ("freelanceProjectId") REFERENCES "FreelanceProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

