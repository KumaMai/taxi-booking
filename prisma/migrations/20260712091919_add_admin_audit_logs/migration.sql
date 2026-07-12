-- CreateTable
CREATE TABLE "audit_logs" (
    "audit_logs_id" SERIAL NOT NULL,
    "admin_user_id" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("audit_logs_id")
);

-- CreateIndex
CREATE INDEX "audit_logs_admin_user_id_created_at_idx" ON "audit_logs"("admin_user_id", "created_at");

-- CreateIndex
CREATE INDEX "audit_logs_entity_entityId_created_at_idx" ON "audit_logs"("entity", "entityId", "created_at");

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_admin_user_id_fkey" FOREIGN KEY ("admin_user_id") REFERENCES "admin_users"("admin_users_id") ON DELETE RESTRICT ON UPDATE CASCADE;
