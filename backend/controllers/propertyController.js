import Property from '../models/Property.js';

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
export const getAllProperties = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      minPrice,
      maxPrice,
      city,
      country,
      bedrooms,
      bathrooms,
      sort = '-createdAt'
    } = req.query;

    // Build filter object
    const filter = { status: 'available' };
    
    if (category) filter.category = category;
    if (city) filter.city = new RegExp(city, 'i');
    if (country) filter.country = new RegExp(country, 'i');
    if (bedrooms) filter['facilities.bedrooms'] = { $gte: parseInt(bedrooms) };
    if (bathrooms) filter['facilities.bathrooms'] = { $gte: parseInt(bathrooms) };
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Execute query
    const properties = await Property.find(filter)
      .populate('owner', 'name email phone')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Property.countDocuments(filter);

    res.json({
      success: true,
      count: properties.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching properties',
      error: error.message,
    });
  }
};

// @desc    Get property by ID
// @route   GET /api/properties/:id
// @access  Public
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('owner', 'name email phone avatar');

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    res.json({
      success: true,
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching property',
      error: error.message,
    });
  }
};

// @desc    Create new property
// @route   POST /api/properties
// @access  Private (Agent/Admin)
export const createProperty = async (req, res) => {
  try {
    const propertyData = {
      ...req.body,
      owner: req.user.id,
    };

    const property = await Property.create(propertyData);
    await property.populate('owner', 'name email phone');

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating property',
      error: error.message,
    });
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private (Owner/Admin)
export const updateProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    // Check ownership or admin role
    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this property',
      });
    }

    property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('owner', 'name email phone');

    res.json({
      success: true,
      message: 'Property updated successfully',
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating property',
      error: error.message,
    });
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private (Owner/Admin)
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    // Check ownership or admin role
    if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this property',
      });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Property deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting property',
      error: error.message,
    });
  }
};

// @desc    Search properties
// @route   GET /api/properties/search
// @access  Public
export const searchProperties = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }

    const searchRegex = new RegExp(q, 'i');
    const filter = {
      status: 'available',
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { city: searchRegex },
        { country: searchRegex },
        { address: searchRegex },
      ],
    };

    const properties = await Property.find(filter)
      .populate('owner', 'name email phone')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Property.countDocuments(filter);

    res.json({
      success: true,
      count: properties.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching properties',
      error: error.message,
    });
  }
};

// @desc    Get featured properties
// @route   GET /api/properties/featured
// @access  Public
export const getFeaturedProperties = async (req, res) => {
  try {
    const { limit = 8 } = req.query;

    const properties = await Property.find({
      featured: true,
      status: 'available',
    })
      .populate('owner', 'name email phone')
      .sort('-createdAt')
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured properties',
      error: error.message,
    });
  }
};

// @desc    Get properties by owner
// @route   GET /api/properties/owner/:ownerId
// @access  Private
export const getPropertiesByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    // Check if user is requesting their own properties or is admin
    if (req.user.id !== ownerId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view these properties',
      });
    }

    const properties = await Property.find({ owner: ownerId })
      .populate('owner', 'name email phone')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Property.countDocuments({ owner: ownerId });

    res.json({
      success: true,
      count: properties.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching properties',
      error: error.message,
    });
  }
};

// @desc    Toggle featured status
// @route   PUT /api/properties/:id/featured
// @access  Private (Admin)
export const toggleFeatured = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    property.featured = !property.featured;
    await property.save();

    res.json({
      success: true,
      message: `Property ${property.featured ? 'featured' : 'unfeatured'} successfully`,
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating featured status',
      error: error.message,
    });
  }
};

// @desc    Increment property views
// @route   PUT /api/properties/:id/views
// @access  Public
export const incrementViews = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    res.json({
      success: true,
      views: property.views,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating views',
      error: error.message,
    });
  }
};