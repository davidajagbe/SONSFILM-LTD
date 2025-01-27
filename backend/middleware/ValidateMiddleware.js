import { check, validationResult } from 'express-validator';

export const validateForm = [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('phone').isMobilePhone().withMessage('Valid phone number is required'),
    check('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
