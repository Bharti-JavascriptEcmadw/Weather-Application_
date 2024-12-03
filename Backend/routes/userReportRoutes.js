// routes/userReportRoutes.js
import express from 'express';
import { getAllUserReports } from '../controller/userReportController.js';

const router = express.Router();

// Route to fetch all user reports
router.get('/userre', getAllUserReports);

export default router;
