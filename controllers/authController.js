const login = (req, res) => {

    const { username, password } = req.body;

    // Change these credentials if you want
    if (username === "admin" && password === "Idukki@jesvin") {

        req.session.isAdmin = true;

        return res.json({
            success: true
        });

    }

    res.status(401).json({
        success: false,
        message: "Invalid username or password"
    });

};

const logout = (req, res) => {

    req.session.destroy(() => {

        res.json({
            success: true
        });

    });

};

module.exports = {
    login,
    logout
};