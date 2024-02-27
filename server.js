const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const User = require('./models/userModels')
const app = express()

app.use(express.json())
//routes

app.get('/', (req, res) => {
    res.send("tes")
})

app.get('/blog', (req, res) => {
    res.send("tes blog")
})
//show all
app.get('/product', async (req, res) => {
    try {
        const product = await Product.find({})
        res.status(200).json(product);

    } catch (error) {
        console.log(error.messege);
        res.status(500).json({ messege: error.messege })
    }

})
//finds by id
app.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id); // Corrected usage
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message); // Corrected typo in "message"
        res.status(500).json({ message: error.message });
    }
});

//update product
app.put('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body); // Corrected usage
        if (!product) {
            return res.status(404).json({ message: `Cannot find ID ${id}` }); // Use backticks for template literals
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message); // Corrected typo in "message"
        res.status(500).json({ message: error.message });
    }
});


//update delete
app.delete('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id); // Corrected usage
        if (!product) {
            return res.status(404).json({ message: `Cannot find ID ${id}` }); // Use backticks for template literals
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message); // Corrected typo in "message"
        res.status(500).json({ message: error.message });
    }
});


// //add product
// app.post('/product', async (req, res) => {
//     try {
//         const product = await Product.create(req.body)
//         res.status(200).json(product);

//     } catch (error) {
//         console.log(error.messege);
//         res.status(500).json({ messege: error.messege })
//     }
// })

// add product
app.post('/product', async (req, res) => {
    try {
        const { name, quantity } = req.body;

        // Check if name and quantity are provided
        if (!name || !quantity) {
            return res.status(400).json({ message: 'Name and quantity are required fields' });
        }

        // Check if a product with the same name already exists
        const existingProduct = await Product.findOne({ name });

        if (existingProduct) {
            return res.status(400).json({ message: 'Product with the same name already exists' });
        }

        // If no issues, proceed with creating a new product
        const product = await Product.create(req.body);

        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.post('/registration', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if username and password are provided
        if (!username || !password) {
            return res.status(400).json({ message: 'username and password are required fields' });
        }

        // Check if a user with the same username already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'user with the same username already exists' });
        }

        // If no issues, proceed with creating a new user
        const newUser = await User.create(req.body);

        // Create a new object without the password field
        const userWithoutPassword = {
            _id: newUser._id,
            username: newUser.username,
            // Add other fields if needed
        };

        res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});



// console.log(req.body)
// res.send(req.body)
mongoose.set("strictQuery", false)
mongoose.
    connect('mongodb+srv://afifhabib72:habiboke72@cluster0.luykydk.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("CONECT MONGO")
        app.listen(3000, () => {
            console.log("on port 3000")
        });
    }).catch(() => {
        console.log(error)
    })