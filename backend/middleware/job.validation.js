export const jobValidationMiddleware = (req, res, next) => {
  const { companyName, positionApplied } = req.body;

  if (!companyName) {
    return res.status(400).json({
      success: false,
      message: "Company Name is required",
    });
  }

  if (!positionApplied) {
    return res.status(400).json({
      success: false,
      message: "Company Name is required",
    });
  }

  next();
};
