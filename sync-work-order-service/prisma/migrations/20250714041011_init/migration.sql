-- CreateTable
CREATE TABLE "WorkOrder" (
    "jobNum" TEXT NOT NULL PRIMARY KEY,
    "organizationCode" TEXT,
    "workOrderDescription" TEXT,
    "statusCode" TEXT,
    "equipamentCode" TEXT,
    "equipamentDescription" TEXT,
    "departmentCode" TEXT,
    "classCode" TEXT,
    "problemCode" TEXT,
    "schedgroupCode" TEXT,
    "schedgroupDescription" TEXT,
    "assignedToPersonCode" TEXT,
    "assignedToPersonName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
