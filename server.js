const express = require('express');
const dotenv = require('dotenv');
const articleRouter = require("./routes/articles");
const Article = require('./models/article');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: 'desc' });
        res.render('/articles/index', { articles: articles });
    } catch (error) {
        console.error("Error retrieving articles:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.use('/articles', articleRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
