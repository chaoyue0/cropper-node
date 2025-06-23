const express = require('express');
const authRouter = require('./routes/auth');
const photoRouter = require('./routes/photo');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 解析传统表单
app.use('/api/auth', authRouter);
app.use('/api/photo', photoRouter);

const start = async () => {
    try {
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
