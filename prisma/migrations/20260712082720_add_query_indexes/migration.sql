-- CreateIndex
CREATE INDEX "attractions_is_active_sort_order_idx" ON "attractions"("is_active", "sort_order");

-- CreateIndex
CREATE INDEX "bookings_status_created_at_idx" ON "bookings"("status", "created_at");

-- CreateIndex
CREATE INDEX "bookings_pickup_date_idx" ON "bookings"("pickup_date");

-- CreateIndex
CREATE INDEX "faqs_category_id_is_active_sort_order_idx" ON "faqs"("category_id", "is_active", "sort_order");

-- CreateIndex
CREATE INDEX "price_routes_zone_id_is_active_sort_order_idx" ON "price_routes"("zone_id", "is_active", "sort_order");

-- CreateIndex
CREATE INDEX "reviews_is_active_created_at_idx" ON "reviews"("is_active", "created_at");
