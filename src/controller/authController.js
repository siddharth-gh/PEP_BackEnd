const jwt = require('jsonwebtoken');
const secret = "a401d85c-58c1-46fd-b063-150790d3f36c";

const authController = {
    login: (request, response) => {
        // These values are available due to express.json() middleware.
        const { username, password } = request.body;

        if (username === 'admin' && password === 'admin') {
            const userDetails = {
                name: "John Cena",
                email: "john@cena.com"
            };

            const token = jwt.sign(userDetails, secret, { expiresIn: '1h' });

            response.cookie('jwtToken', token, {
                httpOnly: true,
                secure: true,
                domain: 'localhost',
                path: '/'
            });

            response.json({ message: 'User authenticated', userDetails });
        } else {
            response.status(401).json({ message: 'Invalid credentials' });
        }
    },

    logout: (request, response) => {
        response.clearCookie('jwtToken');
        response.json({ message: 'User logged out successfully' });
    },

    isUserLoggedIn: (request, response) => {
        const token = request.cookies.jwtToken;

        if (!token) {
            return response.status(401).json({ message: 'Unauthorized access' });
        }

        jwt.verify(token, secret, (error, userDetails) => {
            if (error) {
                return response.status(401).json({ message: 'Unauthorized access' });
            } else {
                return response.json({ userDetails });
            }
        });
    },
};

module.exports = authController;
