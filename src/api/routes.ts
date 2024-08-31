import { Router } from 'express';
import ReportService from '../services/ReportService';
import CodingRecordService from '../services/CodingRecordService';
import Container from 'typedi';

const router = Router();

const reportService = Container.get(ReportService);
const codingRecordService = Container.get(CodingRecordService);

router.get('/report', reportService.getReport);
router.get('/codingRecord', codingRecordService.getCodingRecord);
router.post('/generateReport', reportService.generateReport);
router.post('/fetchCodingRecord', codingRecordService.fetchCodingRecord);

export default router;
