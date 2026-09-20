import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();

// In-memory case storage fallback for zero-config local testing and robust offline demo
const inMemoryCases = new Map();

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (url && key && url !== 'YOUR_SUPABASE_URL') {
    try {
      return createClient(url, key);
    } catch (e) {
      console.error('[LifeBridge AI] Supabase client init error:', e);
    }
  }
  return null;
}

// GET /api/cases - List all cases
router.get('/', async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return res.json({ success: true, data });
      }
    }
    // In-memory fallback
    const cases = Array.from(inMemoryCases.values()).sort(
      (a, b) => new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at)
    );
    return res.json({ success: true, data: cases });
  } catch (err) {
    console.error('[LifeBridge AI] Error fetching cases:', err);
    return res.status(500).json({ error: 'Failed to fetch cases.' });
  }
});

// GET /api/cases/:id - Get single case by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('id', id)
        .single();
      if (!error && data) {
        return res.json({ success: true, data });
      }
    }

    const found = inMemoryCases.get(id);
    if (!found) {
      return res.status(404).json({ error: 'Case not found' });
    }
    return res.json({ success: true, data: found });
  } catch (err) {
    console.error('[LifeBridge AI] Error fetching case by id:', err);
    return res.status(500).json({ error: 'Failed to fetch case.' });
  }
});

// POST /api/cases - Save or update a case
router.post('/', async (req, res) => {
  try {
    const caseData = req.body;
    if (!caseData || !caseData.title) {
      return res.status(400).json({ error: 'Invalid case payload.' });
    }

    const id = caseData.id || `case_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const now = new Date().toISOString();

    const formattedCase = {
      ...caseData,
      id,
      status: caseData.status || 'active',
      progress: typeof caseData.progress === 'number' ? caseData.progress : 0,
      created_at: caseData.created_at || now,
      updated_at: now
    };

    inMemoryCases.set(id, formattedCase);

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from('cases').upsert({
          id,
          title: formattedCase.title,
          category: formattedCase.category,
          description: formattedCase.problem_summary || formattedCase.original_description,
          urgency: formattedCase.urgency || 'medium',
          status: formattedCase.status,
          problem_summary: formattedCase.problem_summary,
          immediate_action: formattedCase.immediate_action,
          missing_information: formattedCase.missing_information,
          warnings: formattedCase.safety_notes || formattedCase.warnings,
          updated_at: now
        });
      } catch (dbErr) {
        console.warn('[LifeBridge AI] Supabase upsert non-blocking error:', dbErr.message);
      }
    }

    return res.json({ success: true, data: formattedCase });
  } catch (err) {
    console.error('[LifeBridge AI] Error saving case:', err);
    return res.status(500).json({ error: 'Failed to save case.' });
  }
});

// PATCH /api/cases/:id/status - Update case status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const existing = inMemoryCases.get(id);
    if (existing) {
      existing.status = status;
      existing.updated_at = new Date().toISOString();
      if (status === 'completed') {
        existing.completed_at = existing.updated_at;
      }
      inMemoryCases.set(id, existing);
    }

    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.from('cases').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
    }

    return res.json({ success: true, data: existing || { id, status } });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update case status.' });
  }
});

// DELETE /api/cases/:id - Delete a case
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    inMemoryCases.delete(id);

    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.from('cases').delete().eq('id', id);
    }

    return res.json({ success: true, message: 'Case deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete case.' });
  }
});

export default router;
