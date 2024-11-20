import app from './app';

// Start the server
const server = app.listen(app.get('port'), async() => {
    console.log(`Server is running on http://localhost:${app.get('port')}`);
});

export default server;