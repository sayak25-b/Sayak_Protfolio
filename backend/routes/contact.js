const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Get all contact messages (for admin)
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get single contact message
router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({
                success: false,
                error: 'Contact message not found'
            });
        }
        res.json({
            success: true,
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Submit contact form
router.post('/', async (req, res) => {
    try {
        // Validate required fields
        const { name, email, subject, message } = req.body;
        
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                error: 'Please provide all required fields'
            });
        }

        // Save to database
        const contact = new Contact(req.body);
        await contact.save();

        // Optional: Send email notification (configure if needed)
        // You can uncomment and configure the email sending logic below
        /*
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.RECEIVER_EMAIL,
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <h2>New Message from Portfolio</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.error('Email error:', err);
            else console.log('Email sent:', info.response);
        });
        */

        res.status(201).json({
            success: true,
            message: 'Thank you! Your message has been received. I will get back to you soon.',
            data: contact
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Update contact status (mark as read/replied)
router.put('/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!contact) {
            return res.status(404).json({
                success: false,
                error: 'Contact message not found'
            });
        }
        res.json({
            success: true,
            message: 'Contact updated successfully',
            data: contact
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Delete contact message
router.delete('/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({
                success: false,
                error: 'Contact message not found'
            });
        }
        res.json({
            success: true,
            message: 'Contact message deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
