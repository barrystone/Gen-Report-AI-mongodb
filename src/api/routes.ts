import { Router } from 'express';
import { getReport, generateReport } from '../services/reportService';
import {
  fetchCodingRecord,
  getCodingRecord
} from '../services/codingRecordService';

const router = Router();

router.get('/report', getReport);
router.get('/codingRecord', getCodingRecord);
router.post('/generateReport', generateReport);
router.post('/fetchCodingRecord', fetchCodingRecord);

export default router;
