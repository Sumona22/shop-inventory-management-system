import { Router } from "express";

/* ===============================
   STORE MANAGER CONTROLLERS
================================ */
import {
  createOrderRequest,
  getMyOrderRequests
} from "../controllers/orderRequest-controllers/orderRequestStoreManagerController";

/* ===============================
   ADMIN CONTROLLERS
================================ */
import {
  getAllOrderRequests,
  modifyOrderRequest,
  markWaitingForAvailability,
  approveOrderRequest,
  rejectOrderRequest
} from "../controllers/orderRequest-controllers/orderRequestAdminController";

/* ===============================
   COMMON CONTROLLERS
================================ */
import {
  getOrderRequestById
} from "../controllers/orderRequest-controllers/orderRequestCommonController";

/* ===============================
   MIDDLEWARE
================================ */
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authMiddleware"; 

const router = Router();

/* =====================================================
   STORE MANAGER ROUTES
===================================================== */

// Create order request
router.post(
  "/",
  protect,
  authorize("StoreManager"),
  createOrderRequest
);

// Store manager – view own order requests
router.get(
  "/my",
  protect,
  authorize("StoreManager"),
  getMyOrderRequests
);

/* =====================================================
   ADMIN ROUTES
===================================================== */

// Admin – get all order requests
router.get(
  "/admin",
  protect,
  authorize("Admin"),
  getAllOrderRequests
);

// Admin – modify quantities
router.patch(
  "/admin/:id/modify",
  protect,
  authorize("ADMIN"),
  modifyOrderRequest
);

// Admin – mark stock not available
router.patch(
  "/admin/:id/waiting",
  protect,
  authorize("ADMIN"),
  markWaitingForAvailability
);

// Admin – approve order
router.patch(
  "/admin/:id/approve",
  protect,
  authorize("ADMIN"),
  approveOrderRequest
);

// Admin – reject order
router.patch(
  "/admin/:id/reject",
  protect,
  authorize("ADMIN"),
  rejectOrderRequest
);

/* =====================================================
   COMMON ROUTES
===================================================== */

// View single order request (admin + store manager)
router.get(
  "/:id",
  protect,
  getOrderRequestById
);

export default router;
