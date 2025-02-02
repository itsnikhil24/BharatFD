const express = require("express");
const router = express.Router();
const { createFAQ, getFAQs, updateFAQ, deleteFAQ, translateFAQ, register, login } = require('../controllers/usercontroller');

router.post('/faqs', createFAQ); 
router.get('/faqs', getFAQs);     
router.put('/faqs/:id', updateFAQ); 
router.delete('/faqs/:id', deleteFAQ); 
router.get('/faqs/translate', translateFAQ);

router.get("/admindashboard", (req, res) => {
    res.render("faq.ejs");
})
router.get("/faqdashboard", (req, res) => {
    res.render("newfaq.ejs");
})
router.get("/register-login", (req, res) => {
    res.render("login-page.ejs");
})
router.post('/register', register);
router.get('/register', (req, res) => res.render("login-page"));
router.post('/login', login);
router.get('/login', (req, res) => {
    res.render("login-page");
});

module.exports = router;
