import User from '../models/User.js';
import Property from '../models/Property.js';

// @desc    Get user favourites
// @route   GET /api/favourites
// @access  Private
export const getUserFavourites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'favourites',
        populate: {
          path: 'owner',
          select: 'name email phone',
        },
      });

    res.json({
      success: true,
      count: user.favourites.length,
      favourites: user.favourites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching favourites',
      error: error.message,
    });
  }
};

// @desc    Add property to favourites
// @route   POST /api/favourites
// @access  Private
export const addToFavourites = async (req, res) => {
  try {
    const { propertyId } = req.body;

    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    // Check if already in favourites
    const user = await User.findById(req.user.id);
    if (user.favourites.includes(propertyId)) {
      return res.status(400).json({
        success: false,
        message: 'Property already in favourites',
      });
    }

    // Add to favourites
    user.favourites.push(propertyId);
    await user.save();

    await user.populate({
      path: 'favourites',
      populate: {
        path: 'owner',
        select: 'name email phone',
      },
    });

    res.json({
      success: true,
      message: 'Property added to favourites',
      favourites: user.favourites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding to favourites',
      error: error.message,
    });
  }
};

// @desc    Remove property from favourites
// @route   DELETE /api/favourites/:propertyId
// @access  Private
export const removeFromFavourites = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const user = await User.findById(req.user.id);
    
    // Check if property is in favourites
    if (!user.favourites.includes(propertyId)) {
      return res.status(400).json({
        success: false,
        message: 'Property not in favourites',
      });
    }

    // Remove from favourites
    user.favourites = user.favourites.filter(
      (id) => id.toString() !== propertyId
    );
    await user.save();

    await user.populate({
      path: 'favourites',
      populate: {
        path: 'owner',
        select: 'name email phone',
      },
    });

    res.json({
      success: true,
      message: 'Property removed from favourites',
      favourites: user.favourites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing from favourites',
      error: error.message,
    });
  }
};

// @desc    Check if property is favourite
// @route   GET /api/favourites/check/:propertyId
// @access  Private
export const checkFavourite = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const user = await User.findById(req.user.id);
    const isFavourite = user.favourites.includes(propertyId);

    res.json({
      success: true,
      isFavourite,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking favourite status',
      error: error.message,
    });
  }
};