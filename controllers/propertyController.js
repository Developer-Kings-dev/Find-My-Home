const Property = require('../models/Property');
const { bucket } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');

// Controller to get all properties
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller to create a new property with image uploads to Firebase
exports.createProperty = async (req, res) => {
  const { title, description, price, location } = req.body;
  const imageUrls = [];

  try {
    for (const file of req.files) {
      const firebaseFileName = `${uuidv4()}_${file.originalname}`;
      const fileUpload = bucket.file(firebaseFileName);
      const stream = fileUpload.createWriteStream({
        metadata: { contentType: file.mimetype },
      });

      stream.on('error', (error) => {
        console.error('Error uploading image:', error);
        return res.status(500).json({ error: 'Error uploading image' });
      });

      stream.on('finish', async () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
        imageUrls.push(publicUrl);

        if (imageUrls.length === req.files.length) {
          const property = new Property({
            title,
            description,
            price,
            location,
            images: imageUrls,
            owner: req.user.id,
          });
          await property.save();
          return res.json(property);
        }
      });

      stream.end(file.buffer);
    }
  } catch (err) {
    console.error('Server Error:', err);
    return res.status(500).send('Server error');
  }
};

// Controller to Update Property
exports.updateProperty = async (req, res) => {
  const { title, description, price, location } = req.body;
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    if (property.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    property.title = title || property.title;
    property.description = description || property.description;
    property.price = price || property.price;
    property.location = location || property.location;

    await property.save();
    res.json(property);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// controller to delete a property
exports.deleteProperty = async (req, res) => {
  try {
    // Find the property by ID
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    // Check if the user is the owner of the property
    if (property.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Delete the property
    await Property.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Property removed' });
  } catch (err) {
    console.error(err.message); // Log the error to the console
    res.status(500).send('Server error');
  }
};
