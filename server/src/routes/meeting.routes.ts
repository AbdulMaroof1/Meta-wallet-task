import { Router } from 'express';
import {
  createMeeting,
  getMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
} from '../controllers/meeting.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate); // ✅ Protect all routes below

router.get('/', getMeetings);
router.get('/:id', getMeetingById);
router.post('/', createMeeting);
router.put('/:id', updateMeeting);
router.delete('/:id', deleteMeeting);

export default router;
