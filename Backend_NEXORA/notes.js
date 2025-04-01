// Login Controller
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the entered password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token for authentication
        if (user.role == 'business') {
            const business = await Business.findOne({ email })
            const token = jwt.sign(
                {
                    _id: business._id,
                    role: businessOwner.role,
                    owenerId: business.ownerId
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h'
                });

            return token;
        } else if (user.role == 'user') {
            const token = jwt.sign(
                {
                    _id: user._id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h'
                } // Token expiration time
            );

            return token;
        }

        res.cookie('token', token)
        // Send success response with token
        res.status(200).json({ message: 'Login successful', token, user, role: user.role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//authMiddleware: common(business, user)
//route.get('/', authMiddleware, authorizeRole(), controller)


```
{
  "name": "Lily Johnson",
  "password": business@123",
  "businessName": "Sunshine Cafe",
  "email": "lily.j@sunshinecafe.com",
  "phone": "9123456789",
  "address": "45 Rosewood Ave, Springvale",
  "businessType": "Cafe"
},
{
  "name": "David Lee",
  "password": "business@123",
  "businessName": "Golden Spoon Diner",
  "email": "david.lee@goldenspoon.com",
  "phone": "8765432109",
  "address": "12 Pine St, Riverdale",
  "businessType": "Diner"
},
{
  "name": "Sophia Martinez",
  "password": "business@123",
  "businessName": "Bella Italia",
  "email": "sophia.martinez@bellaitalia.com",
  "phone": "9234567810",
  "address": "22 Olive Rd, Little Italy",
  "businessType": "Restaurant"
},
{
  "name": "James Smith",
  "password": business@123",
  "businessName": "Smith's BBQ Joint",
  "email": "james.smith@smithbbq.com",
  "phone": "9543210987",
  "address": "78 Oak Ln, Hilltop",
  "businessType": "Grill"
},
{
  "name": "Emily Davis",
  "password": "business@123",
  "businessName": "Sweet Cravings Bakery",
  "email": "emily.davis@sweetcravings.com",
  "phone": "9897654321",
  "address": "30 Maple Dr, Westside",
  "businessType": "Bakery"
},
{
  "name": "Michael Wilson",
  "password": "business@123",
  "businessName": "Ocean Breeze Lounge",
  "email": "michael.wilson@oceanbreeze.com",
  "phone": "9786543210",
  "address": "56 Seaside Blvd, Bayview",
  "businessType": "Lounge"
},
{
  "name": "Isabella Clark",
  "password": "business@123",
  "businessName": "Clark's Bistro",
  "email": "isabella.clark@clarksbistro.com",
  "phone": "9123897654",
  "address": "67 Elm St, Downtown",
  "businessType": "Bistro"
},
{
  "name": "Ethan White",
  "password": "business@123",
  "businessName": "White Oaks Bar",
  "email": "ethan.white@whiteoaksbar.com",
  "phone": "9234567890",
  "address": "101 Oakwood Ave, Greenwood",
  "businessType": "Bar"
},
{
  "name": "Mia Garcia",
  "password": "business@123",
  "businessName": "Garcia's Tacos",
  "email": "mia.garcia@garciastacos.com",
  "phone": "9345678901",
  "address": "88 Sunset Rd, Oldtown",
  "businessType": "Restaurant"
},
{
  "name": "Oliver Jones",
  "password": "business@123",
  "businessName": "Jonesy’s Grillhouse",
  "email": "oliver.jones@jonesysgrill.com",
  "phone": "9456789012",
  "address": "40 Bridge St, Newcity",
  "businessType": "Steakhouse"
}
```
