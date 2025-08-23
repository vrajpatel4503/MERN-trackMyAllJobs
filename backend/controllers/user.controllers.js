import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import { uploadOnCloudinary } from "../cloudinary/cloudinary.js";
import cloudinary from "../cloudinary/cloudinaryConfig.js";

// Generate refresh and access token
const generateRefreshTokenAndAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    return { accessToken, refreshToken };

    // try part end
  } catch (error) {
   
  }
};

// Controller : User Registration
export const userRegistrationController = async (req, res) => {
  try {
    const { fullName, userName, email, password, phoneNumber } = req.body;

    // Check if email or phone number already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingUser) {
      let message = "User with same details already exists";

      if (existingUser.email === email) {
        message = "Email already exists";
      } else if (existingUser.phoneNumber === phoneNumber) {
        message = "Phone number already exists";
      }

      return res.status(409).json({
        success: false,
        message,
      });
    }

    // Validate avatar upload
    if (!req.files || !req.files.avatar || !req.files.avatar.length) {
      return res.status(400).json({
        success: false,
        message: "Avatar is required. Please upload an image.",
      });
    }

    // Upload avatar to Cloudinary from buffer
    const avatarBuffer = req.files.avatar[0].buffer;

    // Upload avatar to cloudinary and hash password
    const [hashedPassword, avatarUpload] = await Promise.all([
      bcryptjs.hash(password, 10),
      uploadOnCloudinary(avatarBuffer, "avatars"),
    ]);

    if (!avatarUpload?.secure_url || !avatarUpload?.public_id) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload avatar. Please try again.",
      });
    }

    // Create user
    const user = new User({
      fullName,
      userName,
      email,
      password: hashedPassword,
      phoneNumber,
      avatar: {
        public_id: avatarUpload.public_id,
        url: avatarUpload.secure_url,
      },
    });

    try {
      await user.save();
    } catch (err) {
      await cloudinary.uploader.destroy(avatarUpload.public_id); // clean up
      return res.status(500).json({
        success: false,
        message: "User registration failed. Please try again.",
      });
    }

    // Fetch created user without sensitive fields
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res.status(200).json({
      success: true,
      message: "User registered successfully.",
      createdUser,
    });

    // try part end
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Controller : User Login
export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check emaill and password in once
    const user = await User.findOne({ email });

    if (!user || !(await bcryptjs.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate access and refresh token
    const { accessToken, refreshToken } =
      await generateRefreshTokenAndAccessToken(user._id);

    const userData = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    };

    return res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .status(200)
      .json({
        success: true,
        message: `Welcome back ${user.fullName}`,
        user: userData,
        accessToken,
        refreshToken,
      });

    // try part end
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Controller : User Logout
export const userLogoutController = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $unset: { refreshToken: "" },
    });

    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    };

    return res
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        success: true,
        message: "User logged out successfully",
      });
    // try part end
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to logout. Please try again",
    });
  }
};

// Controller : Get User Details
export const getUserDetailsController = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id).select("-password -refreshToken");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

    // try part end
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch details",
    });
  }
};

// Update User Email
export const updateEmailController = async (req, res) => {
  try {
    const { id } = req.user;
    const { email } = req.body;

    // check email is provided
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide an email",
      });
    }

    //  Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format. It must contain '@' and a domain",
      });
    }

    //  Find the current user
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // If email is different from current email, check for duplication
    if (email !== existingUser.email) {
      const emailExist = await User.findOne({ email });
      if (emailExist) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "New email is same as the current email",
      });
    }

    // Update the email
    existingUser.email = email;
    await existingUser.save();

    return res.status(200).json({
      success: true,
      message: "Email updated successfully",
      user: {
        email: existingUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update email. Please try again later.",
    });
  }
};

// Update User PhoneNumber
export const updatePhoneNumberController = async (req, res) => {
  try {
    const { id } = req.user;
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Please provide a phone number",
      });
    }

    // Validate phone number format
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number. It must be exactly 10 digits.",
      });
    }

    // Check if user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the new number is same as current
    if (phoneNumber === existingUser.phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "The new phone number is the same as the current one",
      });
    }

    // Check if phone number is already taken
    const existingPhoneNumber = await User.findOne({ phoneNumber });
    if (existingPhoneNumber) {
      return res.status(409).json({
        success: false,
        message: "Phone number already exists",
      });
    }

    // Update the phone number
    existingUser.phoneNumber = phoneNumber;
    await existingUser.save();

    return res.status(200).json({
      success: true,
      message: "Phone number updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update phone number. Please try again.",
    });
  }
};

// Controller : Delete User Account
export const deleteUserAccountController = async (req, res) => {
  try {
    const { id } = req.user;

    //  Find user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete avatar from Cloudinary if exists
    if (user.avatar && user.avatar.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    // Step 3: Delete user from database
    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });

    // try part end
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// In future it will have restoreUserAccountController
