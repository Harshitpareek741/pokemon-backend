export const validateFields = (mandatoryFields) => {
    return (req, res, next) => {
        const missingFields = mandatoryFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            // Send the response and return without returning a value.
            res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
            return;
        }
        next();
    };
};
