const express = require('express');
const userRouter = require('./routes/user');
const photoRouter = require('./routes/photo');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 解析传统表单
app.use('/api/user', userRouter);
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
