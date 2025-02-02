const FAQ = require('../model/faqmodel');
const googleTranslate = require('googletrans'); // Assuming googletrans library
const user=require("../model/usermodel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

// Helper function for translating content

exports.register= async (req, res) => {
    try {
        console.log("Received registration data:", req.body);

        const { name, username, password, phone_number } = req.body;
        if (!name || !username || !password || !phone_number) return res.status(400).send("All fields are required.");

        const existingUser = await user.findOne({ username });
        if (existingUser) return res.status(400).send("User already exists.");

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({ name, username, password: hashedPassword, phone_number });

        await newUser.save();
        res.redirect("/faqpage");
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).send("Error registering user.");
    }
};

// Login route
exports.login=async (req, res) => {
    try {
        const userRecord = await user.findOne({ username: req.body.username });
        if (!userRecord) return res.status(400).send("User not found.");

        const isPasswordMatch = await bcrypt.compare(req.body.password, userRecord.password);
        if (isPasswordMatch) {
            const token = jwt.sign({ username: userRecord.username }, "secretKey");
            res.cookie("token", token);
            res.redirect("/faqpage");
        } else {
            res.status(400).send("Incorrect Password");
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("Login failed.");
    }
};
async function translateText(text, targetLang) {
    try {
        let translation = await googleTranslate.translate(text, { to: targetLang });
        return translation.text;
    } catch (error) {
        console.error("Error translating:", error);
        return text;  // Fallback to original text if translation fails
    }
}

exports.createFAQ = async (req, res) => {
    try {
        const { question, answer } = req.body;
       
        const faq = new FAQ({ question, answer });
        console.log('Saving FAQ:', faq);

        await faq.save();

        res.status(201).json({ message: "FAQ added successfully", faq });
    } catch (error) {
        console.error(error);  // Log the error to console
        res.status(500).json({ error: error.message });
    }
};

exports.getFAQs = async (req, res) => {
    try {
        const lang = req.query.lang || 'en'; // Default to English if no language parameter
        const faqs = await FAQ.find();

        const translatedFAQs = [];
        for (const faq of faqs) {
            let translatedFaq = faq.translations.get(lang);
            if (!translatedFaq) {
                // Translate FAQ if not available in requested language
                const translatedQuestion = await translateText(faq.question, lang);
                const translatedAnswer = await translateText(faq.answer, lang);

                // Store the translation in the database
                faq.translations.set(lang, { question: translatedQuestion, answer: translatedAnswer });
                await faq.save();

                translatedFaq = { question: translatedQuestion, answer: translatedAnswer };
            }

            translatedFAQs.push({ ...faq.toObject(), translations: translatedFaq });
        }

        res.json(translatedFAQs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateFAQ = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;

        const updatedFAQ = await FAQ.findByIdAndUpdate(id, { question, answer }, { new: true });

        res.json({ message: "FAQ updated successfully", updatedFAQ });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteFAQ = async (req, res) => {
    try {
        const { id } = req.params;
        await FAQ.findByIdAndDelete(id);

        res.json({ message: "FAQ deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.translateFAQ = async (req, res) => {
    const { faqId, lang } = req.query;
    if (!faqId || !lang) {
        return res.status(400).json({ error: "faqId and lang are required." });
    }

    try {
        const faq = await FAQ.findById(faqId);
        if (!faq) return res.status(404).json({ error: "FAQ not found" });

        let translatedFaq = faq.translations.get(lang);
        if (!translatedFaq) {
            // Translate FAQ if not available in requested language
            const translatedQuestion = await translateText(faq.question, lang);
            const translatedAnswer = await translateText(faq.answer, lang);

            // Store the translation in the database using updateOne
            faq.translations.set(lang, { question: translatedQuestion, answer: translatedAnswer });
            await FAQ.updateOne({ _id: faq._id }, { $set: { translations: faq.translations } });

            translatedFaq = { question: translatedQuestion, answer: translatedAnswer };
            console.log("New Translation Stored:", translatedFaq);
        }

        res.json({ translation: translatedFaq });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

