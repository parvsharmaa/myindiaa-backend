const express = require('express');
const router = express.Router();

// Mock domain registration API
router.post('/register', (req, res) => {
  // Simulate domain registration
  const domainInfo = {
    domain: req.body.domain,
    status: 'Registered',
    expiryDate: '2025-07-01',
  };
  return res.status(200).send(domainInfo);
});

router.post('/renew', (req, res) => {
  // Simulate domain renewal
  const renewalInfo = {
    domain: req.body.domain,
    status: 'Renewed',
    newExpiryDate: '2026-07-01',
  };
  return res.status(200).send(renewalInfo);
});

module.exports = router;
