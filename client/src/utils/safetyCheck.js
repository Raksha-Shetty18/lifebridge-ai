/**
 * LifeBridge AI - Emergency & Safety Keyword Detector
 */

const CRITICAL_EMERGENCY_KEYWORDS = [
  'suicide', 'self-harm', 'kill myself', 'hurt myself', 'end my life',
  'physical violence', 'abuse', 'beaten', 'hostage', 'bleeding', 'heart attack',
  'stroke', 'unconscious', 'fire in house', 'kidnap', 'immediate danger'
];

export function checkEmergencySituation(text) {
  if (!text || typeof text !== 'string') return null;
  const lower = text.toLowerCase();

  for (const kw of CRITICAL_EMERGENCY_KEYWORDS) {
    if (lower.includes(kw)) {
      return {
        isEmergency: true,
        keyword: kw,
        message: 'This appears to be an immediate crisis or danger. LifeBridge is an educational AI navigation tool and CANNOT replace emergency emergency services.',
        helplines: [
          { name: 'National Emergency Helpline', number: '112' },
          { name: 'Tele-MANAS Mental Health Support', number: '14416 / 1800-891-4416' },
          { name: 'Women Helpline', number: '1091' },
          { name: 'Child Helpline', number: '1098' }
        ]
      };
    }
  }

  return null;
}
